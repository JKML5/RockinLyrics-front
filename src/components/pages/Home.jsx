import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import Title1 from '../common/Title1';
import Song from '../sections/Song';

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 20px;
  padding: 0 20px;

  @media screen and (min-width: 992px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const Home = () => {
  const { slug } = useParams();
  const { fetchData, data: concert, error, loading } = useFetch();

  useEffect(() => {
    if (slug) {
      fetchData(`${import.meta.env.VITE_API_URL}/concert/slug/${slug}`);
    }
  }, [fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!concert) {
    return <div>No concert data found</div>;
  }

  document.title = concert.name;

  return (
    <Section>
      <Title1>{concert.name}</Title1>
      {concert.songs?.length > 0 ? (
        concert.songs.map(({ _id, title, artist, tutorials }) => (
          <Song
            key={_id}
            id={_id}
            title={`${title} - ${artist}`}
            tutorials={tutorials}
          />
        ))
      ) : (
        <div>No songs available</div>
      )}
    </Section>
  );
};

export default Home;
