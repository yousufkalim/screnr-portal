import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'react-easy-router';
import Header from './components/Header/Header.component';
import AllRoutes from './routes/index';
import { UpdateStore } from './StoreContext';
import { baseUrl } from './config';
import './css/index.css';

function App() {
  const updateStore = UpdateStore();
  const { pathname } = useLocation();
  const isAuthenticated = async () => {
    const { data } = await axios.get(`${baseUrl}/auth`, { withCredentials: true });
    updateStore({ loggedIn: true, user: data.user });
    return { authenticated: true, role: data.user?.role };
  };

  useEffect(() => {
    if (pathname === '/' || pathname === '/login') {
      isAuthenticated().then((r) => r);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="App">
      {/* toastify Container for Notification */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar transition={Flip} />
      {/* All Superadmin routes should have header except for login page */}
      {pathname !== '/' && pathname !== '/login' && pathname !== '/VerifyEmail' && <Header />}
      {/* Superadmin routes alongwith header */}
      <Router routes={AllRoutes} isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;
