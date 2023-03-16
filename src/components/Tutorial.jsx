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
      autoPlay
      src={`https://drive.google.com/uc?id=${googleId}`}
    >
      Your browser does not support the audio element.
    </audio>
  );
}

/**
 * Player video
 */
function showVideoPlayer(googleId) {
  return (
    <video
      className="player__video"
      controls
      autoPlay
      src={`https://drive.google.com/uc?id=${googleId}`}
    >
      Your browser does not support the video element.
    </video>
  );
}

/**
 * Affiche une ligne de tuto
 * @param {*} param0
 * @returns
 */
function Tutorial({ data, songId }) {
  // Liste de toutes les paroles chargées
  const lyricsList = useSelector((state) => state.lyricsList);

  // Genre M / F
  const gender = useSelector((state) => state.gender);

  const [showLyricsFlag, setShowLyricsFlag] = useState(false);
  const [showAudioPlayerFlag, setShowAudioPlayerFlag] = useState(false);
  const [showVideoPlayerFlag, setShowVideoPlayerFlag] = useState(false);

  const handleClickLyrics = () => {
    setShowLyricsFlag(!showLyricsFlag);
  };

  const handleClickAudioPlayer = () => {
    setShowAudioPlayerFlag(!showAudioPlayerFlag);
  };

  const handleClickVideoPlayer = () => {
    setShowVideoPlayerFlag(!showAudioPlayerFlag);
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
        <ButtonPlay googleId={data.id} onClick={handleClickVideoPlayer} />
        <ButtonDrive googleId={data.id} />
      </>
    );
  } else if (data.type === 'lyrics') {
    useFetchLyrics(data.id, songId);

    buttonsToShow = (
      <>
        <ButtonLyrics onClick={handleClickLyrics} />
        <ButtonDrive googleId={data.id} />
      </>
    );
  }

  const hideClass = data.gender && data.gender !== gender ? 'hide' : '';

  return (
    <div className={`tutorial ${hideClass}`} id={data.id}>
      <div className="tutorial__heading">
        {data.title}
        <div className="tutorial__heading_buttons">{buttonsToShow}</div>
      </div>
      {lyricsList[data.id] && showLyricsFlag && showLyrics(lyricsList[data.id])}
      {showAudioPlayerFlag && showAudioPlayer(data.id)}
      {showVideoPlayerFlag && showVideoPlayer(data.id)}
    </div>
  );
}

Tutorial.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    gender: PropTypes.string,
    lyrics: PropTypes.string,
  }).isRequired,
  songId: PropTypes.number.isRequired,
};

export default Tutorial;
