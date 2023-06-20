import React, { useState, useRef, useEffect } from 'react';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import EmojiPicker from 'emoji-picker-react';
import { makeStyles } from '@mui/styles';
import { ReactComponent as Send } from '../../assets/icons/sendMsg.svg';
import { ReactComponent as Emoji } from '../../assets/icons/emoji.svg';
import { ReactComponent as Dots } from '../../assets/icons/threedots.svg';
import { ReactComponent as Back } from '../../assets/icons/backBtn.svg';
import AvatarComponent from '../Avatar/Avatar.Component';
import SenderSection from './senderSection';
import ReciverSection from './recieverSection';
import request from '../../request/index';

// import { getMediaUrl } from '../../config';

const useOutlinedInputStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
        borderTop: '2px solid #E1E1E1 ',
        borderRadius: 0,
        fontSize: 16,
        width: 'auto',
      },
      '&:hover fieldset': {
        borderColor: '#FBA622',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FBA622',
      },
    },
  },
});

function MessageBox({
  patient,
  allMessages,
  clinician,
  chatId,
  setAllMessages,
  handleSendMessage,
  setLastKey,
  lastKey,
}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [open, setOpen] = useState(false);
  const click = useRef(null);
  const allMessagediv = useRef(null);
  const outlinedInputStyles = useOutlinedInputStyles();
  const [messageLimit, setMessageLimit] = useState(5);
  const [isLastList, setIsLastList] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, newMessage]);
    handleSendMessage(chatId, newMessage, patient?.id, clinician?.id);
    setAllMessages([
      ...allMessages,
      {
        chat: chatId,
        content: newMessage,
        receiver: patient?.id,
        sender: clinician?.id,
      },
    ]);
    setNewMessage('');
  };

  const EmojiOpen = () => setOpen(!open);
  const handleSentMessage = (value) => setNewMessage(value);

  const fetchMessages = async () => {
    if (Object.prototype.hasOwnProperty.call(lastKey, 'id')) {
      await request(
        'get',
        `/messages/allMessages/${chatId}?limit=${messageLimit}&id=${lastKey?.id}&createdAt=${lastKey?.createdAt}`,
      )
        .then((res) => {
          if (res.data.messages.length > 0) {
            setLastKey(res.data.lastKey);
            const newMessages = res.data.messages.reverse();
            const concatingAllMessages = [...newMessages, ...allMessages];
            setAllMessages(concatingAllMessages);
            if (Object.prototype.hasOwnProperty.call(res.data, 'lastKey')) {
              setMessageLimit(5);
            } else {
              setIsLastList(true);
              setLastKey({});
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onScroll = () => {
    if (allMessagediv.current) {
      const { scrollTop } = allMessagediv.current;
      if (scrollTop === 0) {
        if (!isLastList) {
          fetchMessages();
        }
      }
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat messages when they change
    if (allMessagediv.current) {
      allMessagediv.current.scrollTop = allMessagediv.current.scrollHeight;
    }
  }, [allMessages]);
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

  return (
    <div className="chat-box">
      <div className="chat-header">
        <div className="headerInfo">
          <div className="receivrInfo">
            <div className="iconsSec">
              <Back className="backBtn" />
              <AvatarComponent
                // src={getMediaUrl(patient?.profile_pic)}
                alt={`${patient?.first_name} ${patient?.last_name}`}
                className="header_avatar"
              />
            </div>
            <div className="">
              <p className="receiverHeaderName">
                {patient?.first_name} {patient?.last_name}
              </p>
              <p className="patientId">
                Patient ID: <span style={{ color: '#FBA622' }}>{patient?.id}</span>
              </p>
            </div>
          </div>
          <div>
            <Dots className="pointer" />
          </div>
        </div>
      </div>
      <div className="chat-box__messages" ref={allMessagediv} onScroll={onScroll}>
        {allMessages?.map((item) =>
          item?.sender === clinician?.id ? (
            <SenderSection
              senderName={`${clinician?.first_name} ${clinician?.last_name}`}
              message={item?.content}
              key={item?.key}
            />
          ) : (
            <ReciverSection
              recieverName={`${patient?.first_name} ${patient?.last_name}`}
              message={item?.content}
              key={item?.key}
            />
          ),
        )}
      </div>

      <TextField
        classes={outlinedInputStyles}
        value={newMessage}
        sx={{
          position: 'absolute',
          bottom: '30px',
          width: '100%',
          left: '0',
          pl: '20px',
          pr: '20px',
        }}
        placeholder="Type a message here"
        onChange={(e) => {
          handleSentMessage(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            handleSubmit(e);
          }
        }}
        InputProps={{
          style: { alignItems: 'center', paddingTop: '10px' },
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
