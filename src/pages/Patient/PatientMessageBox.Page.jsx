import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../../components/sidebar/patient/PatientSidebar';
import MessageBox from '../../components/MessageBox/MessageBox.Component';
import request from '../../request/index';
import EditPatient from '../../components/popups/patient/EditPatient.Popup';
import SocketConnection from '../../helper/socket';
import { Store } from '../../StoreContext';

export default function PatientMessageBox() {
  const params = useParams();
  const navigate = useNavigate();
  const { patientId, clinicianId } = params;
  const store = Store();
  const { user } = store;
  const [patient, setPatient] = useState({});
  const [clinician, setClinician] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const [chatId, setChatId] = useState('');
  const [openEditpatientModal, setOpenEditpatientModal] = useState(false);
  const [lastKey, setLastKey] = useState({}); // for pagination

  useEffect(() => {
    if (SocketConnection) {
      SocketConnection.on(`message${clinicianId}`, (data) => {
        setAllMessages((prev) => [...prev, data]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SocketConnection]);

  useEffect(() => {
    if (SocketConnection && chatId) {
      SocketConnection.emit('read', {
        chat: chatId,
        sender: clinicianId,
        receiver: patientId,
      });
    }

    return () => {
      if (SocketConnection && chatId) {
        SocketConnection.emit('read', {
          chat: chatId,
          sender: clinicianId,
          receiver: patientId,
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  const getPatientDataById = async () => {
    await request('get', `/clinicians/getPatientDetail/${patientId}`)
      .then((res) => {
        setPatient(res?.data?.user);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const getClinicianById = async () => {
    if (user?.role === 'clinician') {
      await request('get', `/auth/userDetails`)
        .then((res) => {
          setClinician(res?.data?.user);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    } else {
      await request('get', `/clinics/getClinician/${clinicianId}`)
        .then((res) => {
          setClinician(res?.data?.user);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    }
  };

  const chat = async () => {
    await request('get', `/messages/chatId/${patientId}/${clinicianId}`)
      .then(async (chatIdRespose) => {
        setChatId(chatIdRespose?.data?.chatId);
        await request('get', `/messages/allMessages/${chatIdRespose?.data?.chatId}?limit=50`)
          .then((allMessagesResponse) => {
            setAllMessages(allMessagesResponse?.data?.messages.reverse());
            setLastKey(allMessagesResponse?.data?.lastKey);
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message);
          });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    getPatientDataById();
    getClinicianById();
    chat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const EditPatientPopup = openEditpatientModal && (
    <EditPatient
      openEditPatient={openEditpatientModal}
      setOpenEditPatient={setOpenEditpatientModal}
      patientDetails={patient}
      getPatients={getPatientDataById}
    />
  );

  const handleSendMessage = (chatID, newMessage, patientID, clinicianID) => {
    if (SocketConnection) {
      SocketConnection.emit('message', {
        chat: chatID,
        content: newMessage,
        receiver: patientID,
        sender: clinicianID,
      });
    }
  };
  const goBackToProfile = () => {
    navigate(`/patients/${patientId}/prescription`);
  };

  return (
    <div style={{ position: 'fixed' }} className="gridish">
      <div className="sideBar_div">
        <Sidebar
          patientId={patientId}
          patientData={patient}
          selectedClinician={clinicianId}
          openEditpatientModal={openEditpatientModal}
          setOpenEditpatientModal={setOpenEditpatientModal}
        />
      </div>
      <div className="bgMsg">
        <div className="breadCrumb">
          Dashboard &gt; Staff &gt; Clinic Admin &gt; Clinician &gt; Patient &gt; Messages &gt;
        </div>
        <div className="bgAddPrescription">
          <MessageBox
            patient={patient}
            allMessages={allMessages}
            setAllMessages={setAllMessages}
            clinician={clinician}
            chatId={chatId}
            handleSendMessage={handleSendMessage}
            lastKey={lastKey}
            setLastKey={setLastKey}
            goBackToProfile={goBackToProfile}
          />
        </div>
      </div>
      {EditPatientPopup}
    </div>
  );
}
