import { useState } from 'react';
import styled from 'styled-components';
import Title1 from '../common/Title1';
import FormButton from '../common/FormButton';

const Section = styled.section`
  background-color: '#ffffff';
  border-radius: 20px;
  padding: 0 20px;

  @media screen and (min-width: 992px) {
    max-width: 1024px;
    margin: 0 auto;
    padding: 0;
  }
`;

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

const AdminSongForm = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  return (
    <Section>
      <Title1>Ajouter un titre</Title1>
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
          <StyledValidationMessage>{validationMessage}</StyledValidationMessage>
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
  );
};

export default AdminSongForm;
