import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import EmojiPicker from 'emoji-picker-react';
import { makeStyles } from '@mui/styles';
import { toast } from 'react-toastify';
import { ReactComponent as Send } from '../../assets/icons/sendMsg.svg';
import { ReactComponent as Emoji } from '../../assets/icons/emoji.svg';
import { ReactComponent as Dummy } from '../../assets/images/dummyprsn.svg';
import request from '../../request';

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

export default function ReportCard({
  title,
  heading,
  timeStamp,
  message,
  patientName,
  exerciseId,
  answer,
  answerTime,
}) {
  const [reply, setReply] = useState('');
  const [replySent, setReplySent] = useState('');
  const [replySentTime, setReplySentTime] = useState('');
  const [toReply, setToReply] = useState(false);
  const [open, setOpen] = useState(false);
  const click = useRef(null);
  const outlinedInputStyles = useOutlinedInputStyles();

  const handleSubmit = async () => {
    await request('put', `/clinicians/prescribedExercises/checkReport/${exerciseId}`, {
      report: message,
      report_time: timeStamp,
      answer: reply,
      answer_time: new Date(),
    })
      .then(() => {
        setReplySent(reply);
        setReply('');
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const EmojiOpen = () => {
    setOpen(!open);
  };

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

  useEffect(() => {
    if (answer && answerTime) {
      setReplySent(answer);
      setReplySentTime(answerTime);
    }
  }, [answer, answerTime]);

  return (
    <div className="reply-box">
      <div className="reportBoxHeader">
        <p className="exerciseReportTxt">
          {heading}
          <span className="exerciseReportName">{title}</span>
        </p>
        {!answer ? (
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
              <p className="receiverName">{patientName}</p>
              <p className="msgTimeStamp">{moment(timeStamp).format('hh:mm A MMM D')}</p>
            </div>
          </div>
          <div>
            <p className="receiverMsg">{message}</p>
          </div>
        </div>
        {replySent ? (
          <div className="reportReply">
            <div className="senderInfo">
              <div className="replySnt">
                {/* <p className="receiverName">Dr Ali</p> */}
                <p className="msgTimeStamp">
                  {replySentTime
                    ? moment(replySentTime).format('hh:mm A MMM D')
                    : moment().format('hh:mm A MMM D')}
                </p>
              </div>
              {/* <AvatarComponent alt="Dr Ali" className="reply_avatar" /> */}
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
