import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'react-easy-router';
import Header from './components/Header/Header.component';
import AllRoutes from './routes/index';
import { UpdateStore } from './StoreContext';
import { baseUrl } from './config';
// import request from './request/index';
// import { clinicianTimeTracker } from './utils/clinicianTimeTracking';
import './css/index.css';

const queryParams = new URLSearchParams(window.location.search);
const verify = queryParams.get('verify');
const forgetPassword = queryParams.get('forgetPassword');
const token = queryParams.get('token');

function App() {
  const userToken = localStorage.getItem('token');
  // const patientId = localStorage.getItem('patientId');
  // const clinicianId = localStorage.getItem('clinicianId');

  const updateStore = UpdateStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = async () => {
    const { data } = await axios.get(`${baseUrl}/auth/userDetails`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    updateStore({ loggedIn: true, user: data?.user });
    return { authenticated: true, role: data?.user?.role };
  };

  // const allowedPath = window.location.pathname.includes('patients');
  // console.log('🚀 ~ file: App.jsx:40 ~ App ~ allowedPath:', allowedPath);

  // setInterval(() => {
  //   console.log('🚀 ~ file: App.jsx:40 ~ App ~ allowedPath:', allowedPath);
  // }, 1000);
  // const handleTimeTracker = () => {
  //   if (allowedPath === 'patient') {
  //     request('get', `clinicians/activity/${clinicianId}/${patientId}`)
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };
  // useEffect(() => {
  //   const handleTabClose = (event) => {
  //     event.preventDefault();
  //     const Event = event;

  //     console.log('beforeunload event triggered');

  //     // eslint-disable-next-line no-return-assign
  //     return (Event.returnValue = 'Are you sure you want to exit?');
  //   };

  //   window.addEventListener('beforeunload', handleTabClose);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleTabClose);
  //   };
  // }, []);

  useEffect(() => {
    if (pathname === '/' || pathname === '/login') {
      isAuthenticated()
        .then((r) => r)
        .catch((err) => {
          if (err?.response?.status === 403) {
            localStorage.removeItem('token');
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (verify) {
      if (token) {
        navigate(`/VerifyEmail/${token}`);
      }
    } else if (forgetPassword) {
      if (token) {
        navigate(`/forgetPassword/${token}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {/* toastify Container for Notification */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar transition={Flip} />
      {!(
        pathname === '/login' ||
        pathname === `/VerifyEmail/${pathname?.split('/')[2]}` ||
        pathname === `/forgetPassword/${pathname?.split('/')[2]}` ||
        pathname === '/'
      ) && <Header />}

      {/* All role's routes alongwith header */}
      <Router routes={AllRoutes} isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;
