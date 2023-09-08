import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import Sidebar from '../../components/sidebar/patient/PatientSidebar';
import MessageBox from '../../components/MessageBox/MessageBox.Component';
import request from '../../request/index';
import EditPatient from '../../components/popups/patient/EditPatient.Popup';
import { Store } from '../../StoreContext';
import Breadcrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { socketURI } from '../../config';

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
  const [openEditPatientModal, setOpenEditPatientModal] = useState(false);
  const [lastKey, setLastKey] = useState({});
  const [breadCrumb, setBreadCrumb] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const newSocket = io(socketURI, {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      newSocket.on('connected', () => {
        console.log('Socket connection successful');
      });

      setSocket(newSocket);
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on(`message${clinicianId}`, (data) => {
        setAllMessages((prev) => [...prev, data]);
      });
    }
  }, [socket, clinicianId]);

  useEffect(() => {
    if (socket && chatId) {
      const readMessage = {
        chat: chatId,
        sender: clinicianId,
        receiver: patientId,
      };

      socket.emit('read', readMessage);

      return () => {
        socket.emit('read', readMessage);
      };
    }
  }, [socket, chatId, clinicianId, patientId]);

  const getPatientDataById = async () => {
    try {
      const response = await request('get', `/clinicians/getPatientDetail/${patientId}`);
      const userData = response?.data?.user;

      setPatient(userData);
      setBreadCrumb(`${userData?.first_name} ${userData?.last_name}`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const getClinicianById = async () => {
    try {
      const response =
        user?.role === 'clinician'
          ? await request('get', `/auth/userDetails`)
          : await request('get', `/clinics/getClinician/${clinicianId}`);

      setClinician(response?.data?.user);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const chat = async () => {
    try {
      const chatIdResponse = await request('get', `/messages/chatId/${patientId}/${clinicianId}`);
      const chatIdData = chatIdResponse?.data?.chatId;

      setChatId(chatIdData);

      const allMessagesResponse = await request(
        'get',
        `/messages/allMessages/${chatIdData}?limit=50`,
      );
      const reversedMessages = allMessagesResponse?.data?.messages.reverse();

      setAllMessages(reversedMessages);
      setLastKey(allMessagesResponse?.data?.lastKey);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getPatientDataById();
    getClinicianById();
    chat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId, clinicianId]);

  const handleSendMessage = (chatID, newMessage, patientID, clinicianID) => {
    if (socket) {
      socket.emit('message', {
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

  const EditPatientPopup = openEditPatientModal && (
    <EditPatient
      openEditPatient={openEditPatientModal}
      setOpenEditPatient={setOpenEditPatientModal}
      patientDetails={patient}
      getPatients={getPatientDataById}
    />
  );

  return (
    <div style={{ position: 'fixed' }} className="gridish">
      <div className="sideBar_div">
        <Sidebar
          patientId={patientId}
          patientData={patient}
          selectedClinician={clinicianId}
          openEditPatientModal={openEditPatientModal}
          setOpenEditPatientModal={setOpenEditPatientModal}
        />
      </div>
      <div className="bgMsg">
        <Breadcrumbs ClinicName={breadCrumb} />
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
