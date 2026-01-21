import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Title1 from '../../common/Title1';
import Container from '../../common/admin/Container';
import FormGroup from '../../common/admin/FromGroup';
import FormButton from '../../common/admin/FormButton';
import Label from '../../common/admin/Label';
import InputText from '../../common/admin/InputText';
import Table from '../../common/admin/Table';
import TableActionGroup from '../../common/admin/TableActionGroup';

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
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [tutorials, setTutorials] = useState([]);

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
        setTags(data.tags || []);
        setTutorials(data.tutorials || []);
      })
      .catch(() => setErrorMessage('Erreur lors du chargement'));
  }, [songId]);

  // Submit (POST ou PUT)
  function handleSubmit(e) {
    e.preventDefault();

    const requestData = { title, artist, categories, tags, tutorials };

    const url = isEditMode
      ? `${import.meta.env.VITE_API_URL}/song/${songId}`
      : `${import.meta.env.VITE_API_URL}/song`;

    const method = isEditMode ? 'PUT' : 'POST';

    fetch(url, {
      method,
      body: JSON.stringify(requestData),
      headers: { 'Content-Type': 'application/json' },
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
        setValidationMessage(
          isEditMode
            ? 'Chanson modifiée avec succès !'
            : 'Chanson ajoutée avec succès !',
        );

        if (!isEditMode && data?._id) {
          navigate(`/admin/song/edit/${data._id}`, { replace: true });
        }
      })
      .catch(() => {
        setValidationMessage('');
        setErrorMessage("Erreur lors de l'enregistrement");
      });
  }

  // === Fonctions catégories ===
  const handleAddCategory = () => {
    const trimmed = categoryInput.trim();
    if (trimmed && !categories.includes(trimmed))
      setCategories([...categories, trimmed]);
    setCategoryInput('');
  };

  const handleRemoveCategory = (cat) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  const handleCategoryKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCategory();
    }
  };

  // === Fonctions tags ===
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) setTags([...tags, trimmed]);
    setTagInput('');
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  // === Fonctions tutoriels ===
  const moveTutoUp = (index) => {
    if (index === 0) return;

    const updated = [...tutorials];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setTutorials(updated);
  };

  const moveTutoDown = (index) => {
    if (index === tutorials.length - 1) return;

    const updated = [...tutorials];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setTutorials(updated);
  };

  const handleRemoveTuto = (id) => {
    setTutorials(tutorials.filter((t) => t._id !== id));
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

        {/* Catégories */}
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

        {/* Tags */}
        <FormGroup>
          <Label>Tags</Label>
          <div>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  marginRight: '8px',
                  padding: '4px 8px',
                  background: '#eee',
                  borderRadius: '4px',
                }}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  style={{ marginLeft: '4px' }}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <InputText
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Ajouter un tag (Entrée)"
          />
          <button type="button" onClick={handleAddTag}>
            Ajouter
          </button>
        </FormGroup>

        {/* Tutoriels */}
        <FormGroup>
          <Label>Tutoriels</Label>

          {tutorials.length === 0 && <div>Aucun tutoriel</div>}

          <Table>
            <tbody>
              {tutorials.map((t, index) => (
                <tr key={t._id}>
                  <td>{t.title}</td>
                  <td>
                    {t.categories?.length ? t.categories.join(', ') : '—'}
                  </td>
                  <td>{t.gender || 'ALL'}</td>
                  <td>
                    <TableActionGroup>
                      <button
                        type="button"
                        onClick={() => moveTutoUp(index)}
                        disabled={index === 0}
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        onClick={() => moveTutoDown(index)}
                        disabled={index === tutorials.length - 1}
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/admin/song/${songId}/${t._id}/edit`)
                        }
                      >
                        Éditer
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Confirmer la suppression ?'))
                            handleRemoveTuto(t._id);
                        }}
                      >
                        Supprimer
                      </button>
                    </TableActionGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <br />

          <button
            type="button"
            onClick={() => navigate(`/admin/song/${songId}/add`)}
          >
            Ajouter un tutoriel
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
