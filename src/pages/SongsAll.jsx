import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
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

function SongsAll() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    // Récupération des chansons publiques
    fetch(`${import.meta.env.VITE_API_URL}/song?public=true`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSongs(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Title1 theme="light">Public Songs</Title1>
      <Section theme={theme}>
        {songs &&
          songs.map(({ id, title, artist, tutorials }) => (
            <Song
              key={id}
              id={id}
              title={`${title} - ${artist}`}
              tutorials={tutorials}
            />
          ))}
      </Section>
    </>
  );
}

export default SongsAll;
