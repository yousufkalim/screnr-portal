/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';

const index = ({
  selectedImageIndex,
  handleClose,
  handlePrevImage,
  handleNextImage,
  dumyImages,
}) => {
  const isFirstImage = selectedImageIndex === 0;
  const isLastImage = selectedImageIndex === dumyImages.length - 1;

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
        src={dumyImages[selectedImageIndex]}
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
      <div
        onClick={handlePrevImage}
        style={{
          position: 'absolute',
          top: '50%',
          left: '3.6%',
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '70px',
          cursor: 'pointer',
          visibility: isFirstImage ? 'hidden' : 'visible',
        }}
        disabled={isFirstImage}
      >
        &#8249;
      </div>
      <div
        onClick={handleNextImage}
        style={{
          position: 'absolute',
          top: '50%',
          right: '3.6%',
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '70px',
          cursor: 'pointer',
          visibility: isLastImage ? 'hidden' : 'visible',
        }}
        disabled={isLastImage}
      >
        &#8250;
      </div>
    </div>
  );
};

export default index;
