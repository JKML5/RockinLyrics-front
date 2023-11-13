// Home.jsx
/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useRef } from 'react';
import PlyrInstance from '../components/PlyrInstance';
import Song from '../components/Song';
import { launchAudioPlayer } from '../store';

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
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme);
  const songs = useSelector((state) => state.songs);

  const AudioPlayerRef = useRef(null);

  const handlePlayClick = (type, action, googleId) => {
    if (googleId === '') return;
    if (AudioPlayerRef.current.plyr.source === null) return;

    if (
      AudioPlayerRef.current.plyr.source !==
      `https://drive.google.com/uc?id=${googleId}`
    ) {
      AudioPlayerRef.current.plyr.source = {
        type: 'audio', // TODO JK A changer
        sources: [
          {
            src: `https://drive.google.com/uc?id=${googleId}`,
          },
        ],
      };
    }
    AudioPlayerRef.current.plyr?.togglePlay();
    dispatch(launchAudioPlayer(googleId));
  };

  const options = {
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
    <>
      <Section theme={theme}>
        {songs &&
          songs.map(({ id, title, artist, tutorials }) => (
            <Song
              key={id}
              title={`${title} - ${artist}`}
              tutorials={tutorials}
              onPlayClick={(playerType, playerAction, googleId) =>
                handlePlayClick(playerType, playerAction, googleId)
              }
            />
          ))}
      </Section>
      <Section>
        <PlyrInstance ref={AudioPlayerRef} source={null} options={options} />
      </Section>
    </>
  );
}

export default Home;
