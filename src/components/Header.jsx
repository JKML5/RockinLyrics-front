import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import logo from '../assets/logo.png';
import logoFestirock from '../assets/logo-festirock.svg';
import Menu from './Menu';

const StyledHeader = styled.header`
  width: 100%;
  background-color: ${({ theme }) =>
    theme === 'light' ? '#ffffff' : '#000000;'};
  margin-bottom: 20px;
  text-align: center;
  border-bottom: ${({ theme }) =>
    theme === 'dark' ? 'none' : '1px solid #000000;'};
  box-shadow: ${({ theme }) =>
    theme === 'dark' ? '0 0 5px 5px #000000' : 'none'};
  position: fixed;
  top: 0;
`;

const StyledLink = styled(Link)`
  display: block;
  height: 80px;
  padding: 20px 0;
`;

const LogoImg = styled.img`
  margin-left: auto;
  width: auto;
  height: 100%;
  filter: ${({ theme, name }) =>
    theme === 'dark' && name === 'all' ? 'invert(1)' : 'none'};
`;

function Header() {
  const theme = useSelector((state) => state.theme);

  return (
    <StyledHeader theme={theme}>
      <StyledLink to="/">
        <LogoImg theme={theme} src={logoFestirock} alt="Logo Rockin'Lyrics" />
      </StyledLink>
      <Menu />
    </StyledHeader>
  );
}

export default Header;
