import React from 'react';
import lyricsButton from '../assets/text.png';

function LyricsButton() {
  return (
    <button type="button" className="btn btn-lyrics">
      <img
        src={lyricsButton}
        alt="Paroles"
        className="tutorial__heading__icon tutorial__heading__icon--text"
      />
    </button>
  );
}

export default LyricsButton;
