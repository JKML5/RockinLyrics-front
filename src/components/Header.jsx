import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  const theme = useSelector((state) => state.theme);

  const StyledHeader = styled.header`
    height: 80px;
    background-color: #ffffff;
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid #000000;
    filter: ${theme === 'dark' ? 'invert(1)' : 'none'};
  `;

  const LogoImg = styled.img`
    width: auto;
    height: 100%;
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
