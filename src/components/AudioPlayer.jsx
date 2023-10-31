import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';
import '../css/plyr.css';

const StyledAudioPlayer = styled.div`
  width: 100%;
  background-color: #000000;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
`;

function AudioPlayer() {
  const { googleId, isVisible } = useSelector((state) => state.audioPlayer);

  const plyrOptions = {
    preload: 'none',
    autoplay: true,
    controls: [
      'play',
      'progress',
      'current-time',
      'mute',
      'volume',
      'settings',
    ],
    settings: ['speed'],
    speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5] },
  };

  return (
    isVisible && (
      <StyledAudioPlayer>
        <Plyr
          source={{
            type: 'audio',
            sources: [{ src: `https://drive.google.com/uc?id=${googleId}` }],
          }}
          options={plyrOptions}
        />
      </StyledAudioPlayer>
    )
  );
}

export default AudioPlayer;
