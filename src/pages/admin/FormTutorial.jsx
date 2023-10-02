import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import FormButton from '../../components/shared/FormButton';

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

const StyledSelect = styled.select`
  width: 100%;
  height: 35px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100px;
`;

const StyledValidationMessage = styled.p`
  background-color: #b4eab4;
  color: black;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 40px;
`;

function FormTutorial() {
  const [songsBackend, setSongsBackend] = useState();
  const [title, setTitle] = useState('');
  const [googleId, setGoogleId] = useState('');
  const [type, setType] = useState('audio');
  const [lyrics, setLyrics] = useState('');
  const [formError, setFormError] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const { id } = useParams();

  useEffect(() => {
    console.log(id);

    // Chargement des paroles de chansons
    fetch(`http://localhost:3000/api/songs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSongsBackend(data);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const requestData = {
      type,
      title,
      googleId,
      lyrics,
    };

    fetch(`http://localhost:3000/api/songs/${id}`, {
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
      .then((data) => {
        if (data.status === 201) {
          setValidationMessage('Tutoriel ajouté avec succes');
          setTitle('');
          setGoogleId('');
        } else {
          throw new Error('Problème avec le formulaire');
        }
      })
      .catch((error) => {
        setFormError(error.message);
        console.error(error);
      });
  }

  return (
    <div>
      {!songsBackend ? (
        <p>Chargement en cours...</p>
      ) : (
        <StyledContainer>
          {validationMessage && (
            <StyledValidationMessage>
              {validationMessage}
            </StyledValidationMessage>
          )}

          <StyledTitle>Ajouter un tuto pour : {songsBackend.title}</StyledTitle>
          <form onSubmit={handleSubmit}>
            <StyledGroup>
              <StyledLabel htmlFor="type">Type</StyledLabel>
              <StyledSelect
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="audio">Audio</option>
                <option value="video">Vidéo</option>
                <option value="lyrics">Texte (paroles)</option>
              </StyledSelect>
            </StyledGroup>

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
              <StyledLabel htmlFor="googleId">Google Id / URL</StyledLabel>
              <StyledInputText
                type="text"
                id="googleId"
                value={googleId}
                onChange={(e) => setGoogleId(e.target.value)}
              />
            </StyledGroup>

            {type === 'lyrics' && (
              <StyledGroup>
                <StyledLabel htmlFor="lyrics">Paroles</StyledLabel>
                <StyledTextarea
                  id="lyrics"
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                />
              </StyledGroup>
            )}

            {formError !== '' && <p className="error">{formError}</p>}
            <StyledGroup className="alignright">
              <FormButton type="submit">Ajouter</FormButton>
            </StyledGroup>
          </form>
        </StyledContainer>
      )}
    </div>
  );
}

export default FormTutorial;
