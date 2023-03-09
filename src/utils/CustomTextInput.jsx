import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { ReactComponent as Search } from '../assets/icons/searchIcon.svg';

function IconTextField({ value, handleChange }) {
  return (
    <TextField
      sx={{
        backgroundColor: '#F6FAFB',
        color: 'white',
        borderRadius: '25px',
        padding: '0px 20px',
        width: '70%',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none',
            borderRadius: '20px',
          },
        },
      }}
      placeholder="Search"
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search className="pointer" />
          </InputAdornment>
        ),
        style: {
          color: '#919B9B',
        },
      }}
    />
  );
}
export default IconTextField;
