import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

function Breadcrumbs({ ClinicName, sessionID }) {
  const location = useLocation();
  const params = useParams();
  const { id, patientId, clinicianId } = params;
  const segments = location.pathname.split('/').filter((segment) => segment !== '');
  const [navTo, setNavTo] = useState('');

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

  return (
    <ul>
      <div className="breadCrumb" style={{ display: 'flex' }}>
        <div className="navigationEntities">
          <Link className="breadcrumbs" to="/">
            Dashboard &gt;{' '}
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
                  {segments[2]} &gt;{' '}
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
