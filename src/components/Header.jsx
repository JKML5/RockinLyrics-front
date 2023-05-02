import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logoAll from '../assets/logo-rockin1000.png';
import logoRivLight from '../assets/logo-riv-light.png';
import logoRivDark from '../assets/logo-riv-dark.png';

function Header() {
  const theme = useSelector((state) => state.theme);
  const name = useSelector((state) => state.name);

  const StyledHeader = styled.header`
    background-color: ${theme === 'light' ? 'none' : '#000000;'};
    height: 80px;
    padding: 15px 0 5px 0;
    margin-bottom: 30px;
    text-align: center;
    border-bottom: ${theme === 'dark' ? 'none' : '1px solid #000000;'};
    box-shadow: ${theme === 'dark' ? '0 0 10px 10px #000000' : 'none'};
  `;

  const LogoImg = styled.img`
    width: auto;
    height: 100%;
    filter: ${theme === 'dark' && name === 'all' ? 'invert(1)' : 'none'};
  `;

  let logoImg;

  if (name === 'riv') {
    if (theme === 'light') {
      logoImg = <LogoImg src={logoRivLight} alt="Logo Rock'in Villages" />;
    } else {
      logoImg = <LogoImg src={logoRivDark} alt="Logo Rock'in Villages" />;
    }
  } else {
    logoImg = <LogoImg src={logoAll} alt="Logo Rockin'1000" />;
  }

  return (
    <StyledHeader>
      <Link to="/">{logoImg}</Link>
    </StyledHeader>
  );
}

export default Header;
