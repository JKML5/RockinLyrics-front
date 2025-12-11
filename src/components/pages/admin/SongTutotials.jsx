import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useFetch from '../../../hooks/useFetch';
import FormButton from '../../common/admin/FormButton';

const Section = styled.section`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
  font-family: 'Roboto Condensed', sans-serif;
`;

function AdminSongTutorials() {
  const { songId } = useParams();
  const { fetchData, data: song, loading, error } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_URL}/song/${songId}`);
  }, [songId, fetchData]);

  const handleAction = (url, method) =>
    fetchData(url, method).then(() =>
      fetchData(`${import.meta.env.VITE_API_URL}/song/${songId}`),
    );

  const moveUp = (tId) =>
    handleAction(
      `${import.meta.env.VITE_API_URL}/song/${songId}/move-up/${tId}`,
      'PUT',
    );

  const moveDown = (tId) =>
    handleAction(
      `${import.meta.env.VITE_API_URL}/song/${songId}/move-down/${tId}`,
      'PUT',
    );

  const remove = (tId) =>
    handleAction(
      `${import.meta.env.VITE_API_URL}/song/${songId}/${tId}`,
      'DELETE',
    );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error : {error.message}</div>;
  if (!song) return <div>Song not found</div>;

  return (
    <Section>
      <Title>Tutoriels – {song.title}</Title>

      {song.tutorials?.length ? (
        song.tutorials.map((tuto) => (
          <div key={tuto._id}>
            {tuto.title}

            <button onClick={() => moveUp(tuto._id)}>Monter</button>
            <button onClick={() => moveDown(tuto._id)}>Descendre</button>
            <button onClick={() => remove(tuto._id)}>Supprimer</button>

            <Link to={`/admin/song/${song._id}/${tuto._id}/edit`}>Editer</Link>
          </div>
        ))
      ) : (
        <div>Aucun tutoriel</div>
      )}

      <br />

      <Link to={`/admin/song/${songId}/add`}>
        <FormButton type="button">Ajouter un tuto</FormButton>
      </Link>

      <br />
      <br />

      <Link to="/admin/song">← Retour aux chansons</Link>
    </Section>
  );
}

export default AdminSongTutorials;
