import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import playImgSrc from '../assets/play.svg';
import TutoLink from './shared/TutoLink';
import { launchAudio } from '../store';

const Image = styled.img`
  height: 17px;
  width: auto;
  margin-right: 5px;
  filter: ${({ theme }) => (theme === 'light' ? 'none' : 'invert(1);')};
`;

function ButtonPlay({ googleId }) {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme);

  const handleClickAudioPlayer = () => {
    dispatch(launchAudio(googleId));
  };

  return (
    <TutoLink type="button" onClick={() => handleClickAudioPlayer()}>
      <Image theme={theme} src={playImgSrc} alt="Jouer" />
    </TutoLink>
  );
}

ButtonPlay.propTypes = {
  googleId: PropTypes.string.isRequired,
};

export default ButtonPlay;
