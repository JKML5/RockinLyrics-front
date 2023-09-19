import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logoAll from '../assets/logo-rockin1000.png';
import logoRivLight from '../assets/logo-riv-light.png';
import logoRivDark from '../assets/logo-riv-dark.png';
import logoFestirock from '../assets/logo-festirock.svg';

const StyledHeader = styled.header`
  background-color: ${({ theme }) => (theme === 'light' ? 'none' : '#000000;')};

  height: 80px;
  padding: 10px 0;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: ${({ theme }) =>
    theme === 'dark' ? 'none' : '1px solid #000000;'};
  box-shadow: ${({ theme }) =>
    theme === 'dark' ? '0 0 5px 5px #000000' : 'none'};
`;

const LogoImg = styled.img`
  width: auto;
  height: 100%;
  filter: ${({ theme, name }) =>
    theme === 'dark' && name === 'all' ? 'invert(1)' : 'none'};
`;

function Header() {
  const theme = useSelector((state) => state.theme);
  const name = useSelector((state) => state.name);

  let logoImg;

  if (name === 'riv') {
    if (theme === 'light') {
      logoImg = (
        <LogoImg
          theme={theme}
          name={name}
          src={logoRivLight}
          alt="Logo Rock'in Villages"
        />
      );
    } else {
      logoImg = (
        <LogoImg
          theme={theme}
          name={name}
          src={logoRivDark}
          alt="Logo Rock'in Villages"
        />
      );
    }
  } else if (name === 'festirock') {
    logoImg = (
      <LogoImg theme={theme} src={logoFestirock} alt="Logo Festirock" />
    );
  } else {
    logoImg = <LogoImg theme={theme} src={logoAll} alt="Logo Rockin'1000" />;
  }

  return (
    <StyledHeader theme={theme}>
      <Link to="/">{logoImg}</Link>
    </StyledHeader>
  );
}

export default Header;
