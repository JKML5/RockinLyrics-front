import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  width: 100%;
  background-color: #181824;
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 14px;

  a {
    color: #7e8299;
    text-decoration: none;
  }
`;

const StyledContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const MenuNav = styled.ul`
  display: flex;
  align-items: stretch;
`;

const MenuItem = styled.li`
  display: flex;
  border-radius: 0.42rem;
  padding: 0.85rem 1.5rem;
  margin-right: 20px;

  &.active {
    background-color: #3445e5 !important;

    a {
      color: #ffffff;
    }
  }

  &:hover {
    background-color: #27283d;
    transition: all 0.3s ease;
  }
`;

function AdminHeader() {
  const location = useLocation();

  return (
    <StyledHeader>
      <StyledContainer>
        <MenuNav>
          <MenuItem
            className={location.pathname === '/admin/song' ? 'active' : ''}
          >
            <Link to="/admin/song">Chansons</Link>
          </MenuItem>
          <MenuItem
            className={location.pathname === '/admin/concert' ? 'active' : ''}
          >
            <Link to="/admin/concert">Concerts</Link>
          </MenuItem>
        </MenuNav>
      </StyledContainer>
    </StyledHeader>
  );
}

export default AdminHeader;
