// import React from 'react';
// import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
// import Login from '../unAuth/Login';
// // roles layouts
// import SuperAdminLayout from '../Layouts/superAdminLayout';
// import StaffLayout from '../Layouts/staffLayout';
// import ClinicAdminLayout from '../Layouts/clinicAdminLayout';
// import CliniciansLayout from '../Layouts/cliniciansLayout';
// import PatientsLayout from '../Layouts/patientsLayout';

// const index = ({ user }) => {
//   const roleRoutesConfig = {
//     admin: {
//       path: '/admin',
//       component: <SuperAdminLayout />,
//     },
//     staff: {
//       path: '/staff',
//       component: <StaffLayout />,
//     },
//     clinic: {
//       path: '/clinic',
//       component: <ClinicAdminLayout />,
//     },
//     clinician: {
//       path: '/clinician',
//       component: <CliniciansLayout />,
//     },
//     patient: {
//       path: '/patient',
//       component: <PatientsLayout />,
//     },
//   };
//   function DashboardRoute(targetUser) {
//     const { role } = targetUser || {};
//     const routeConfig = roleRoutesConfig[role];

//     return routeConfig ? (
//       <Route path={routeConfig.path} element={routeConfig.component} />
//     ) : (
//       <Navigate to="/" />
//     );
//   }

//   console.log('------> user', user);

//   return (
//     <Routes>
//       <Route path="/" element={<Outlet />}>
//         {user ? (
//           <DashboardRoute targetUser={user} />
//         ) : (
//           <>
//             <Route path="login" element={<Login />} />
//             <Navigate to="/login" />
//           </>
//         )}
//       </Route>
//     </Routes>
//   );
// };

// export default index;
