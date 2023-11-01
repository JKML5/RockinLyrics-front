import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const StyledHeader = styled.header`
  background-color: ${({ theme }) => (theme === 'light' ? 'none' : '#000000;')};

  height: 80px;
  padding: 15px 0;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: ${({ theme }) =>
    theme === 'dark' ? 'none' : '1px solid #000000;'};
  box-shadow: ${({ theme }) =>
    theme === 'dark' ? '0 0 5px 5px #000000' : 'none'};
`;

const LogoImg = styled.img`
  margin-left: 50px;
  margin-right: 50px;
  width: auto;
  height: 100%;
  filter: ${({ theme, name }) =>
    theme === 'dark' && name === 'all' ? 'invert(1)' : 'none'};
`;

function Header() {
  const theme = useSelector((state) => state.theme);

  return (
    <StyledHeader theme={theme}>
      <Link to="/">
        <LogoImg theme={theme} src={logo} alt="Logo Rockin'Lyrics" />
      </Link>
    </StyledHeader>
  );
}

export default Header;
