import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import imageSrc from '../assets/test.png';

function ButtonTest({ id }) {
  const Image = styled.img`
    height: 25px;
    position: relative;
    top: 5px;
    left: 10px;
  `;

  return (
    <Link to={`/lyrics/${id}`}>
      <Image
        src={imageSrc}
        alt="Drive"
        className="tutorial__heading__icon tutorial__heading__icon--download"
      />
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
