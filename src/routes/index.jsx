// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard';
import Header from '../components/Header';
import ClinicAdmin from '../containers/ClinicAdmin';
import Clinician from '../containers/Clinician';

function Index() {
  return (
    <>
      {window.location.pathname === '/dashboard' ||
      '/dashboard/' ||
      '/dashboard/staff' ||
      '/dashboard/staff/' ||
      '/dashboard/staff/clinician' ||
      '/dashboard/staff/clinician/' ? (
        <Header />
      ) : (
        ''
      )}

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
