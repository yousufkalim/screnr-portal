// Init
import React from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// react-easy-router import
import Router from 'react-easy-router';

// Files
import superadminRoutes from './routes/Routes';
import Header from './components/Header';
import './css/index.css';
import api from './api/index';
import { UpdateStore } from './StoreContext';

// Component
function App() {
  const updateStore = UpdateStore();

  const isAuthenticated = async () => {
    const { data } = await api('get', '/auth');
    updateStore({ loggedIn: true, user: data.user });
    return true;
  };

  return (
    <div className="App">
      {/* toastify Container for Notification */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar transition={Flip} />

      {/* Routes */}

      {/* All Superadmin routes should have header except for login page */}
      {window.location.pathname !== '/' ? <Header /> : ''}
      {/* Superadmin routes alongwith header */}
      <Router routes={superadminRoutes} isAuthenticated={isAuthenticated} />
    </div>
  );
}

// Export
export default App;
