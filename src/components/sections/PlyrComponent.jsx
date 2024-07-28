import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PlyrInstance from './PlyrInstance';
import { pauseAudioPlayer, stopAudioPlayer } from '../../store';

const Section = styled.section`
  &.hidden {
    display: none;
  }
`;

const options = {
  controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings'],
  settings: ['speed'],
  speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5] },
  blankVideo: '',
};

function PlyrComponent() {
  const [currentURL, setCurrentURL] = useState('');

  const ref = useRef(null);
  const dispatch = useDispatch();
  const audioPlayer = useSelector((state) => state.audioPlayer);

  useEffect(() => {
    if (ref.current && ref.current.plyr) {
      const player = ref.current.plyr;

      if (audioPlayer.isPlaying) {
        if (currentURL !== audioPlayer.url) {
          setCurrentURL(audioPlayer.url);

          player.source = {
            type: 'audio',
            sources: [
              {
                type: 'audio/mp3',
                src: audioPlayer.url,
              },
            ],
          };
        }

        player.play();
      } else if (audioPlayer.isVisible) {
        player.pause();
      }

      if (audioPlayer.isVisible) {
        player.on('ended', () => dispatch(stopAudioPlayer()));
        player.on('pause', () => dispatch(pauseAudioPlayer()));
      }
    }
  }, [audioPlayer.isPlaying, audioPlayer.url, dispatch]);

  return (
    <Section className={`${audioPlayer.isVisible ? '' : 'hidden'}`}>
      <PlyrInstance ref={ref} options={options} />
    </Section>
  );
}

export default PlyrComponent;
