import { useState } from 'react';
import styled from 'styled-components';
import FormButton from '../components/shared/FormButton';

const StyledContainer = styled.div`
  margin: 50px 50px 0 50px;
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

function SongForm() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [formError, setFormError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const requestData = {
      title,
      artist,
    };

    fetch('http://localhost:3000/api/songs', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            setFormError(error.message);
            throw new Error(error.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        // Connect the user
        if (data.status === 200) {
          console.log(requestData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <StyledContainer>
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
        {formError !== '' && <p className="error">{formError}</p>}
        <StyledGroup className="alignright">
          <FormButton type="submit">Ajouter</FormButton>
        </StyledGroup>
      </form>
    </StyledContainer>
  );
}

export default SongForm;
