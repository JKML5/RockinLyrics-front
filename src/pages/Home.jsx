// Home.jsx
/* eslint-disable react/jsx-props-no-spreading */

import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import AudioPlayer from '../components/AudioPlayer';
import Song from '../components/Song';

const Section = styled.section`
  background-color: ${({ theme }) =>
    theme === 'light' ? '#ffffff' : '#000000'};
  border-radius: 20px;
  padding: 0 20px;

  @media screen and (min-width: 992px) {
    max-width: 1024px;
    margin: 0 auto;
  }
`;
function Home() {
  const theme = useSelector((state) => state.theme);
  const songs = useSelector((state) => state.songs);
  const { googleId } = useSelector((state) => state.audioPlayer);

  const AudioPlayerRef = useRef();

  const plyrProps = {
    source: {
      type: 'audio',
      sources: [
        {
          src: `https://drive.google.com/uc?id=${googleId}`,
        },
      ],
    },
    options: {
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
    },
  };

  useEffect(() => {
    console.log('internal plyr instance:', AudioPlayerRef.current.plyr);

    if (googleId === '') return;
    if (AudioPlayerRef.current.plyr.source === null) return;

    AudioPlayerRef.current.plyr?.play();
  });

  const handlePlayAudio = () => {
    AudioPlayerRef.current.plyr?.play();
  };

  const handlePauseAudio = () => {
    AudioPlayerRef.current.plyr?.pause();
  };

  return (
    <>
      <Section theme={theme}>
        {songs &&
          songs.map(({ id, title, artist, tutorials }) => (
            <Song
              key={id}
              title={`${title} - ${artist}`}
              tutorials={tutorials}
              onPlayAudio={handlePlayAudio}
              onPauseAudio={handlePauseAudio}
            />
          ))}
      </Section>

      <Section>
        <AudioPlayer {...plyrProps} ref={AudioPlayerRef} />
      </Section>
    </>
  );
}

export default Home;
