import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import FormButton from '../../common/FormButton';
import Title1 from '../../common/Title1';

// TODO JK Doublons
const StyledContainer = styled.div`
  margin: 50px 50px 0 50px;
  max-width: 1024px;
  margin: 0 auto;
`;

const StyledGroup = styled.div`
  margin-bottom: 30px;

  &.alignright {
    text-align: right;
  }
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
  background-color: #b4eab4;
  color: black;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 40px;
`;

function ConcertForm() {
  const navigate = useNavigate();
  const { concertId } = useParams();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [date, setDate] = useState('');

  const [formError, setFormError] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  // Récupération des détails du concert si existant
  useEffect(() => {
    if (concertId) {
      fetch(`${import.meta.env.VITE_API_URL}/concert/${concertId}`)
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
          setSlug(data.slug);
          setDate(data.date ? data.date.slice(0, 10) : ''); // Formatage de la date si nécessaire
        })
        .catch((error) => console.error('Error fetching concert:', error));
    }
  }, [concertId]);

  // Clic sur Valider
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = { name, slug };

    if (date) {
      requestData.date = date;
    }

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
          setFormError("Erreur lors de l'ajout du concert");
        }
      }
    } catch (error) {
      console.error('Error adding/editing concert:', error);
      setFormError(error.message);
    }
  };

  const pageTitle = concertId ? 'Editer un concert' : 'Ajouter un concert';

  return (
    <StyledContainer>
      {validationMessage && (
        <StyledValidationMessage>{validationMessage}</StyledValidationMessage>
      )}

      <Title1 isAdmin={true}>{pageTitle}</Title1>

      <form onSubmit={handleSubmit}>
        <StyledGroup>
          <StyledLabel htmlFor="title">Nom</StyledLabel>
          <StyledInputText
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </StyledGroup>

        <StyledGroup>
          <StyledLabel htmlFor="title">Slug</StyledLabel>
          <StyledInputText
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </StyledGroup>

        {formError === '' && <p className="error">{formError}</p>}
        <StyledGroup className="alignright">
          <FormButton type="submit">
            {concertId ? 'Editer' : 'Ajouter'}
          </FormButton>
        </StyledGroup>
      </form>
    </StyledContainer>
  );
}

export default ConcertForm;
