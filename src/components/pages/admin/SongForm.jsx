import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Title1 from '../../common/Title1';
import Container from '../../common/admin/Container';
import FormGroup from '../../common/admin/FromGroup';
import FormButton from '../../common/admin/FormButton';
import Label from '../../common/admin/Label';
import InputText from '../../common/admin/InputText';

import StyledValidationMessage from '../../common/ValidationMessage';
import StyledErrorMessage from '../../common/ErrorMessage';

const AdminSongForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  const [validationMessage, setValidationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

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

  return (
    <Container>
      {validationMessage && (
        <StyledValidationMessage message={validationMessage} />
      )}

      {errorMessage && <StyledErrorMessage message={errorMessage} />}

      <Title1>Ajouter un titre</Title1>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Titre</Label>
          <InputText
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="artist">Artiste</Label>
          <InputText
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </FormGroup>

        <FormGroup className="alignright">
          <FormButton type="submit">Ajouter</FormButton>
        </FormGroup>
      </form>
    </Container>
  );
};

export default AdminSongForm;
