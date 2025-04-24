import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import Title1 from '../common/Title1';
import Partition from '../sections/Partition';

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 20px;
  padding: 0 20px;

  @media screen and (min-width: 992px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const Partitions = () => {
  const { slug } = useParams();
  const { fetchData, data: concert, error, loading } = useFetch();

  useEffect(() => {
    if (slug) {
      fetchData(`${import.meta.env.VITE_API_URL}/concert/slug/${slug}`);
    }
  }, [fetchData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!concert?.songs?.length) return;

      const anchors = concert.songs.map((song) => `partition-${song._id}`);
      const currentIndex = anchors.findIndex((id) => {
        const el = document.getElementById(id);
        return el && el.getBoundingClientRect().top >= 0;
      });

      if (e.key === 'ArrowRight') {
        const nextId = anchors[currentIndex + 1];
        if (nextId)
          document
            .getElementById(nextId)
            ?.scrollIntoView({ behavior: 'smooth' });
      }

      if (e.key === 'ArrowLeft') {
        const prevId = anchors[currentIndex - 1];
        if (prevId)
          document
            .getElementById(prevId)
            ?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [concert]);

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
          <Partition
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

export default Partitions;
