import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useState } from 'react';
import { launchMediaPlayer, pauseMediaPlayer } from '../../../store';
import playImgSrc from '../../../assets/images/play.svg';
import pauseImgSrc from '../../../assets/images/pause.svg';
import TutorialButton from '../../common/TutorialButton';

const Image = styled.img`
  height: 17px;
  width: auto;
  margin-right: 5px;
  filter: ${({ theme }) => theme.tutorial.iconFilter};
`;

const ButtonPlay = ({ url, type }) => {
  const dispatch = useDispatch();

  const [currentURL, setCurrentURL] = useState('');

  const mediaPlayer = useSelector((state) => state.mediaPlayer);

  const handleClick = (action) => {
    if (action === 'play') {
      dispatch(pauseMediaPlayer());
    } else {
      dispatch(launchMediaPlayer(url, type));
      setCurrentURL(url);
    }
  };

  return mediaPlayer.isPlaying && currentURL === url ? (
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
