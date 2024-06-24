import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Title1 from '../components/shared/Title1';
import Song from '../components/Song';

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

function ConcertPage() {
  const theme = useSelector((state) => state.theme);

  const { slug } = useParams();
  const [concert, setConcert] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupération des détails du concert basé sur le slug
    fetch(`${import.meta.env.VITE_API_URL}/concert/slug/${slug}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Concert not found');
        }
        return response.json();
      })
      .then((data) => {
        setConcert(data);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [slug]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!concert) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Title1 theme={theme}>{concert.name}</Title1>
      <Section theme={theme}>
        {concert.songs &&
          concert.songs.map(({ _id, title, artist, tutorials }) => (
            <Song
              key={_id}
              id={_id}
              title={`${title} - ${artist}`}
              tutorials={tutorials}
            />
          ))}
      </Section>
    </>
  );
}

export default ConcertPage;
