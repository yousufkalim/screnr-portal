/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// mui imports
import Avatar from '@mui/material/Avatar';
// import Badge from '@mui/material/Badge';
// import { styled } from '@mui/material/styles';

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   '& .MuiBadge-badge': {
//     backgroundColor: '#44b700',
//     color: '#44b700',
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     '&::after': {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       borderRadius: '50%',
//       content: '""',
//     },
//   },
// }));

export default function AvatarComponent({ alt, src, className, onClick }) {
  const stringAvatar = (name) => {
    const fname = name.split(' ')[0] || '';
    const lname = name.split(' ')[1] || '';
    return {
      children: `${fname[0] || ''}${lname[0] || ''}`,
    };
  };

  return (
    // <StyledBadge
    //   overlap="circular"
    //   anchorOrigin={{ vertical: 'bottom', horizontal: 'right', display: 'none' }}
    //   variant="dot"
    // >
    <Avatar
      {...stringAvatar(alt.toUpperCase())}
      src={src}
      className={className}
      onClick={onClick}
    />
    // </StyledBadge>
  );
}
