import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import lyricsButton from '../assets/text.png';

function LyricsButton() {
  const theme = useSelector((state) => state.theme);

  const Image = styled.img`
    height: 19px;
    width: auto;
    margin-right: 10px;
    filter: ${() => (theme === 'light' ? 'none' : 'invert(1);')};
  `;

  return <Image src={lyricsButton} alt="Paroles" />;
}

export default LyricsButton;
