import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import Title1 from '../common/Title1';
import Song from '../sections/Song';
import { setConcertCategories } from '../../store';

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
  const dispatch = useDispatch();
  const { fetchData, data: concert, error, loading } = useFetch();

  useEffect(() => {
    if (slug) {
      fetchData(`${import.meta.env.VITE_API_URL}/concert/slug/${slug}`);
    }
  }, [slug, fetchData]);

  // Extraction des catégories dès que le concert est chargé
  useEffect(() => {
    if (!concert) return;

    const set = new Set();

    concert.songs?.forEach((song) => {
      song.categories?.forEach((c) => set.add(c));

      // Si les tutoriels contiennent aussi des catégories :
      song.tutorials?.forEach((t) => t.categories?.forEach((c) => set.add(c)));
    });

    dispatch(setConcertCategories([...set]));
  }, [concert, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!concert) return <div>No concert data found</div>;

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
