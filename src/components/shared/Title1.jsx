import styled from 'styled-components';

const Title1 = styled.h1`
  margin-top: 80px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  font-size: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};

  text-align: center;
`;

export default Title1;
