import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import playImgSrc from '../assets/play.svg';
import pauseImgSrc from '../assets/pause.svg';
import TutoLink from './shared/TutoLink';
import { toggleAudioPlayer } from '../store';

const Image = styled.img`
  height: 17px;
  width: auto;
  margin-right: 5px;
  filter: ${({ theme }) => (theme === 'light' ? 'none' : 'invert(1);')};
`;

function ButtonPlay({ googleId, onPlayAudio, onPauseAudio }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const audioPlayer = useSelector((state) => state.audioPlayer);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClickTogglePlay = () => {
    if (isPlaying) {
      onPauseAudio();
    } else if (audioPlayer.googleId === googleId) {
      onPlayAudio();
    } else {
      setIsPlaying(false);

      dispatch(toggleAudioPlayer(googleId));
    }

    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <TutoLink type="button" onClick={handleClickTogglePlay}>
      <Image
        theme={theme}
        src={
          isPlaying && googleId === audioPlayer.googleId
            ? pauseImgSrc
            : playImgSrc
        }
        alt={isPlaying ? 'Pause' : 'Lecture'}
      />
    </TutoLink>
  );
}

ButtonPlay.propTypes = {
  googleId: PropTypes.string.isRequired,
  onPlayAudio: PropTypes.func.isRequired,
  onPauseAudio: PropTypes.func.isRequired,
};

export default ButtonPlay;
