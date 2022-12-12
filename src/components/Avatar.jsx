import React from 'react';
import Avatar from '@mui/material/Avatar';

function AvatarComponent(props) {
  const { alt, src, className } = props;

  const stringAvatar = (name) => {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  };

  return <Avatar alt={stringAvatar(alt)} src={src} className={className} />;
}

export default AvatarComponent;
