import React from 'react';
import PropTypes from 'prop-types';
import lyricsButton from '../assets/text.png';

function LyricsButton({ onClick }) {
  return (
    <button type="button" className="btn btn-lyrics" onClick={onClick}>
      <img
        src={lyricsButton}
        alt="Paroles"
        className="tutorial__heading__icon tutorial__heading__icon--text"
      />
    </button>
  );
}

LyricsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LyricsButton;
