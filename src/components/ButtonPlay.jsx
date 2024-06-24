import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useState } from 'react';
import { launchAudioPlayer, pauseAudioPlayer } from '../store';
import playImgSrc from '../assets/play.svg';
import pauseImgSrc from '../assets/pause.svg';
import TutoLink from './shared/TutoLink';

const Image = styled.img`
  height: 17px;
  width: auto;
  margin-right: 5px;
  filter: ${({ theme }) => (theme === 'light' ? 'none' : 'invert(1);')};
`;

function ButtonPlay({ url }) {
  const dispatch = useDispatch();

  const [currentURL, setCurrentURL] = useState('');

  const theme = useSelector((state) => state.theme);
  const audioPlayer = useSelector((state) => state.audioPlayer);

  const handleClick = (action) => {
    if (action === 'play') {
      dispatch(pauseAudioPlayer());
    } else {
      dispatch(launchAudioPlayer(url));
      setCurrentURL(url);
    }
  };

  return audioPlayer.isPlaying && currentURL === url ? (
    <TutoLink type="button" onClick={() => handleClick('play')}>
      <Image theme={theme} src={pauseImgSrc} alt="Pause" />
    </TutoLink>
  ) : (
    <TutoLink type="button" onClick={() => handleClick('pause')}>
      <Image theme={theme} src={playImgSrc} alt="Lecture" />
    </TutoLink>
  );
}

ButtonPlay.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ButtonPlay;
