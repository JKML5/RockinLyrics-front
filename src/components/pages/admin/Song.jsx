import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FormButton from '../../common/admin/FormButton';
import useFetch from '../../../hooks/useFetch';

const Section = styled.section`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 0 20px;

  @media screen and (min-width: 992px) {
    max-width: 1024px;
    margin: 0 auto;
    padding: 0;
  }
`;

const SongTitle = styled.div`
  padding: 15px 0 0 0;
  font-size: 20px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  color: #505050;
  display: block;
`;

const StyledGroup = styled.div`
  margin-bottom: 30px;

  &.alignright {
    text-align: right;
  }
`;

function Song() {
  const { fetchData, data: songs, error, loading } = useFetch();

  useEffect(() => {
    document.title = 'Admin | Songs';
    fetchData(`${import.meta.env.VITE_API_URL}/song`);
  }, [fetchData]);

  const handleAction = (url, method) => {
    return fetchData(url, method)
      .then(() => fetchData(`${import.meta.env.VITE_API_URL}/song`))
      .catch((error) =>
        console.error(`Error during ${method} request:`, error),
      );
  };

  const handleSongMoveUp = (songId) =>
    handleAction(
      `${import.meta.env.VITE_API_URL}/song/move-up/${songId}`,
      'PUT',
    );

  const handleSongMoveDown = (songId) =>
    handleAction(
      `${import.meta.env.VITE_API_URL}/song/move-down/${songId}`,
      'PUT',
    );

  const handleSongDelete = (songId) =>
    handleAction(`${import.meta.env.VITE_API_URL}/song/${songId}`, 'DELETE');

  const handleTutoMoveUp = (songId, tutorialId) =>
    handleAction(
      `${import.meta.env.VITE_API_URL}/song/${songId}/move-up/${tutorialId}`,
      'PUT',
    );

  const handleTutoMoveDown = (songId, tutorialId) =>
    handleAction(
      `${import.meta.env.VITE_API_URL}/song/${songId}/move-down/${tutorialId}`,
      'PUT',
    );

  const handleTutoDelete = (songId, tutorialId) =>
    handleAction(
      `${import.meta.env.VITE_API_URL}/song/${songId}/${tutorialId}`,
      'DELETE',
    );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!songs.length) {
    return <div>No songs data found</div>;
  }

  return (
    <>
      <Section>
        <ul>
          {songs.map((song) => (
            <li key={song._id}>
              <SongTitle>
                {song._id} - {song.title} - {song.artist} -{' '}
                <button
                  type="button"
                  onClick={() => handleSongMoveUp(song._id)}
                >
                  Monter
                </button>
                <button
                  type="button"
                  onClick={() => handleSongMoveDown(song._id)}
                >
                  Descendre
                </button>
                <button
                  type="button"
                  onClick={() => handleSongDelete(song._id)}
                >
                  Supprimer
                </button>
              </SongTitle>
              {Array.isArray(song.tutorials) && song.tutorials.length > 0 && (
                <div>
                  {song.tutorials.map((tutorial) => (
                    <p key={tutorial._id}>
                      {tutorial._id} - {tutorial.title} -{' '}
                      <Link to={`/admin/song/${song._id}/${tutorial._id}/edit`}>
                        Editer
                      </Link>{' '}
                      -{' '}
                      <button
                        type="button"
                        onClick={() => handleTutoDelete(song._id, tutorial._id)}
                      >
                        Supprimer
                      </button>{' '}
                      -{' '}
                      <button
                        type="button"
                        onClick={() =>
                          handleTutoMoveDown(song._id, tutorial._id)
                        }
                      >
                        Descendre
                      </button>{' '}
                      -{' '}
                      <button
                        type="button"
                        onClick={() => handleTutoMoveUp(song._id, tutorial._id)}
                      >
                        Monter
                      </button>
                    </p>
                  ))}
                </div>
              )}
              <Link to={`/admin/song/${song._id}/add`}>Ajouter un tuto</Link>
            </li>
          ))}
        </ul>
      </Section>
      <StyledGroup className="alignright">
        <Link to="./add">
          <FormButton type="button">Ajouter</FormButton>
        </Link>
      </StyledGroup>
    </>
  );
}

export default Song;
