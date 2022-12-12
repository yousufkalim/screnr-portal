import React from 'react';

export default function Button(props) {
  const { name, onClick, className, disabled, text } = props;
  return (
    <button name={name} onClick={onClick} className={className} disabled={disabled} type="button">
      {text}
    </button>
  );
}
