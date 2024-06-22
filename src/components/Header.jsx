import styled from 'styled-components';
import { useSelector } from 'react-redux';
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
  z-index: 999;
`;

function Header() {
  const theme = useSelector((state) => state.theme);

  return (
    <StyledHeader theme={theme}>
      <Menu />
    </StyledHeader>
  );
}

export default Header;
