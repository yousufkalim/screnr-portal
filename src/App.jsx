// Init
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// react-easy-router import
import Router from 'react-easy-router';
// Files
import superadminRoutes from './routes/Routes';
import Header from './components/Header';
import './css/index.css';
import { UpdateStore } from './StoreContext';
import { baseUrl } from './config';
// import Index from './routes/index';

// Component
function App() {
  // const [user, setUser] = useState('');
  const updateStore = UpdateStore();
  const { pathname } = useLocation();

  const isAuthenticated = async () => {
    const { data } = await axios.get(`${baseUrl}/auth`, { withCredentials: true });
    updateStore({ loggedIn: true, user: data.user });
    console.log(data.user);
    return { authenticated: true, role: data.user?.role };
  };

  useEffect(() => {
    if (pathname === '/' || pathname === '/login') {
      isAuthenticated().then((r) => r);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // const filteredRoutes = superadminRoutes.filter((item) => item?.roles?.includes(user?.role));

  return (
    <div className="App">
      {/* toastify Container for Notification */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar transition={Flip} />
      {/* Routes */}
      {/* All Superadmin routes should have header except for login page */}
      {pathname !== '/' && pathname !== '/login' ? <Header /> : ''}
      {/* Superadmin routes alongwith header */}
      <Router routes={superadminRoutes} isAuthenticated={isAuthenticated} />
      {/* {user && <Index user={user} />} */}
    </div>
  );
}

// Export
export default App;
