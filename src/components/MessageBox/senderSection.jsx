import AvatarComponent from '../Avatar/Avatar.Component';

const senderSection = ({ senderName, message }) => {
  return (
    <div className="sender">
      <div className="senderInfo">
        <div className="sender_name_msg">
          <p className="senderName">{senderName}</p>
          <p className="senderMsg">{message}</p>
        </div>
        <AvatarComponent alt={senderName} className="header_avatar" />
      </div>
    </div>
  );
};

export default senderSection;
