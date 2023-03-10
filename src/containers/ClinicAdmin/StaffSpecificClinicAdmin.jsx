import { React, useState, useEffect } from 'react';

// mui imports
import { Grid } from '@mui/material';

// import useParams
import { useNavigate, useParams } from 'react-router-dom';

// assets import
import addBtn from '../../assets/icons/addBtn.svg';

// child components import
import Sidebar from '../../components/sidebar/GenericLeftSidebar';
import ClinicAdminTable from '../../components/tables/clinicAdmin/ClinicAdminsTable';
import AddClinicAdmin from '../../components/popups/clinicAdmin/AddNewClinicAdmin';
import api from '../../api';

export default function ClinicAdmin() {
  const [openAddClinicAdmin, setOpenAddClinicAdmin] = useState(false);
  const [clinicAdmins, setClinicAdmins] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const getClinicAdmins = async (page = 1) => {
    const { data } = await api('get', `/admins/clinics/getClinicsByStaffId/${id}?page=${page}`);
    if (data) {
      setClinicAdmins(data);
    }
  };
  const handleDashboardNavClick = () => {
    navigate('/dashboard');
  };
  useEffect(() => {
    getClinicAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid xl={2} lg={2.5}>
        <Sidebar id={id} txt="admins/staff" roleTxt="Staff Id" />
      </Grid>

      <Grid className="bg" xl={10} lg={9.5}>
        <div className="main_div" style={{ background: 'rgb(246, 250, 251)', height: '95vh' }}>
          <div className="breadCrumb" style={{ display: 'flex' }}>
            <div
              className="navigationEntities"
              onClick={handleDashboardNavClick}
              aria-hidden="true"
            >
              Dashboard &gt;
            </div>
            <div> Staff &gt;</div>
          </div>
          <ClinicAdminTable
            staffAdminId={id}
            clinicAdmins={clinicAdmins}
            getClinicAdmins={getClinicAdmins}
          />
        </div>
      </Grid>
      <div className="addBtn">
        <img
          src={addBtn}
          className="pointer"
          onClick={() => setOpenAddClinicAdmin(true)}
          role="presentation"
          alt=""
        />
      </div>
      <AddClinicAdmin
        openAddClinicAdmin={openAddClinicAdmin}
        setOpenAddClinicAdmin={setOpenAddClinicAdmin}
        getClinicAdmins={getClinicAdmins}
        staffAdminId={id}
      />
    </Grid>
  );
}
