import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Tutorial from '../../components/Tutorial';
import FormButton from '../../components/shared/FormButton';

const Section = styled.section`
  background-color: ${({ theme }) =>
    theme === 'light' ? '#ffffff' : '#000000'};
  border-radius: 20px;
  padding: 0 20px;

  @media screen and (min-width: 992px) {
    max-width: 1024px;
    margin: 0 auto;
  }
`;

const Item = styled.div`
  border-top: ${({ theme }) =>
    theme === 'light' ? '1px solid #dddddd' : '1px solid #222222'};

  &:first-child {
    border-top: none;
  }
`;

const SongTitle = styled.a`
  width: 100%;
  padding: 15px 0;
  border: none;
  outline: none;
  text-align: left;
  font-size: 20px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  color: ${({ theme }) => (theme === 'light' ? '#505050' : '#cccccc')};
  cursor: pointer;
  text-decoration: none;
  display: block;
`;

const AccordionContent = styled.div`
  max-height: ${(props) => (props.open ? '100%' : '0')};
  overflow: hidden;
`;

/* Form */

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

function Song() {
  const theme = useSelector((state) => state.theme);

  const [songsBackend, setSongsBackend] = useState([]);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleAccordion = (index) => {
    setActiveAccordionIndex(activeAccordionIndex === index ? null : index);
  };

  useEffect(() => {
    // Récupération des titres existants
    fetch(`http://localhost:3000/api/songs`)
      .then((response) => response.json())
      .then((data) => {
        setSongsBackend(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Validation formulaire ajout chanson
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
          // console.log(requestData);
          setValidationMessage('');
          setErrorMessage('Erreur');
        }
        setValidationMessage('');
      });
  }

  return (
    <>
      <Section theme={theme}>
        <ul>
          {songsBackend.map((song) => (
            <Item theme={theme} key={song._id}>
              <SongTitle
                theme={theme}
                onClick={() => toggleAccordion(song._id)}
              >
                {song.title} - {song.artist}
              </SongTitle>
              {Array.isArray(song.tutorials) && song.tutorials.length > 0 && (
                <AccordionContent open={activeAccordionIndex === song._id}>
                  {song.tutorials.map((tutorial) => (
                    <Tutorial
                      key={tutorial.googleId}
                      data={tutorial}
                      songId={song._id}
                    />
                  ))}
                </AccordionContent>
              )}
              <Link to={`/admin/song/${song._id}/add`}>Ajouter un tuto</Link>
            </Item>
          ))}
        </ul>
      </Section>

      <Section theme={theme}>
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

          {/* Message de validation */}
          {validationMessage && (
            <StyledValidationMessage>
              {validationMessage}
            </StyledValidationMessage>
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
    </>
  );
}

export default Song;
