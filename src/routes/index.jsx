// Init
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes
import Login from '../containers/Login';

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}
export default Index;
