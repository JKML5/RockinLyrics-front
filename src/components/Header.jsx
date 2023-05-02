import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  const theme = useSelector((state) => state.theme);

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
    filter: ${theme === 'dark' ? 'invert(1)' : 'none'};
  `;

  return (
    <StyledHeader>
      <Link to="/">
        <LogoImg src={logo} alt="Logo Rockin'1000" />
      </Link>
    </StyledHeader>
  );
}

export default Header;
