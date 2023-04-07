import { React, useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import addBtn from '../../assets/icons/addBtn.svg';
import { ReactComponent as Circle } from '../../assets/components/CardWithIcon/yellowIcon.svg';
import { ReactComponent as TotalClinicians } from '../../assets/components/CardWithIcon/patientsIcon.svg';
import { ReactComponent as Clinician } from '../../assets/components/CardWithIcon/clinician.svg';
import { ReactComponent as Patients2 } from '../../assets/components/CardWithIcon/patients.svg';
import { ReactComponent as GreenCircle } from '../../assets/components/CardWithIcon/greenCircle.svg';
import { ReactComponent as BlueCircle } from '../../assets/components/CardWithIcon/blueCircle.svg';
import Sidebar from '../../components/sidebar/GenericLeftSidebar';
import CardWithIcon from '../../components/cards/CardWithIcon';
import ClinicianTable from '../../components/tables/clinician/ClinicianTable';
import AddClinician from '../../components/popups/clinician/AddNewClinician';
import EditClinicAdmin from '../../components/popups/clinicAdmin/EditClinicAdmin';
import api from '../../api';

export default function ClinicAdmin() {
  const [openAddClinican, setOpenAddClinican] = useState(false);
  const [openEditClinician, setOpenEditClinician] = useState(false);
  const [clinicians, setClinicians] = useState({});
  const [clinicianData, setClinicianData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const getClinicians = async (page = 1) => {
    setIsLoading(true);
    try {
      const { data } = await api('get', `/clinicians/getCliniciansByClinicId/${id}?page=${page}`);
      if (data) {
        setClinicians(data);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const getClinicianData = async () => {
    const { data } = await api('get', `/admins/clinics/${id}`);
    if (data) {
      setClinicianData(data.user);
    }
  };

  const getClinicName = (name) => {
    setBreadcrumb(name);
  };
  const handleDashboardNavClick = () => {
    navigate('/dashboard');
  };
  const handleStaffNavClick = () => {
    window.history.back();
  };

  useEffect(() => {
    getClinicians();
    getClinicianData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardsData = [
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
  ];

  return (
    <>
      <Grid container>
        <Grid xl={2} lg={2.5}>
          <Sidebar
            id={id}
            txt="admins/clinics"
            roleTxt="Clinic"
            getClinicName={getClinicName}
            setOpen={setOpenEditClinician}
            open={openEditClinician}
          />
        </Grid>
        <Grid className="bgClinicianTable" xl={10} lg={9.5}>
          <div className="breadCrumb" style={{ display: 'flex' }}>
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
          </div>

          <div className="main_div" style={{ background: 'rgb(246, 250, 251)', height: '85vh' }}>
            <div className="clinicianScreenCardsDiv">
              <div className="cards_div_clinician_pg">
                {cardsData.map((item) => (
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
            />
          </div>
        </Grid>
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
      </Grid>

      <EditClinicAdmin
        openEditClinicAdmin={openEditClinician}
        setOpenEditClinicAdmin={setOpenEditClinician}
        clinicAdminDetails={clinicianData}
      />
    </>
  );
}
