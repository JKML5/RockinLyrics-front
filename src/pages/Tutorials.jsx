import styled from 'styled-components';
import { useSelector } from 'react-redux';
import songs from '../data/songs';
import Tutorial from '../components/Tutorial';

function Tutorials() {
  const theme = useSelector((state) => state.theme);

  const Section = styled.section`
    background-color: ${theme === 'light' ? '#ffffff' : '#000000'};
    border-radius: 20px;
    padding: 0 20px;

    @media screen and (min-width: 992px) {
      max-width: 1024px;
      margin: 0 auto;
    }
  `;

  const Li = styled.li`
    border-top: ${theme === 'light'
      ? '1px solid #dddddd'
      : '1px solid #222222'};

    &:first-child {
      border-top: none;
    }
  `;

  const SongTitle = styled.a`
    width: 100%;
    padding: 15px 0;
    border: none;
    outline: none;
    text-align: left;
    font-size: 20px;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 700;
    color: ${theme === 'light' ? '#344960' : '#cccccc'};
    cursor: pointer;
    text-decoration: none;
    display: block;
  `;

  return (
    <Section>
      <ul>
        {songs.map((song) => (
          <Li key={song.id}>
            <SongTitle href={`#song_${song.id}`}>
              {song.title} - {song.artist}
            </SongTitle>
            <div className="song__content" id={`song_${song.id}`}>
              {song.tutorials.map((tutorial) => (
                <Tutorial key={tutorial.id} data={tutorial} songId={song.id} />
              ))}
            </div>
          </Li>
        ))}
      </ul>
    </Section>
  );
}

export default Tutorials;
