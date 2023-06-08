import { toast } from 'react-toastify';

const emailValidation = (email) => {
  const emailRegex = /^[\w-]+@screnrhealth\.com$/i;
  if (
    email &&
    !emailRegex.test(email) &&
    window.location.host === 'screnr-admin-prod.falconweb.app/'
  ) {
    toast.error('Email should be in @screnrhealth.com format');
    return true;
  }
  return false;
};

export default emailValidation;
