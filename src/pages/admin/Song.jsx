import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FormButton from '../../components/shared/FormButton';

const Section = styled.section`
  background-color: ${({ theme }) =>
    theme === 'light' ? '#ffffff' : '#000000'};
  border-radius: 20px;
  padding: 0 20px;

  @media screen and (min-width: 992px) {
    max-width: 1024px;
    margin: 0 auto;
    padding: 0;
  }
`;

const SongTitle = styled.a`
  padding: 15px 0 0 0;
  font-size: 20px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  color: ${({ theme }) => (theme === 'light' ? '#505050' : '#cccccc')};
  display: block;
`;

/* Form */

const StyledGroup = styled.div`
  margin-bottom: 30px;

  &.alignright {
    text-align: right;
  }
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
`;

const StyledLabel = styled.label`
  width: 100%;
  margin-bottom: 5px;
  display: inline-block;
`;

const StyledInputText = styled.input`
  width: 100%;
  height: 35px;
`;

const StyledValidationMessage = styled.p`
  background-color: 'green';
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

function Song() {
  const theme = useSelector((state) => state.theme);

  const [songsBackend, setSongsBackend] = useState([]);

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Récupération des titres existants
    fetch(`${import.meta.env.VITE_API_URL}/song`)
      .then((response) => response.json())
      .then((data) => {
        setSongsBackend(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Validation formulaire ajout chanson
  function handleSubmit(event) {
    event.preventDefault();

    const requestData = {
      title,
      artist,
    };

    fetch(`${import.meta.env.VITE_API_URL}/song`, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then(() => {
        setValidationMessage('Chanson ajoutée avec succès !');
        setErrorMessage('');
        setTitle('');
        setArtist('');
      })
      .catch((error) => {
        if (error.code === 11000) {
          setErrorMessage(
            'Email déjà utilisé. Veuillez choisir un autre email.',
          );
        } else {
          console.error(error);

          setValidationMessage('');
          setErrorMessage('Erreur');
        }
        setValidationMessage('');
      });
  }

  function handleSongMoveUp(songId) {
    fetch(`${import.meta.env.VITE_API_URL}/song/move-up/${songId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to move song up');
        }
        // Rafraîchir la liste des chansons après la montée
        return fetch(`${import.meta.env.VITE_API_URL}/song`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch songs');
        }
        return response.json();
      })
      .then((data) => {
        setSongsBackend(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function handleSongMoveDown(songId) {
    fetch(`${import.meta.env.VITE_API_URL}/song/move-down/${songId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to move song down');
        }
        // Rafraîchir la liste des chansons après la descente
        return fetch(`${import.meta.env.VITE_API_URL}/song`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch songs');
        }
        return response.json();
      })
      .then((data) => {
        setSongsBackend(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function handleTutoDelete(songId, tutorialId) {
    fetch(`${import.meta.env.VITE_API_URL}/song/${songId}/${tutorialId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to delete tuto');
        }
        // Rafraîchir la liste des chansons après la suppression
        return fetch(`${import.meta.env.VITE_API_URL}/song`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch songs');
        }
        return response.json();
      })
      .then((data) => {
        setSongsBackend(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function handleTutoMoveUp(songId, tutorialId) {
    fetch(
      `${import.meta.env.VITE_API_URL}/song/${songId}/move-up/${tutorialId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then(() => {
        // Mise à jour de l'état des chansons après avoir déplacé le tutoriel vers le bas.
        fetch(`${import.meta.env.VITE_API_URL}/song`)
          .then((response) => response.json())
          .then((data) => {
            setSongsBackend(data);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleTutoMoveDown(songId, tutorialId) {
    fetch(
      `${import.meta.env.VITE_API_URL}/song/${songId}/move-down/${tutorialId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then(() => {
        // Mise à jour de l'état des chansons après avoir déplacé le tutoriel vers le bas.
        fetch(`${import.meta.env.VITE_API_URL}/song`)
          .then((response) => response.json())
          .then((data) => {
            setSongsBackend(data);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Section theme={theme}>
        <ul>
          {songsBackend.map((song) => (
            <li key={song._id}>
              <SongTitle theme={theme}>
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
              </SongTitle>

              {Array.isArray(song.tutorials) && song.tutorials.length > 0 && (
                <div>
                  {song.tutorials.map((tutorial) => (
                    <p>
                      {tutorial._id} - {tutorial.title} -{' '}
                      <Link to={`/admin/song/${song._id}/${tutorial._id}/edit`}>
                        Editer
                      </Link>
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
                      </button>
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

      <Section theme={theme}>
        <StyledTitle>Ajouter un titre</StyledTitle>
        <form onSubmit={handleSubmit}>
          <StyledGroup>
            <StyledLabel htmlFor="title">Titre</StyledLabel>
            <StyledInputText
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </StyledGroup>
          <StyledGroup>
            <StyledLabel htmlFor="artist">Artiste</StyledLabel>
            <StyledInputText
              type="text"
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </StyledGroup>

          {/* Message de validation */}
          {validationMessage && (
            <StyledValidationMessage>
              {validationMessage}
            </StyledValidationMessage>
          )}

          {/* Message d'erreur */}
          {errorMessage && (
            <StyledValidationMessage>{errorMessage}</StyledValidationMessage>
          )}

          <StyledGroup className="alignright">
            <FormButton type="submit">Ajouter</FormButton>
          </StyledGroup>
        </form>
      </Section>
    </>
  );
}

export default Song;
