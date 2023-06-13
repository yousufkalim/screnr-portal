import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Grid } from '@mui/material';
import Sidebar from '../../components/sidebar/patient/PatientSidebar';
import MessageBox from '../../components/MessageBox/MessageBox.Component';
import request from '../../request/index';
import EditPatient from '../../components/popups/patient/EditPatient.Popup';
import SocketConnection from '../../helper/socket';

export default function PatientMessageBox() {
  const params = useParams();
  const { patientId, clinicianId } = params;
  const [patient, setPatient] = useState({});
  const [clinician, setClinician] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const [chatId, setChatId] = useState('');
  const [openEditpatientModal, setOpenEditpatientModal] = useState(false);
  const [lastKey, setLastKey] = useState({}); // for pagination
  console.log('🚀 ~ file: PatientMessageBox.Page.jsx:20 ~ PatientMessageBox ~ lastKey:', lastKey);

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
    await request('get', `/clinics/getClinician/${clinicianId}`)
      .then((res) => {
        setClinician(res?.data?.user);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
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

  return (
    <Grid sx={{ marginTop: '8vh', position: 'fixed' }} container>
      <Grid xl={2} lg={2.5}>
        <Sidebar
          patientId={patientId}
          patientData={patient}
          selectedClinician={clinicianId}
          openEditpatientModal={openEditpatientModal}
          setOpenEditpatientModal={setOpenEditpatientModal}
        />
      </Grid>
      <Grid className="bgMsg" xl={10} lg={9.5}>
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
          />
        </div>
      </Grid>
      {EditPatientPopup}
    </Grid>
  );
}
