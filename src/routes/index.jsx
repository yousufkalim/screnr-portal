// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Login from '../containers/Login';
import Dashboard from '../containers/staffDashboard/Staff';
import Header from '../components/Header';
import ClinicAdmin from '../containers/clinicAdmin/ClinicAdmin';
import Clinician from '../containers/clinician/Clinician';

function Index() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/staff" element={<ClinicAdmin />} />
        <Route path="/dashboard/staff/clinician" element={<Clinician />} />
      </Routes>
    </>
  );
}
export default Index;
