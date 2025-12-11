import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Title1 from '../../common/Title1';
import Container from '../../common/admin/Container';
import FormGroup from '../../common/admin/FromGroup';
import FormButton from '../../common/admin/FormButton';
import Label from '../../common/admin/Label';
import InputText from '../../common/admin/InputText';

import StyledValidationMessage from '../../common/ValidationMessage';
import StyledErrorMessage from '../../common/ErrorMessage';

function ConcertForm() {
  const navigate = useNavigate();
  const { concertId } = useParams();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [songs, setSongs] = useState([]); // chansons du concert
  const [allSongs, setAllSongs] = useState([]); // toutes les chansons
  const [selectedSong, setSelectedSong] = useState(''); // chanson à ajouter

  const [validationMessage, setValidationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const availableSongs = allSongs.filter(
    (s) => !songs.some((assigned) => assigned._id === s._id),
  );

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
      setErrorMessage('Error fetching song details');
    }
  };

  const fetchAllSongs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/song`);
      const data = await response.json();
      setAllSongs(data);
    } catch (error) {
      console.error('Error fetching all songs:', error);
      setErrorMessage('Error fetching all songs');
    }
  };

  const fetchConcertData = async () => {
    try {
      if (concertId) {
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
      setErrorMessage(error.message);
      console.error(error);
    }
  };

  // Récupération des infos sur le concertId
  useEffect(() => {
    if (concertId) {
      fetchConcertData();
    }
    fetchAllSongs();
  }, [concertId]);

  // Ajouter une chanson au concert
  const handleAddSong = () => {
    if (!selectedSong) return;

    const songToAdd = allSongs.find((s) => s._id === selectedSong);

    if (songToAdd) {
      setSongs([...songs, songToAdd]);
      setSelectedSong('');
    }
  };

  // Retirer une chanson du concert
  const removeSong = (songId) => {
    setSongs(songs.filter((song) => song._id !== songId));
  };

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

    const requestData = {
      name,
      slug,
      songs: songs.map((song) => song._id),
    };

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
          setErrorMessage("Erreur lors de l'ajout du concert");
        }
      }
    } catch (error) {
      console.error('Error adding/editing concert:', error);
      setErrorMessage(error.message);
    }
  };

  const pageTitle = concertId ? 'Editer un concert' : 'Ajouter un concert';

  return (
    <Container>
      {validationMessage && (
        <StyledValidationMessage message={validationMessage} />
      )}

      {errorMessage && <StyledErrorMessage message={errorMessage} />}

      <Title1 isadmin={true}>{pageTitle}</Title1>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Nom</Label>
          <InputText
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="title">Slug</Label>
          <InputText
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Chansons</Label>
          {songs.map((song, index) => (
            <div key={song._id}>
              <span>
                {song.title} - {song.artist}
              </span>
              <button type="button" onClick={() => moveSongUp(index)}>
                Monter
              </button>
              <button type="button" onClick={() => moveSongDown(index)}>
                Descendre
              </button>
              <button type="button" onClick={() => removeSong(song._id)}>
                Supprimer
              </button>
            </div>
          ))}
        </FormGroup>

        <FormGroup>
          <Label>Ajouter une chanson</Label>
          <select
            value={selectedSong}
            onChange={(e) => setSelectedSong(e.target.value)}
          >
            <option value="">Choisir une chanson</option>
            {availableSongs.map((song) => (
              <option key={song._id} value={song._id}>
                {song.title} - {song.artist}
              </option>
            ))}
          </select>

          <button type="button" onClick={handleAddSong}>
            Ajouter
          </button>
        </FormGroup>

        <FormGroup className="alignright">
          <FormButton type="submit">
            {concertId ? 'Editer' : 'Ajouter'}
          </FormButton>
        </FormGroup>
      </form>
    </Container>
  );
}

export default ConcertForm;
