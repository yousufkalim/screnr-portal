import { React, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import addBtn from '../../assets/icons/addBtn.svg';
import Sidebar from '../../components/sidebar/GenericLeftSidebar';
import ClinicAdminTable from '../../components/tables/clinicAdmin/ClinicAdminsTable';
import AddClinicAdmin from '../../components/popups/clinicAdmin/AddClinicAdmin.Popup';
import EditStaffMember from '../../components/popups/dashboard/EditStaff.Popup';
import request from '../../request';

export default function ClinicAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openAddClinicAdmin, setOpenAddClinicAdmin] = useState(false);
  const [openEditStaffMember, setOpenEditStaffMember] = useState(false);
  const [clinicAdmins, setClinicAdmins] = useState({});
  const [staffMember, setStaffMember] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getClinicAdmins = async (page = 1) => {
    setIsLoading(true);
    try {
      const { data } = await request('get', `/staff/getClinicsByStaffId/${id}?page=${page}`);
      if (data) {
        setClinicAdmins(data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleDashboardNavClick = () => {
    navigate('/admin/dashboard');
  };

  const getData = async () => {
    try {
      const { data } = await request('get', `/admins/getStaff/${id}`);
      setStaffMember(data?.user);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getClinicAdmins();
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid container>
        <Grid xl={2} lg={2.5}>
          <Sidebar
            id={id}
            txt="admins/getStaff"
            roleTxt="Staff Id"
            setOpen={setOpenEditStaffMember}
            open={openEditStaffMember}
          />
        </Grid>
        <Grid className="bg" xl={10} lg={9.5}>
          <div
            className="main_div"
            style={{
              background: 'rgb(246, 250, 251)',
              height: '80vh',
            }}
          >
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
              loading={isLoading}
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
      {openEditStaffMember && (
        <EditStaffMember
          openEditStaffopeMember={openEditStaffMember}
          setOpenEditStaffMember={setOpenEditStaffMember}
          staffMemberDetails={staffMember}
          getData={getData}
          // getStaffMembers={getStaffMembers}
        />
      )}
    </>
  );
}
