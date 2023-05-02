import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ButtonLyrics from './ButtonLyrics';
import ButtonPlay from './ButtonPlay';
import ButtonDrive from './ButtonDrive';
import ContainerLyrics from './ContainerLyrics';
import showAudioPlayer from '../hooks/showAudioPlayer';
import showVideoPlayer from '../hooks/showVideoPlayer';

function Tutorial({ data, songId }) {
  const gender = useSelector((state) => state.gender);
  const category = useSelector((state) => state.category);

  const [showAudioPlayerFlag, setShowAudioPlayerFlag] = useState(false);
  const [showVideoPlayerFlag, setShowVideoPlayerFlag] = useState(false);

  const handleClickAudioPlayer = () => {
    setShowAudioPlayerFlag(!showAudioPlayerFlag);
  };

  const handleClickVideoPlayer = () => {
    setShowVideoPlayerFlag(!showVideoPlayerFlag);
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
    buttonsToShow = (
      <>
        <ButtonLyrics />
        <ButtonDrive googleId={data.id} />
      </>
    );
  }

  const hideClass =
    (data.gender && data.gender !== gender) ||
    (data.category && !data.category.includes(category))
      ? 'hide'
      : '';

  return (
    <div className={`tutorial ${hideClass}`} id={data.id}>
      <div className="tutorial__heading">
        {data.title}
        <div className="tutorial__heading_buttons">{buttonsToShow}</div>
      </div>

      {showAudioPlayerFlag && showAudioPlayer(data.id)}
      {showVideoPlayerFlag && showVideoPlayer(data.id)}

      {data.type === 'lyrics' && (
        <ContainerLyrics songId={songId} tutorialId={data.id} />
      )}
    </div>
  );
}

Tutorial.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    gender: PropTypes.string,
    category: PropTypes.arrayOf(PropTypes.string),
    lyrics: PropTypes.string,
  }).isRequired,
  songId: PropTypes.number.isRequired,
};

export default Tutorial;
