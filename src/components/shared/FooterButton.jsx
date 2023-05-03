import styled from 'styled-components';

const FooterButton = styled.button`
  width: 50px;
  height: 50px;
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

  :hover {
    opacity: 0.7;
  }
`;

export default FooterButton;
