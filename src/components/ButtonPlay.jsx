import React from 'react';
import PropTypes from 'prop-types';
import playImgSrc from '../assets/play.svg';

function ButtonPlay({ googleId, className }) {
  function handleClick() {
    console.log(googleId);
  }

  return (
    <button
      type="button"
      className={`btn tutorial__audio ${className}`}
      onClick={handleClick}
    >
      <img
        src={playImgSrc}
        alt="Jouer"
        className="tutorial__heading__icon tutorial__heading__icon--text"
      />
    </button>
  );
}

ButtonPlay.defaultProps = {
  googleId: '',
  className: '',
};

ButtonPlay.propTypes = {
  googleId: PropTypes.string,
  className: PropTypes.string,
};

export default ButtonPlay;
