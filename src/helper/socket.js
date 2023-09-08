// import io from 'socket.io-client';
// import { socketURI } from '../config';

// let socket = null;

// const createSocketConnection = () => {
//   const token = localStorage.getItem('token');

//   if (token) {
//     socket = io(socketURI, {
//       extraHeaders: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     socket.on('connected', () => {
//       // eslint-disable-next-line no-console
//       console.log('Socket connection successful');
//     });
//   }

//   return socket;
// };

// export default createSocketConnection;
