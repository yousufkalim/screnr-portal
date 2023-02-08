import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  radio: {
    color: '#D1D1D6 !important',
    '&$checked': {
      color: '#136773 !important',
    },
  },
  checkBox: {
    color: ' #919B9B !important',
    '&$checked': {
      color: '#136773 !important',
    },
  },
  checked: {},
}));

export default useStyles;
