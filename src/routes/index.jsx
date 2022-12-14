// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Home from '../containers/Home';
import Dashboard from '../containers/Dashboard/index';
import Staff from '../containers/Dashboard/Staff';
import Header from '../components/header';

function Index() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/staff" element={<Staff />} />
      </Routes>
    </>
  );
}
export default Index;
