import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useState } from 'react';
import { launchAudioPlayer, pauseAudioPlayer } from '../../../store';
import playImgSrc from '../../../assets/images/play.svg';
import pauseImgSrc from '../../../assets/images/pause.svg';
import TutorialButton from '../../common/TutorialButton';

const Image = styled.img`
  height: 17px;
  width: auto;
  margin-right: 5px;
  filter: ${({ theme }) => theme.tutorial.iconFilter};
`;

const ButtonPlay = ({ url }) => {
  const dispatch = useDispatch();

  const [currentURL, setCurrentURL] = useState('');

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
    <TutorialButton type="button" onClick={() => handleClick('play')}>
      <Image src={pauseImgSrc} alt="Pause" />
    </TutorialButton>
  ) : (
    <TutorialButton type="button" onClick={() => handleClick('pause')}>
      <Image src={playImgSrc} alt="Lecture" />
    </TutorialButton>
  );
};

ButtonPlay.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ButtonPlay;
