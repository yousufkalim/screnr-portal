import React, { useState, useRef, useEffect } from 'react';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import EmojiPicker from 'emoji-picker-react';
import { ReactComponent as Send } from '../assets/icons/sendMsg.svg';
import { ReactComponent as Emoji } from '../assets/icons/emoji.svg';
import { ReactComponent as Dummy } from '../assets/images/dummyprsn.svg';
import { ReactComponent as Dots } from '../assets/icons/threedots.svg';
import { ReactComponent as Back } from '../assets/icons/backBtn.svg';
import AvatarComponent from './Avatar';
import useOutlinedInputStyles from '../utils/TextMessageInput';

function MessageBox() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [open, setOpen] = useState(false);
  const click = useRef(null);
  const outlinedInputStyles = useOutlinedInputStyles();

  useEffect(() => {
    const handleCloseEmojiSection = (e) => {
      if (click.current && open && !click.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleCloseEmojiSection);

    return () => {
      document.removeEventListener('mousedown', handleCloseEmojiSection);
    };
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, newMessage]);
    setNewMessage('');
  };

  const EmojiOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <div className="headerInfo">
          <div className="receivrInfo">
            <div className="iconsSec">
              <Back className="backBtn" />
              <Dummy />
            </div>
            <div className="">
              <p className="receiverHeaderName">Sabbir Ali</p>
              <p className="patientId">
                Patient ID: <span style={{ color: '#FBA622' }}>12345</span>
              </p>
            </div>
          </div>
          <div>
            <Dots className="pointer" />
          </div>
        </div>
      </div>
      <div className="chat-box__messages">
        <div className="receiver">
          <div className="receivrInfo">
            <Dummy />
            <p className="receiverName">Sabbir Ali</p>
          </div>
          <div>
            <p className="receiverMsg">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>

        {messages.map((message) => (
          <div className="sender">
            <div className="senderInfo">
              <p className="senderName">Dr Ali</p>
              {/* <Dummy />
               */}
              <AvatarComponent alt="Dr Ali" className="header_avatar" />
            </div>
            <div>
              <p className="senderMsg">{message}</p>
            </div>
          </div>
        ))}
      </div>

      <TextField
        classes={outlinedInputStyles}
        value={newMessage}
        sx={{
          position: 'absolute',
          bottom: '10%',
          width: '75%',
          ml: 4,
          '@media (max-width: 1600px)': { width: '72%', ml: 0 },
        }}
        placeholder="Type a message here"
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            handleSubmit(e);
          }
        }}
        InputProps={{
          style: { alignItems: 'center' },
          endAdornment: (
            <InputAdornment position="end">
              <Emoji className="msgSendBtn" onClick={EmojiOpen} />

              {open ? (
                <div className="emoji-open" ref={click}>
                  <EmojiPicker
                    onEmojiClick={(emojiObject) =>
                      setNewMessage((prevMsg) => prevMsg + emojiObject.emoji)
                    }
                  />
                </div>
              ) : null}
              <Send className="msgSendBtn" onClick={handleSubmit} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default MessageBox;
