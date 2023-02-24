import { useState } from 'react';
// For Phone number format
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function CustomPhoneInput({ staffMember, setStaffMember }) {
  const [hide, setHide] = useState(false);
  const handleTextHide = () => {
    setHide(true);
  };
  const handleTextShow = () => {
    setHide(false);
  };

  return (
    <div
      className={
        staffMember.phone_number === undefined || staffMember.phone_number === '1'
          ? 'placeholerPhone'
          : ''
      }
    >
      <PhoneInput
        country="us"
        onlyCountries={['us']}
        value={staffMember.phone_number}
        onChange={(value) => {
          setStaffMember({ ...staffMember, phone_number: value });
        }}
        onFocus={handleTextHide}
        onBlur={handleTextShow}
        disableDropdown
        countryCodeEditable={false}
        disableCountryGuess
      />
      {staffMember.phone_number === undefined || staffMember.phone_number === '1' ? (
        <p
          className="dummyPlaceholder"
          id="txtClick"
          role="presentation"
          onClick={() =>
            document.querySelector('.placeholerPhone .react-tel-input .form-control').focus()
          }
        >
          {hide ? ' ' : 'Phone number'}
        </p>
      ) : (
        ''
      )}
    </div>
  );
}

export default CustomPhoneInput;
