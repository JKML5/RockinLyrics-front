import styled from 'styled-components';

const MenuButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 5px;
  box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  color: white;
  background-color: #2a2a2a;
  font-size: 1em;

  :hover {
    opacity: 0.7;
  }

  img {
    filter: invert(1);
    width: 100%;
    height: auto;
  }
`;

export default MenuButton;
