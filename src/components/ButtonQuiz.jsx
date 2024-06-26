import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import imageSrc from '../assets/test.png';

const Image = styled.img`
  height: 25px;
  width: auto;
  position: relative;
  margin-right: 10px;
  top: 5px;
  filter: ${({ theme }) => (theme === 'light' ? 'none' : 'invert(1);')};
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

function ButtonQuiz({ onClick }) {
  const theme = useSelector((state) => state.theme);

  return (
    <StyledButton type="button" onClick={onClick}>
      <Image theme={theme} src={imageSrc} alt="Réviser" />
    </StyledButton>
  );
}

ButtonQuiz.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonQuiz;
