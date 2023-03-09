import React from 'react';
import PropTypes from 'prop-types';
import playImgSrc from '../assets/play.svg';

function ButtonPlay({ onClick }) {
  return (
    <button type="button" className="btn tutorial__audio" onClick={onClick}>
      <img
        src={playImgSrc}
        alt="Jouer"
        className="tutorial__heading__icon tutorial__heading__icon--text"
      />
    </button>
  );
}

ButtonPlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonPlay;
