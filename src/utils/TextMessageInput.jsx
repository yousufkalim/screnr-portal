import { makeStyles } from '@mui/styles';

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

export default useOutlinedInputStyles;
