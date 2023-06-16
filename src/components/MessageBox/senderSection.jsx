import React from 'react';
import AvatarComponent from '../Avatar/Avatar.Component';

const senderSection = ({ senderName, message }) => {
  return (
    <div className="sender">
      <div className="senderInfo">
        <p className="senderName">{senderName}</p>
        <AvatarComponent alt={senderName} className="header_avatar" />
      </div>
      <div>
        <p className="senderMsg">{message}</p>
      </div>
    </div>
  );
};

export default senderSection;
