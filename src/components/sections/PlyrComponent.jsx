import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PlyrInstance from './PlyrInstance';
import { pauseMediaPlayer, stopMediaPlayer } from '../../store';

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
  const [currentSource, setCurrentSource] = useState({ url: '', type: '' });

  const ref = useRef(null);
  const dispatch = useDispatch();
  const mediaPlayer = useSelector((state) => state.mediaPlayer);

  useEffect(() => {
    if (ref.current && ref.current.plyr) {
      const player = ref.current.plyr;

      if (mediaPlayer.isPlaying) {
        if (currentSource !== mediaPlayer.url) {
          setCurrentSource(mediaPlayer.url);

          player.source = {
            type: mediaPlayer.type,
            sources: [
              {
                src: mediaPlayer.url,
                type: mediaPlayer.type === 'video' ? 'video/mp4' : 'audio/mp3',
              },
            ],
          };
        }

        player.play();
      } else if (mediaPlayer.isVisible) {
        player.pause();
      }

      if (mediaPlayer.isVisible) {
        player.on('ended', () => dispatch(stopMediaPlayer()));
        player.on('pause', () => dispatch(pauseMediaPlayer()));
      }
    }
  }, [mediaPlayer.isPlaying, mediaPlayer.url, dispatch]);

  return (
    <Section className={`${mediaPlayer.isVisible ? '' : 'hidden'}`}>
      <PlyrInstance ref={ref} options={options} type={mediaPlayer.type} />
    </Section>
  );
}

export default PlyrComponent;
