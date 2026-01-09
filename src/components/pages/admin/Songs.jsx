import { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import FormButton from '../../common/admin/FormButton';
import useFetch from '../../../hooks/useFetch';
import Table from '../../common/admin/Table';
import TableActionGroup from '../../common/admin/TableActionGroup';

const Section = styled.section`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
`;

const StyledGroup = styled.div`
  margin-top: 30px;
  text-align: right;
`;

function Songs() {
  const { fetchData, data: songs, loading, error } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Admin | Songs';
    fetchData(`${import.meta.env.VITE_API_URL}/song`);
  }, [fetchData]);

  const handleAction = (url, method) =>
    fetchData(url, method).then(() =>
      fetchData(`${import.meta.env.VITE_API_URL}/song`),
    );

  const remove = (id) => {
    if (!window.confirm('Confirmer la suppression ?')) return;
    handleAction(`${import.meta.env.VITE_API_URL}/song/${id}`, 'DELETE');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!songs?.length) return <div>No songs found</div>;

  return (
    <>
      <Section>
        <Table>
          {[...songs]
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((song) => (
              <tr key={song._id}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.tags?.length ? song.tags.join(', ') : '—'}</td>
                <td>
                  <TableActionGroup>
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/song/edit/${song._id}`)}
                    >
                      Éditer
                    </button>
                    <button type="button" onClick={() => remove(song._id)}>
                      Supprimer
                    </button>
                  </TableActionGroup>
                </td>
              </tr>
            ))}
        </Table>
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
