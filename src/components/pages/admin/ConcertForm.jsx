import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import FormButton from '../../common/FormButton';
import Title1 from '../../common/Title1';

const StyledContainer = styled.div`
  margin: 50px 50px 0 50px;
  max-width: 1024px;
  margin: 0 auto;
`;

const StyledGroup = styled.div`
  margin-bottom: 30px;

  &.alignright {
    text-align: right;
  }
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
  background-color: #b4eab4;
  color: black;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 40px;
`;

function ConcertForm() {
  const navigate = useNavigate();
  const { concertId } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [songs, setSongs] = useState([]);

  const [formError, setFormError] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  // Fonction pour récupérer les détails des chansons
  const fetchSongsDetails = async (songIds) => {
    try {
      const songDetails = await Promise.all(
        songIds.map((songId) =>
          fetch(`${import.meta.env.VITE_API_URL}/song/${songId}`).then((res) =>
            res.json(),
          ),
        ),
      );
      setSongs(songDetails);
    } catch (error) {
      console.error('Error fetching song details:', error);
      setFormError('Error fetching song details');
    }
  };

  const fetchConcertData = async () => {
    try {
      if (concertId) {
        setIsEditing(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/concert/${concertId}`,
        );

        if (response.ok) {
          const concert = await response.json();

          if (concert && concert.songs) {
            setName(concert.name);
            setSlug(concert.slug);
            await fetchSongsDetails(concert.songs); // Fetch des détails des chansons
          } else {
            throw new Error('Failed to fetch concert data');
          }
        } else {
          throw new Error('Failed to fetch concert data');
        }
      }
    } catch (error) {
      setFormError(error.message);
      console.error(error);
    }
  };

  // Récupération des infos sur le concertId
  useEffect(() => {
    if (concertId) {
      fetchConcertData();
    }
  }, [concertId]);

  // Fonction pour déplacer une chanson vers le haut
  const moveSongUp = (index) => {
    if (index === 0) return; // Déjà en haut

    const newSongs = [...songs];
    [newSongs[index - 1], newSongs[index]] = [
      newSongs[index],
      newSongs[index - 1],
    ];
    setSongs(newSongs);
  };

  // Fonction pour déplacer une chanson vers le bas
  const moveSongDown = (index) => {
    if (index === songs.length - 1) return; // Déjà en bas

    const newSongs = [...songs];
    [newSongs[index], newSongs[index + 1]] = [
      newSongs[index + 1],
      newSongs[index],
    ];
    setSongs(newSongs);
  };

  // Clic sur Valider
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = { name, slug, songs: songs.map((song) => song._id) }; // Ajouter l'ordre des chansons mis à jour

    try {
      let response;
      if (concertId) {
        // Éditer le concert existant
        response = await fetch(
          `${import.meta.env.VITE_API_URL}/concert/${concertId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          },
        );

        if (!response.ok) {
          throw new Error('Error editing concert');
        }

        setValidationMessage('Concert modifié avec succès');
      } else {
        // Ajouter un nouveau concert
        response = await fetch(`${import.meta.env.VITE_API_URL}/concert/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error('Error adding concert');
        }

        const data = await response.json();
        setValidationMessage('Concert ajouté avec succès');

        // Rediriger vers la page d'édition du concert ajouté
        if (data.concert._id) {
          navigate(`/admin/concert/edit/${data.concert._id}`);
        } else {
          console.error('Missing _id in response:', data);
          setFormError("Erreur lors de l'ajout du concert");
        }
      }
    } catch (error) {
      console.error('Error adding/editing concert:', error);
      setFormError(error.message);
    }
  };

  const pageTitle = concertId ? 'Editer un concert' : 'Ajouter un concert';

  return (
    <StyledContainer>
      {validationMessage && (
        <StyledValidationMessage>{validationMessage}</StyledValidationMessage>
      )}

      <Title1 isAdmin={true}>{pageTitle}</Title1>

      <form onSubmit={handleSubmit}>
        <StyledGroup>
          <StyledLabel htmlFor="title">Nom</StyledLabel>
          <StyledInputText
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </StyledGroup>

        <StyledGroup>
          <StyledLabel htmlFor="title">Slug</StyledLabel>
          <StyledInputText
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </StyledGroup>

        {/* Affichage des chansons */}
        <StyledGroup>
          <StyledLabel>Chansons</StyledLabel>
          {songs.map((song, index) => (
            <div key={song._id}>
              <span>{song.title}</span>
              <button type="button" onClick={() => moveSongUp(index)}>
                Monter
              </button>
              <button type="button" onClick={() => moveSongDown(index)}>
                Descendre
              </button>
            </div>
          ))}
        </StyledGroup>

        {formError && <p className="error">{formError}</p>}
        <StyledGroup className="alignright">
          <FormButton type="submit">
            {concertId ? 'Editer' : 'Ajouter'}
          </FormButton>
        </StyledGroup>
      </form>
    </StyledContainer>
  );
}

export default ConcertForm;
