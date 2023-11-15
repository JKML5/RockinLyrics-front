import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Menu from './Menu';

const StyledHeader = styled.header`
  width: 100%;
  background-color: ${({ theme }) =>
    theme === 'light' ? '#ffffff' : '#000000'};
  margin-bottom: 20px;
  text-align: center;
  box-shadow: ${({ theme }) =>
    theme === 'dark' ? '0 0 5px 5px #000000' : 'none'};
  position: fixed;
  top: 0;
`;

const StyledTitle = styled.h1`
  margin-top: 60px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  font-size: 30px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  display: block;
  height: 80px;
  padding: 20px 0;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  text-decoration: none;
`;

function Header() {
  const theme = useSelector((state) => state.theme);

  return (
    <>
      <StyledHeader theme={theme}>
        <Menu />
      </StyledHeader>
      <StyledTitle>
        <StyledLink theme={theme} to="/">
          Festirock 2
        </StyledLink>
      </StyledTitle>
    </>
  );
}

export default Header;
