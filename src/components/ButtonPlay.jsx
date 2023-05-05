import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import playImgSrc from '../assets/play.svg';
import TutoLink from './shared/TutoLink';

const Image = styled.img`
  height: 17px;
  width: auto;
  margin-right: 5px;
  filter: ${({ theme }) => (theme === 'light' ? 'none' : 'invert(1);')};
`;

function ButtonPlay({ onClick }) {
  const theme = useSelector((state) => state.theme);

  return (
    <TutoLink type="button" onClick={onClick}>
      <Image theme={theme} src={playImgSrc} alt="Jouer" />
    </TutoLink>
  );
}

ButtonPlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ButtonPlay;
