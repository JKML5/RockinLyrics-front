import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ButtonLyrics from './ButtonLyrics';
import ButtonPlay from './ButtonPlay';
import ButtonDrive from './ButtonDrive';
import useFetchLyrics from '../hooks/useFetchLyrics';

/**
 * Bloc d'affichage des paroles
 * @param {string} lyrics Paroles d'une chanson
 * @returns
 */
function showLyrics(lyrics) {
  return (
    <div
      className="tutorial__lyrics"
      dangerouslySetInnerHTML={{ __html: lyrics }}
    />
  );
}

/**
 * Player audio
 */
function showAudioPlayer(googleId) {
  return (
    <audio
      className="player__audio"
      controls
      src={`https://drive.google.com/uc?id=${googleId}`}
    >
      Your browser does not support the audio element.
    </audio>
  );
}

/**
 * Affiche une ligne de tuto
 * @param {*} param0
 * @returns
 */
function Tutorial({ data }) {
  // Liste de toutes les paroles chargées
  const lyricsList = useSelector((state) => state.lyricsList);

  // Booléen affichage des paroles
  const [showLyricsFlag, setShowLyricsFlag] = useState(false);

  // Booléen affichage d'un player audio
  const [showAudioPlayerFlag, setShowAudioPlayerFlag] = useState(false);

  const handleClickLyrics = () => {
    setShowLyricsFlag(!showLyricsFlag);
  };

  const handleClickAudioPlayer = () => {
    console.log('click player');
    setShowAudioPlayerFlag(!showAudioPlayerFlag);
  };

  let buttonsToShow = null;

  if (data.type === 'audio') {
    buttonsToShow = (
      <>
        <ButtonPlay googleId={data.id} onClick={handleClickAudioPlayer} />
        <ButtonDrive googleId={data.id} />
      </>
    );
  } else if (data.type === 'video') {
    buttonsToShow = (
      <>
        <ButtonPlay googleId={data.id} />
        <ButtonDrive googleId={data.id} />
      </>
    );
  } else if (data.type === 'lyrics') {
    useFetchLyrics(data.id);

    buttonsToShow = (
      <>
        <ButtonLyrics onClick={handleClickLyrics} />
        <ButtonDrive googleId={data.id} />
      </>
    );
  }

  return (
    <div className="tutorial" id={data.id}>
      <div className="tutorial__heading">
        {data.title}
        <div className="tutorial__heading_buttons">{buttonsToShow}</div>
      </div>
      {lyricsList[data.id] && showLyricsFlag && showLyrics(lyricsList[data.id])}
      {showAudioPlayerFlag && showAudioPlayer(data.id)}
    </div>
  );
}

Tutorial.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    lyrics: PropTypes.string,
  }).isRequired,
};

export default Tutorial;
