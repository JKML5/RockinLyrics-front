import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import FormButton from '../../components/shared/FormButton';

const StyledContainer = styled.div`
  margin: 50px 50px 0 50px;
  max-width: 1024px;
  margin: 0 auto;
`;

const StyledTitle = styled.h1`
  margin-top: 60px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  font-size: 30px;
  text-align: center;
`;

// TODO JK Doublon
const StyledGroup = styled.div`
  margin-bottom: 30px;

  &.alignright {
    text-align: right;
  }
`;

function Concert() {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    // Récupération des titres existants
    fetch(`${import.meta.env.VITE_API_URL}/concert`)
      .then((response) => response.json())
      .then((data) => {
        setConcerts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <StyledContainer>
      <StyledTitle>Concerts</StyledTitle>

      {concerts.map((concert) => (
        <p key={concert._id}>
          <Link to={`./edit/${concert._id}`}>{concert.name}</Link>
        </p>
      ))}

      <StyledGroup className="alignright">
        <Link to="./add">
          <FormButton type="button">Ajouter</FormButton>
        </Link>
      </StyledGroup>
    </StyledContainer>
  );
}

export default Concert;
