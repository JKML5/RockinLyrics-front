import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import FormButton from '../../common/admin/FormButton';
import Title1 from '../../common/Title1';

const StyledContainer = styled.div`
  margin: 50px 50px 0 50px;
  max-width: 1024px;
  margin: 0 auto;
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
      <Title1 isAdmin={true}>Concerts</Title1>

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
