import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Store } from '../../StoreContext';

function Breadcrumbs({ ClinicName, sessionID, activeTab }) {
  const location = useLocation();
  const params = useParams();
  const { id, patientId, clinicianId } = params;
  const segments = location.pathname.split('/').filter((segment) => segment !== '');
  const [navTo, setNavTo] = useState('');
  const { user } = Store();

  useEffect(() => {
    if (id || patientId || clinicianId || sessionID) {
      if (window.location.pathname.includes('clinicians')) {
        setNavTo(`/clinicians/${clinicianId || id}`);
      } else if (window.location.pathname.includes('clinics')) {
        setNavTo(`/clinics/${id}`);
      } else if (window.location.pathname.includes('patients' || 'exercise')) {
        setNavTo(`/patients/${patientId || id || sessionID}/prescription`);
      }
    }
  }, [id, patientId, clinicianId, sessionID]);

  const handleActiveTab = (targetActiveTab, segment) => {
    if (targetActiveTab === 'Pain Survey') {
      return 'Pain Survey >';
    }
    if (targetActiveTab === 'Reports') {
      return 'Reports >';
    }
    return `${segment} > `;
  };
  let dashboardLink = '';

  if (user.role === 'admin') {
    dashboardLink = '/admin/dashboard';
  } else if (user.role === 'clinic') {
    dashboardLink = '/clinic/dashboard';
  } else if (user.role === 'staff') {
    dashboardLink = '/staff/dashboard';
  } else if (user.role === 'clinician') {
    dashboardLink = '/clinician/dashboard';
  } else {
    dashboardLink = '/';
  }
  return (
    <ul>
      <div className="breadCrumb" style={{ display: 'flex' }}>
        <div className="navigationEntities">
          <Link className="breadcrumbs" to={dashboardLink}>
            Dashboard &gt;
          </Link>
        </div>
        {segments.slice(0, 1).map((segment, index) => (
          <div className="navigationEntities">
            <div key={segment}>
              <Link className="breadcrumbs" to={`/${segments.slice(0, index + 1).join('/')}`}>
                {segment} &gt;{' '}
              </Link>
              <Link to={navTo} className="breadcrumbs">
                {ClinicName} &gt;{' '}
              </Link>
              {segments[2] && (
                <Link to=" " className="breadcrumbs">
                  {handleActiveTab(activeTab, segments[2])}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </ul>
  );
}

export default Breadcrumbs;
