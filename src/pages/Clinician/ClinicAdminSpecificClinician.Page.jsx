import { React, useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import addBtn from '../../assets/icons/addBtn.svg';
import { ReactComponent as Circle } from '../../assets/components/CardWithIcon/yellowIcon.svg';
import { ReactComponent as TotalClinicians } from '../../assets/components/CardWithIcon/patientsIcon.svg';
import { ReactComponent as Clinician } from '../../assets/components/CardWithIcon/clinician.svg';
import { ReactComponent as Patients2 } from '../../assets/components/CardWithIcon/patients.svg';
import { ReactComponent as GreenCircle } from '../../assets/components/CardWithIcon/greenCircle.svg';
import { ReactComponent as BlueCircle } from '../../assets/components/CardWithIcon/blueCircle.svg';
import Sidebar from '../../components/sidebar/GenericLeftSidebar';
import CardWithIcon from '../../components/cards/InfoCard.Component';
import ClinicianTable from '../../components/tables/clinician/ClinicianTable';
import AddClinician from '../../components/popups/clinician/AddClinician.Popup';
import EditClinicAdmin from '../../components/popups/clinicAdmin/EditClinicAdmin.Popup';
import request from '../../request';
import Breadcrumbs from '../../components/BreadCrumbs/BreadCrumbs';

export default function ClinicAdmin() {
  const [openAddClinican, setOpenAddClinican] = useState(false);
  const [openEditClinician, setOpenEditClinician] = useState(false);
  const [clinicians, setClinicians] = useState({});
  const [clinicianData, setClinicianData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const { id } = useParams();

  const getClinicians = async (page = 1) => {
    setIsLoading(true);
    try {
      const { data } = await request(
        'get',
        `/clinics/getCliniciansByClinicId/${id}?page=${page}&&active=${checked}`,
      );
      if (data) {
        setClinicians(data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const getClinicianData = async () => {
    try {
      const { data } = await request('get', `/staff/getClinic/${id}`);
      if (data) {
        setClinicianData(data.user);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleChangeCheck = () => {
    setChecked(!checked);
  };

  const activateUser = (userId) => {
    request('patch', `/clinics/activateClinician/${userId}`)
      .then(() => {
        getClinicians();
      })
      .catch((err) => {
        console.log(' ~ file: StaffSpecificClinicAdmin.Page.jsx:58 ~ activateUser ~ err:', err);
      });
  };

  useEffect(() => {
    getClinicians();
    getClinicianData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const memoizedCardsData = useMemo(
    () => [
      {
        icon: TotalClinicians,
        amount: clinicians?.count?.clinicianCount?.count || 0,
        title: 'Total Clinicians',
        icon2: Circle,
        className: 'yellow_circle',
        link: '',
      },
      {
        icon: Clinician,
        amount: clinicians?.count?.patient7Days?.count || 0,
        title: 'New Patients (last 7 days)',
        icon2: GreenCircle,
        className: 'green_circle',
      },
      {
        icon: Patients2,
        amount: clinicians?.count?.patientCount?.count || 0,
        title: 'Total Active Patients',
        icon2: BlueCircle,
        className: 'blue_circle',
      },
    ],
    [clinicians],
  );

  return (
    <>
      <div style={{ position: 'fixed' }} className="gridish">
        <div className="sideBar_div">
          <Sidebar
            id={id}
            txt="staff/getClinic"
            roleTxt="Clinic"
            // getClinicName={getClinicName}
            setOpen={setOpenEditClinician}
            open={openEditClinician}
            userData={clinicianData}
          />
        </div>
        <div style={{ width: '80%', marginLeft: 'auto' }} className="bgClinicianTable">
          {/* <div className="breadCrumb" style={{ display: 'flex' }}>
            <div
              className="navigationEntities"
              onClick={handleDashboardNavClick}
              aria-hidden="true"
            >
              Dashboard &gt;{' '}
            </div>
            <div className="navigationEntities" onClick={handleStaffNavClick} aria-hidden="true">
              Staff &gt;
            </div>
            <div> {breadcrumb} Clinic &gt;</div>
          </div> */}
          <Breadcrumbs ClinicName={clinicianData?.userData?.clinic_name} />
          <div className="main_div" style={{ background: 'rgb(246, 250, 251)', height: '85vh' }}>
            <div className="clinicianScreenCardsDiv">
              <div className="cards_div_clinician_pg">
                {memoizedCardsData?.map((item) => (
                  <CardWithIcon
                    Icon={item.icon}
                    amount={item.amount}
                    title={item.title}
                    CircleIcon={item.icon2}
                    LeftCircleClassName={item.className}
                    cardClassName="card_main_div2"
                  />
                ))}
              </div>
            </div>
            <ClinicianTable
              clinicians={clinicians}
              getClinicians={getClinicians}
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
            onClick={() => setOpenAddClinican(true)}
            role="presentation"
            alt=""
          />
        </div>

        <AddClinician
          clinicAdminId={id}
          openAddClinican={openAddClinican}
          setOpenAddClinican={setOpenAddClinican}
          getClinicians={getClinicians}
        />
      </div>

      <EditClinicAdmin
        openEditClinicAdmin={openEditClinician}
        setOpenEditClinicAdmin={setOpenEditClinician}
        clinicAdminDetails={clinicianData}
        getClinicianData={getClinicianData}
      />
    </>
  );
}
