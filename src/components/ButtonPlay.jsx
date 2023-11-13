import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import playImgSrc from '../assets/play.svg';
import pauseImgSrc from '../assets/pause.svg';
import TutoLink from './shared/TutoLink';

const Image = styled.img`
  height: 17px;
  width: auto;
  margin-right: 5px;
  filter: ${({ theme }) => (theme === 'light' ? 'none' : 'invert(1);')};
`;

function ButtonPlay({ type, googleId, onPlayClick }) {
  const theme = useSelector((state) => state.theme);
  const audioPlayer = useSelector((state) => state.audioPlayer);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClickTogglePlay = () => {
    onPlayClick(type, 'play', googleId);
    setIsPlaying(!isPlaying);
  };

  return (
    <TutoLink
      type="button"
      onClick={() => handleClickTogglePlay(type, googleId)}
    >
      <Image
        theme={theme}
        src={
          isPlaying && audioPlayer.googleId === googleId
            ? pauseImgSrc
            : playImgSrc
        }
        alt={
          isPlaying && audioPlayer.googleId === googleId ? 'Pause' : 'Lecture'
        }
      />
    </TutoLink>
  );
}

ButtonPlay.propTypes = {
  type: PropTypes.string.isRequired,
  googleId: PropTypes.string.isRequired,
  onPlayClick: PropTypes.func.isRequired,
};

export default ButtonPlay;
