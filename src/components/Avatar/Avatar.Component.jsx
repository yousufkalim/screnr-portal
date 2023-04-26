import React from 'react';
import Avatar from '@mui/material/Avatar';

export default function AvatarComponent({ alt, src, className, onClick }) {
  const fname = alt.toUpperCase().split(' ')[0] || '';
  const lname = alt.toUpperCase().split(' ')[1] || '';
  return (
    <Avatar onClick={onClick} src={src} className={className}>
      {`${fname[0] || ''}${lname[0] || ''}`}
    </Avatar>
  );
}
