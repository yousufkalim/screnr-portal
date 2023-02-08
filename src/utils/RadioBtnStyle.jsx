import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  radio: {
    color: '#D1D1D6',
    '&$checked': {
      color: '#136773',
    },
  },
  checked: {},
}));

export default useStyles;
