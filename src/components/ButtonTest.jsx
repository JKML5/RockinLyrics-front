import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import imageSrc from '../assets/test.png';

function ButtonTest({ id }) {
  const theme = useSelector((state) => state.theme);

  const Image = styled.img`
    height: 25px;
    width: auto;
    position: relative;
    margin-left: 10px;
    top: 5px;
    filter: ${() => (theme === 'light' ? 'none' : 'invert(1);')};
  `;

  return (
    <Link to={`/lyrics/${id}`}>
      <Image src={imageSrc} alt="Réviser" />
    </Link>
  );
}

ButtonTest.defaultProps = {
  id: '',
};

ButtonTest.propTypes = {
  id: PropTypes.string,
};

export default ButtonTest;
