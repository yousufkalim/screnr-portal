import CircularProgress from '@mui/material/CircularProgress';

export default function CircularColor() {
  return (
    <CircularProgress color="primary" determinate={false} size="lg" value={25} variant="soft" />
  );
}
