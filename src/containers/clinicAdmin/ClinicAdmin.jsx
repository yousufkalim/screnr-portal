import React from 'react';
import Sidebar from '../../components/Sidebar';

import ClinicAdminTable from './ClinicAdminsTable';

export default function ClinicAdmin() {
  return (
    <div className="main_staff_div">
      <Sidebar />

      <ClinicAdminTable />
    </div>
  );
}
