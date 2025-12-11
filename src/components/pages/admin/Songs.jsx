import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FormButton from '../../common/admin/FormButton';
import useFetch from '../../../hooks/useFetch';

const Section = styled.section`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
`;

const SongTitle = styled.div`
  padding: 15px 0 0 0;
  font-size: 20px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  color: #505050;
`;

const StyledGroup = styled.div`
  margin-top: 30px;
  text-align: right;
`;

function Songs() {
  const { fetchData, data: songs, loading, error } = useFetch();

  useEffect(() => {
    document.title = 'Admin | Songs';
    fetchData(`${import.meta.env.VITE_API_URL}/song`);
  }, [fetchData]);

  const handleAction = (url, method) =>
    fetchData(url, method).then(() =>
      fetchData(`${import.meta.env.VITE_API_URL}/song`),
    );

  const remove = (id) =>
    handleAction(`${import.meta.env.VITE_API_URL}/song/${id}`, 'DELETE');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!songs?.length) return <div>No songs found</div>;

  return (
    <>
      <Section>
        <ul>
          {[...songs]
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((song) => (
              <li key={song._id}>
                <Link to={`/admin/song/${song._id}/tutorials`}></Link>
                {song.title} – {song.artist}{' '}
                <button onClick={() => remove(song._id)}>Supprimer</button>
                {' - '}
                <Link to={`/admin/song/edit/${song._id}`}>Editer</Link>
                {' - '}
                <Link to={`/admin/song/${song._id}/tutorials`}>
                  Editer tutos
                </Link>
              </li>
            ))}
        </ul>
      </Section>

      <StyledGroup>
        <Link to="./add">
          <FormButton type="button">Ajouter une chanson</FormButton>
        </Link>
      </StyledGroup>
    </>
  );
}

export default Songs;
