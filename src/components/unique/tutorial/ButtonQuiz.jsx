import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import imageSrc from '../../../assets/images/test.png';
import TutorialButton from '../../common/TutorialButton';

const Image = styled.img`
  height: 25px;
  width: auto;
  position: relative;
  margin-right: 10px;
  top: 5px;
  filter: ${({ theme }) => theme.tutorial.iconFilter};
`;

const ButtonQuiz = ({ onClick }) => {
  return (
    <TutorialButton type="button" onClick={onClick}>
      <Image src={imageSrc} alt="Réviser" />
    </TutorialButton>
  );
};

ButtonQuiz.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonQuiz;
