/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';

const index = ({ selectedImage, handleClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={selectedImage}
        alt="Selected Image"
        style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '7px' }}
      />
      <div
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: '9%',
          right: '3.6%',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '50px',
          cursor: 'pointer',
        }}
      >
        &times;
      </div>
    </div>
  );
};

export default index;
