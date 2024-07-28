import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import FormButton from '../../common/FormButton';
import Editor from '../../sections/SlideEditor';

const StyledContainer = styled.div`
  margin: 50px 50px 0 50px;
`;

const StyledGroup = styled.div`
  margin-bottom: 30px;

  &.alignright {
    text-align: right;
  }

  .info {
    color: #aaaaaa;
  }

  .disabled {
    color: #dddddd;
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
  const [type, setType] = useState('audio');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [formError, setFormError] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState('');
  const { songId, tutorialId } = useParams();
  const navigate = useNavigate();

  const fetchTutorialData = async () => {
    try {
      if (songId && tutorialId) {
        setIsEditing(true);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/song/${songId}`,
        );

        if (response.ok) {
          const song = await response.json();

          if (song && song.tutorials) {
            const tutorial = song.tutorials.find(
              (data) => data._id.toString() === tutorialId.toString(),
            );

            if (tutorial) {
              setType(tutorial.type);
              setTitle(tutorial.title);
              setUrl(tutorial.url);
              setLyrics(tutorial.lyrics);
              setCategories(tutorial.categories || []);
              setGender(tutorial.gender || '');
            }
          } else {
            throw new Error('Failed to fetch tutorials');
          }
        } else {
          throw new Error('Failed to fetch tutorial data');
        }
      }
    } catch (error) {
      setFormError(error.message);
      console.error(error);
    }
  };

  // Récupération des infos sur le tuto
  useEffect(() => {
    if (tutorialId) {
      fetchTutorialData();
    }
  }, [tutorialId]);

  function handleSubmit(event) {
    event.preventDefault();

    const requestData = {
      type,
      title,
      url,
      lyrics,
      categories,
      gender,
    };

    if (lyrics) {
      // Remplace <p></p> par <br>
      requestData.lyrics = lyrics.replace(/<p>(.*?)<\/p>/g, '$1<br>');

      requestData.lyrics = lyrics.replace(
        /<p>(.*?)<\/p>|(\n)/g,
        (match, pTagContent) => {
          if (pTagContent) {
            return `${pTagContent}<br>`;
          }
          return '<br>';
        },
      );
    }

    const audioUrl = isEditing
      ? `${import.meta.env.VITE_API_URL}/song/${songId}/${tutorialId}`
      : `${import.meta.env.VITE_API_URL}/song/${songId}`;

    const method = isEditing ? 'PUT' : 'POST';

    fetch(audioUrl, {
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
        if (!isEditing && data.status === 201) {
          navigate('/admin/song');
        } else if (isEditing && data.status === 20) {
          setValidationMessage('Tutoriel modifié avec succès');
          fetchTutorialData();
        } else {
          throw new Error('Problème avec le formulaire');
        }
      })
      .catch((error) => {
        setFormError(error.message);
        console.error(error);
      });
  }

  const pageTitle = isEditing ? 'Editer un tuto' : 'Ajouter un tuto';

  return (
    <StyledContainer>
      {validationMessage && (
        <StyledValidationMessage>{validationMessage}</StyledValidationMessage>
      )}

      <StyledTitle>{pageTitle}</StyledTitle>
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
          <StyledLabel htmlFor="url">URL</StyledLabel>
          <StyledInputText
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </StyledGroup>

        {type === 'lyrics' && (
          <StyledGroup>
            <StyledLabel htmlFor="lyrics">Paroles</StyledLabel>
            <Editor contentValue={lyrics} handleChange={setLyrics} />{' '}
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
                    setCategories(categories.filter((cat) => cat !== 'LEAD'));
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
                    setCategories(categories.filter((cat) => cat !== 'BV1'));
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
                    setCategories(categories.filter((cat) => cat !== 'BV2'));
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
  );
}

export default FormTutorial;
