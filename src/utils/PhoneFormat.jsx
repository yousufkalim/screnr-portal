const PhoneFormat = (num) => {
  const match = num?.match(/(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    // eslint-disable-next-line no-param-reassign
    num = ['(', match[1], ') ', match[2], '-', match[3]].join('');
    return `+1 ${num}`;
  }
  return `+1 ${num}`;
};
export default PhoneFormat;
