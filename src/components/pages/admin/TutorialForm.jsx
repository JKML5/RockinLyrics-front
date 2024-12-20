import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Title1 from '../../common/Title1';
import Container from '../../common/admin/Container';
import FormGroup from '../../common/admin/FromGroup';
import FormButton from '../../common/admin/FormButton';
import Label from '../../common/admin/Label';
import InputText from '../../common/admin/InputText';
import Select from '../../common/admin/Select';
import CheckboxGroup from '../../common/admin/CheckboxGroup';
import CheckboxLabel from '../../common/admin/CheckboxLabel';
import Checkbox from '../../common/admin/Checkbox';
import Editor from '../../sections/SlideEditor';
import StyledValidationMessage from '../../common/ValidationMessage';
import StyledErrorMessage from '../../common/ErrorMessage';

function TutorialForm() {
  const navigate = useNavigate();
  const { songId, tutorialId } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const [type, setType] = useState('audio');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState('');

  const [validationMessage, setValidationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      setErrorMessage(error.message);
      console.error(error);
    }
  };

  // Récupération des infos sur le tuto
  useEffect(() => {
    if (tutorialId) {
      fetchTutorialData();
    }
  }, [tutorialId]);

  // Clic sur Valider
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      type,
      title,
      url,
      lyrics: lyrics ? lyrics.replace(/<p>(.*?)<\/p>/g, '$1<br>') : '',
      categories,
      gender,
    };

    const mediaUrl = isEditing
      ? `${import.meta.env.VITE_API_URL}/song/${songId}/${tutorialId}`
      : `${import.meta.env.VITE_API_URL}/song/${songId}`;

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(mediaUrl, {
        method,
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse JSON si possible pour obtenir un message d'erreur
        throw new Error(errorData.message || 'Error submitting form');
      }

      const data = await response.json();

      if (!isEditing && data.status === 201) {
        navigate('/admin/song');
      } else if (isEditing) {
        setValidationMessage('Tutoriel modifié avec succès');
        fetchTutorialData();
      } else {
        throw new Error('Problème avec le formulaire');
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error);
    }
  };

  const pageTitle = isEditing ? 'Editer un tuto' : 'Ajouter un tuto';

  return (
    <Container>
      {validationMessage && (
        <StyledValidationMessage message={validationMessage} />
      )}

      {errorMessage && <StyledErrorMessage message={errorMessage} />}

      <Title1 isAdmin={true}>{pageTitle}</Title1>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="type">Type</Label>
          <Select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="audio">Audio</option>
            <option value="video">Vidéo</option>
            <option value="lyrics">Texte (paroles)</option>
          </Select>
        </FormGroup>

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
          <Label htmlFor="url">URL</Label>
          <InputText
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </FormGroup>

        {type === 'lyrics' && (
          <FormGroup>
            <Label htmlFor="lyrics">Paroles</Label>
            <Editor contentValue={lyrics} handleChange={setLyrics} />
          </FormGroup>
        )}

        <FormGroup>
          <Label>Catégories</Label>
          <CheckboxGroup>
            <CheckboxLabel>
              <Checkbox
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
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox
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
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox
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
            </CheckboxLabel>
          </CheckboxGroup>
        </FormGroup>

        <FormGroup>
          <Label>Genre</Label>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="" />
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </Select>
        </FormGroup>

        <FormGroup className="alignright">
          <FormButton type="submit">
            {isEditing ? 'Editer' : 'Ajouter'}
          </FormButton>
        </FormGroup>
      </form>
    </Container>
  );
}

export default TutorialForm;
