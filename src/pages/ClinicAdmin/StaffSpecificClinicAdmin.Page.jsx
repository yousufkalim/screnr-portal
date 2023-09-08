import { React, useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [staffMember, setStaffMember] = useState({});
  const [clinicAdmins, setClinicAdmins] = useState({});
  const [openAddClinicAdmin, setOpenAddClinicAdmin] = useState(false);
  const [openEditStaffMember, setOpenEditStaffMember] = useState(false);
  const [checked, setChecked] = useState(true);

  const getClinicAdmins = async (page = 1) => {
    setIsLoading(true);
    try {
      const { data } = await request(
        'get',
        `/staff/getClinicsByStaffId/${id}?page=${page}&&active=${checked}`,
      );
      if (data) {
        setClinicAdmins(data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleDashboardNavClick = () => navigate('/admin/dashboard');
  const handleChangeCheck = () => setChecked(!checked);

  const getData = async () => {
    try {
      const { data } = await request('get', `/admins/getStaff/${id}`);
      setStaffMember(data?.user);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const activateUser = (userId) => {
    request('patch', `/staffs/activateClinic/${userId}`)
      .then(() => {
        getClinicAdmins();
      })
      .catch((err) => {
        console.log('~ file: StaffSpecificClinicAdmin.Page.jsx:58 ~ activateUser ~ err:', err);
      });
  };

  useEffect(() => {
    getClinicAdmins();
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <>
      <div style={{ position: 'fixed' }} className="gridish">
        <div className="sideBar_div">
          <Sidebar
            id={id}
            txt="admins/getStaff"
            roleTxt="Staff Id"
            open={openEditStaffMember}
            setOpen={setOpenEditStaffMember}
            userData={staffMember}
          />
        </div>
        <div className="bg">
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
              handleChangeCheck={handleChangeCheck}
              checked={checked}
              activateUser={activateUser}
            />
          </div>
        </div>
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
      </div>
      {openEditStaffMember && (
        <EditStaffMember
          openEditStaffMember={openEditStaffMember}
          setOpenEditStaffMember={setOpenEditStaffMember}
          staffMemberDetails={staffMember}
          getData={getData}
          // getStaffMembers={getStaffMembers}
        />
      )}
    </>
  );
}
