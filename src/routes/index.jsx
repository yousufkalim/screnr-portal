// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Login from '../containers/Login';
import Dashboard from '../containers/Dashboard/index';
import Staff from '../containers/Dashboard/Staff';
import Header from '../components/header';

function Index() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/staff" element={<Staff />} />
      </Routes>
    </>
  );
}
export default Index;
