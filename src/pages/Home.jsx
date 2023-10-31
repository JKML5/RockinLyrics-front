import { useSelector } from 'react-redux';
import styled from 'styled-components';
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

  return (
    <>
      <Section theme={theme}>
        {songs &&
          songs.map(({ id, title, artist, tutorials }) => (
            <Song
              key={id}
              title={`${title} - ${artist}`}
              tutorials={tutorials}
            />
          ))}
      </Section>

      <Section>
        <AudioPlayer />
      </Section>
    </>
  );
}

export default Home;
