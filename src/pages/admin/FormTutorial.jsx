/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

const StyledCheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const StyledCheckbox = styled.input`
  margin-right: 5px;
`;

const StyledValidationMessage = styled.p`
  background-color: #b4eab4;
  color: black;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 40px;
`;

function FormTutorial() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [googleId, setGoogleId] = useState('');
  const [type, setType] = useState('audio');
  const [lyrics, setLyrics] = useState('');
  const [formError, setFormError] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState('');

  const { songId, tutorialId } = useParams();

  // Récupération des infos sur le tuto
  const songs = useSelector((state) => state.songs);
  const song = songs.find((data) => data.id.toString() === songId);
  const tutorial = song?.tutorials.find(
    (data) => data._id.toString() === tutorialId,
  );

  useEffect(() => {
    if (tutorial && !isEditing) {
      setIsEditing(true);
      setTitle(tutorial.title);
      setGoogleId(tutorial.googleId);
      setType(tutorial.type);
      setLyrics(tutorial.lyrics);
      setCategories(tutorial.categories || []);
      setGender(tutorial.gender || '');
    }
  }, [tutorial, isEditing]);

  function handleSubmit(event) {
    event.preventDefault();

    const requestData = {
      type,
      title,
      googleId,
      lyrics,
      categories,
    };

    if (gender !== '') {
      requestData.gender = gender;
    }

    const url = isEditing
      ? `http://${import.meta.env.VITE_API_URL}/song/${songId}/${tutorialId}`
      : `http://${import.meta.env.VITE_API_URL}/song/${songId}`;

    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method,
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
          // Message de validation et réinitialisation des champs
          setValidationMessage('Tutoriel ajouté/modifié avec succès');
          setTitle('');
          setGoogleId('');
          setLyrics('');
          setCategories([]);
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
      {!song ? (
        <p>Chargement en cours...</p>
      ) : (
        <StyledContainer>
          {validationMessage && (
            <StyledValidationMessage>
              {validationMessage}
            </StyledValidationMessage>
          )}

          <StyledTitle>Ajouter un tuto pour : {song.title}</StyledTitle>
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

            <StyledGroup>
              <StyledLabel>Catégories</StyledLabel>
              <StyledCheckboxGroup>
                <StyledCheckboxLabel>
                  <StyledCheckbox
                    type="checkbox"
                    value="LEAD"
                    checked={categories.includes('LEAD')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategories([...categories, 'LEAD']);
                      } else {
                        setCategories(
                          categories.filter((cat) => cat !== 'LEAD'),
                        );
                      }
                    }}
                  />
                  LEAD
                </StyledCheckboxLabel>
                <StyledCheckboxLabel>
                  <StyledCheckbox
                    type="checkbox"
                    value="BV1"
                    checked={categories.includes('BV1')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategories([...categories, 'BV1']);
                      } else {
                        setCategories(
                          categories.filter((cat) => cat !== 'BV1'),
                        );
                      }
                    }}
                  />
                  BV1
                </StyledCheckboxLabel>
                <StyledCheckboxLabel>
                  <StyledCheckbox
                    type="checkbox"
                    value="BV2"
                    checked={categories.includes('BV2')}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategories([...categories, 'BV2']);
                      } else {
                        setCategories(
                          categories.filter((cat) => cat !== 'BV2'),
                        );
                      }
                    }}
                  />
                  BV2
                </StyledCheckboxLabel>
              </StyledCheckboxGroup>
            </StyledGroup>

            <StyledGroup>
              <StyledLabel>Genre</StyledLabel>
              <StyledSelect
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" />
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </StyledSelect>
            </StyledGroup>

            {formError === '' && <p className="error">{formError}</p>}
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
