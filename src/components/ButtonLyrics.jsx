import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import lyricsButton from '../assets/text.png';

const Image = styled.img`
  height: 19px;
  width: auto;
  margin-right: 10px;
  filter: ${({ theme }) => (theme === 'light' ? 'none' : 'invert(1);')};
`;

function LyricsButton() {
  const theme = useSelector((state) => state.theme);

  return <Image theme={theme} src={lyricsButton} alt="Paroles" />;
}

export default LyricsButton;
