
// /* eslint-disable import/extensions */
// import { React, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Grid } from '@mui/material';
// import ExcerciseSideBar from '../../../components/sidebar/patient/ExerciseSidebar';
// import api from '../../../api/index.js';

// export default function Session() {
//   const params = useParams();
//   const { sessionId, prescriptionId } = params;
//   const [session, setSession] = useState({});
//   const [patient, setPatient] = useState({});

//   const handleGetSessionById = async () => {
//     await api('get', `/admins/sessions/${sessionId}`)
//       .then(async (res) => {
//         setSession(res?.data?.session);
//         await api('get', `/admins/patients/${res?.data?.session?.patient?.id}`)
//           .then((res2) => {
//             setPatient(res2?.data?.user);
//           })
//           .catch((err) => {
//             // eslint-disable-next-line no-console
//             console.error(err);
//           });
//       })
//       .catch((err) => {
//         // eslint-disable-next-line no-console
//         console.error(err);
//       });
//   };

//   useEffect(() => {
//     handleGetSessionById();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return (
//     <Grid container>
//       <Grid xl={2} lg={2.5}>
//         <div className="sideBar_nadded">
//           <ExcerciseSideBar patient={patient} session={session} prescriptionId={prescriptionId} />
//         </div>
//       </Grid>
//       <Grid className="bgMsg" xl={10} lg={9.5}>
//         <h1>unwanted screen</h1>
//       </Grid>
//     </Grid>
//   );
// }
