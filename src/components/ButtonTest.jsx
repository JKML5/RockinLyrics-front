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
  margin-left: 10px;
  top: 5px;
  filter: ${({ theme }) => (theme === 'light' ? 'none' : 'invert(1);')};
`;

function ButtonTest({ id }) {
  const theme = useSelector((state) => state.theme);

  return (
    <Link to={`/lyrics/${id}`}>
      <Image theme={theme} src={imageSrc} alt="Réviser" />
    </Link>
  );
}

ButtonTest.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ButtonTest;
