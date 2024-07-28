import styled from 'styled-components';
import Menu from './Menu';

const StyledHeader = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px 0;
  position: fixed;
  top: 0;
  z-index: 999;
`;

function Header() {
  return (
    <StyledHeader>
      <Menu />
    </StyledHeader>
  );
}

export default Header;
