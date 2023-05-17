import React from 'react';
import AvatarComponent from '../Avatar/Avatar.Component';

const recieverSection = ({ recieverName, message }) => {
  return (
    <div className="receiver">
      <div className="receivrInfo">
        <AvatarComponent alt={recieverName} className="header_avatar" />
        <p className="receiverName">{recieverName}</p>
      </div>
      <div>
        <p className="receiverMsg">{message}</p>
      </div>
    </div>
  );
};

export default recieverSection;
