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

// Component
function App() {
  return (
    <div className="App">
      {/* toastify Container for Notification */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar transition={Flip} />
      {/* Routes */}
      {window.location.pathname !== '/' ? <Header /> : ''}
      <Router routes={superadminRoutes} />
    </div>
  );
}

// Export
export default App;
