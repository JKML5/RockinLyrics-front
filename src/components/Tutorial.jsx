import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ButtonLyrics from './ButtonLyrics';
import ButtonPlay from './ButtonPlay';
import ButtonDrive from './ButtonDrive';
import useFetchLyrics from '../hooks/useFetchLyrics';
import showLyrics from '../hooks/showLyrics';
import showAudioPlayer from '../hooks/showAudioPlayer';
import showVideoPlayer from '../hooks/showVideoPlayer';

/**
 * Affiche une ligne de tuto
 * @param {*} param0
 * @returns
 */
function Tutorial({ data, songId }) {
  const lyricsList = useSelector((state) => state.lyricsList);
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
