import styled from 'styled-components';

const Title1 = styled.h1`
  margin: 80px 0 40px 0;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  font-size: 30px;
  color: ${({ theme, isAdmin }) =>
    isAdmin ? theme.colors.adminText : theme.colors.text};

  text-align: center;
`;

export default Title1;
