import React, { useState, useRef, useEffect } from 'react';

// mui imports
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

// emoji picker
import EmojiPicker from 'emoji-picker-react';

// assets
import { ReactComponent as Send } from '../../assets/icons/sendMsg.svg';
import { ReactComponent as Emoji } from '../../assets/icons/emoji.svg';
import { ReactComponent as Dummy } from '../../assets/images/dummyprsn.svg';
import AvatarComponent from '../Avatar';

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
export default function ReportCard() {
  const [reply, setReply] = useState('');
  const [replySent, setReplySent] = useState('');
  const [toReply, setToReply] = useState(false);
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
    setReplySent(reply);
    setReply('');
  };

  const EmojiOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="reply-box">
      <div className="reportBoxHeader">
        <p className="exerciseReportTxt">
          Exercise: <span className="exerciseReportName"> Supine Bridge</span>
        </p>
        {!toReply ? (
          <Button onClick={() => setToReply(true)} className="replyBtn" variant="contained">
            Reply
          </Button>
        ) : (
          ''
        )}
      </div>
      <div className="__replies">
        <div className="report">
          <div className="receivrInfo">
            <Dummy />
            <div>
              <p className="receiverName">Sabbir Ali</p>
              <p className="msgTimeStamp">04:00 AM Oct 8</p>
            </div>
          </div>
          <div>
            <p className="receiverMsg">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        {replySent ? (
          <div className="reportReply">
            <div className="senderInfo">
              <div className="replySnt">
                <p className="receiverName">Dr Ali</p>
                <p className="msgTimeStamp">04:00 AM Oct 8</p>
              </div>
              <AvatarComponent alt="Dr Ali" className="reply_avatar" />
            </div>
            <div>
              <p className="senderMsg">{replySent}</p>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      {replySent || !toReply ? (
        ''
      ) : (
        <TextField
          classes={outlinedInputStyles}
          value={reply}
          sx={{
            width: '100%',
            mt: 2,
          }}
          placeholder="Type a message here"
          onChange={(e) => setReply(e.target.value)}
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
                        setReply((prevMsg) => prevMsg + emojiObject.emoji)
                      }
                    />
                  </div>
                ) : null}
                <Send className="msgSendBtn" onClick={handleSubmit} />
              </InputAdornment>
            ),
          }}
        />
      )}
    </div>
  );
}
