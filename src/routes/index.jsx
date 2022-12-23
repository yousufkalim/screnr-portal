// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard';
import Header from '../components/Header';
import ClinicAdmin from '../containers/ClinicAdmin';
import Clinician from '../containers/Clinician';
import Patient from '../containers/Patient';

function Index() {
  return (
    <>
      {window.location.pathname === '/dashboard' ||
      '/dashboard/' ||
      '/dashboard/staff' ||
      '/dashboard/staff/' ||
      '/dashboard/staff/clinician' ||
      '/dashboard/staff/clinician/' ||
      '/dashboard/staff/clinician/doctor' ||
      '/dashboard/staff/clinician/doctor/' ? (
        <Header />
      ) : (
        ''
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/staff" element={<ClinicAdmin />} />
        <Route path="/dashboard/staff/clinician" element={<Clinician />} />
        <Route path="/dashboard/staff/clinician/doctor" element={<Patient />} />
      </Routes>
    </>
  );
}
export default Index;
