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

const SongForm = () => {
  const navigate = useNavigate();
  const { songId } = useParams();
  const isEditMode = Boolean(songId);

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');

  const [validationMessage, setValidationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Chargement si édition
  useEffect(() => {
    if (!isEditMode) return;

    fetch(`${import.meta.env.VITE_API_URL}/song/${songId}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || '');
        setArtist(data.artist || '');
        setCategories(data.categories || []);
      })
      .catch(() => setErrorMessage('Erreur lors du chargement'));
  }, [songId]);

  // Submit (POST ou PUT)
  function handleSubmit(e) {
    e.preventDefault();

    const requestData = { title, artist, categories };

    const url = isEditMode
      ? `${import.meta.env.VITE_API_URL}/song/${songId}`
      : `${import.meta.env.VITE_API_URL}/song`;

    const method = isEditMode ? 'PUT' : 'POST';

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
      .then(() => {
        setValidationMessage(
          isEditMode
            ? 'Chanson modifiée avec succès !'
            : 'Chanson ajoutée avec succès !',
        );
        navigate(`/admin/song`);
      })
      .catch((error) => {
        console.error(error);
        setValidationMessage('');
        setErrorMessage("Erreur lors de l'enregistrement");
      });
  }

  // Ajout d’une catégorie
  const handleAddCategory = () => {
    const trimmed = categoryInput.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
    }
    setCategoryInput('');
  };

  // Suppression d’une catégorie
  const handleRemoveCategory = (cat) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  // Entrée = ajouter la catégorie
  const handleCategoryKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCategory();
    }
  };

  return (
    <Container>
      {validationMessage && (
        <StyledValidationMessage message={validationMessage} />
      )}

      {errorMessage && <StyledErrorMessage message={errorMessage} />}

      <Title1 isadmin={true}>
        {isEditMode ? 'Modifier un titre' : 'Ajouter un titre'}
      </Title1>

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

        <FormGroup>
          <Label>Catégories de voix</Label>
          <div>
            {categories.map((cat) => (
              <span
                key={cat}
                style={{
                  marginRight: '8px',
                  padding: '4px 8px',
                  background: '#eee',
                  borderRadius: '4px',
                }}
              >
                {cat}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(cat)}
                  style={{ marginLeft: '4px' }}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <InputText
            type="text"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            onKeyDown={handleCategoryKeyDown}
            placeholder="Ajouter une catégorie (Entrée)"
          />
          <button type="button" onClick={handleAddCategory}>
            Ajouter
          </button>
        </FormGroup>

        <FormGroup className="alignright">
          <FormButton type="submit">
            {isEditMode ? 'Mettre à jour' : 'Ajouter'}
          </FormButton>
        </FormGroup>
      </form>
    </Container>
  );
};

export default SongForm;
