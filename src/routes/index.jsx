// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Login from '../containers/Login';
import Dashboard from '../containers/staffDashboard/Staff';

import Header from '../components/Header';
import ClinicAdmin from '../containers/clinicAdmin/ClinicAdmin';

function Index() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/staff" element={<ClinicAdmin />} />
      </Routes>
    </>
  );
}
export default Index;
