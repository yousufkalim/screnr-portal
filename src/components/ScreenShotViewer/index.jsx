/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';

const index = ({
  selectedImageIndex,
  handleClose,
  handlePrevImage,
  handleNextImage,
  screenshots,
}) => {
  const isFirstImage = selectedImageIndex === 0;
  const isLastImage = selectedImageIndex === screenshots.length - 1;

  return (
    <div className="screenshotReviewer-main-container">
      <img
        src={`https://screnr-api-dev.falconweb.app/${screenshots[selectedImageIndex]}`}
        alt="Selected Image"
        className="screenshotReviewer-image"
      />
      <div onClick={handleClose} className="screenshotReviewer-image-close-btn">
        &times;
      </div>
      <div
        disabled={isFirstImage}
        onClick={handlePrevImage}
        className="screenshotReviewer-image-next-btn"
        style={{
          visibility: isFirstImage ? 'hidden' : 'visible',
        }}
      >
        &#8249;
      </div>
      <div
        disabled={isLastImage}
        onClick={handleNextImage}
        className="screenshotReviewer-image-prev-btn"
        style={{
          visibility: isLastImage ? 'hidden' : 'visible',
        }}
      >
        &#8250;
      </div>
    </div>
  );
};

export default index;
