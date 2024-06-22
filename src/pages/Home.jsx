import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PlyrInstance from '../components/PlyrInstance';
import Song from '../components/Song';
import { launchAudioPlayer } from '../store';
import useFetchSongs from '../hooks/useImportSongs';

const Section = styled.section`
  background-color: ${({ theme }) =>
    theme === 'light' ? '#ffffff' : '#000000'};
  border-radius: 20px;
  padding: 0 20px;

  @media screen and (min-width: 992px) {
    margin: 0 auto;
    padding: 0;
  }
`;

function Home() {
  const dispatch = useDispatch();

  useFetchSongs(); // Récupération des chansons depuis MongoDB

  const theme = useSelector((state) => state.theme);
  const songs = useSelector((state) => state.songs);

  const AudioPlayerRef = useRef(null);

  const handlePlayClick = (type, action, googleId) => {
    if (googleId === '') return;
    if (AudioPlayerRef.current.plyr.source === null) return;

    if (AudioPlayerRef.current.plyr.source !== googleId) {
      AudioPlayerRef.current.plyr.source = {
        type: 'audio', // TODO JK A changer
        sources: [
          {
            src: googleId,
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
              id={id}
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
