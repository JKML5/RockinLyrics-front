import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import imageSrc from '../assets/test.png';

const Image = styled.img`
  height: 25px;
  width: auto;
  position: relative;
  margin-right: 10px;
  top: 5px;
  filter: ${({ theme }) => (theme === 'light' ? 'none' : 'invert(1);')};
`;

function ButtonTest({ songId, tutorialId }) {
  const theme = useSelector((state) => state.theme);

  return (
    <Link to={`/lyrics/${songId}/${tutorialId}`}>
      <Image theme={theme} src={imageSrc} alt="Réviser" />
    </Link>
  );
}

ButtonTest.propTypes = {
  songId: PropTypes.string.isRequired,
  tutorialId: PropTypes.string.isRequired,
};

export default ButtonTest;
