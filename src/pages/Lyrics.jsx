import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function Lyrics() {
  const { id } = useParams();
  const theme = useSelector((state) => state.theme);
  const fontSize = useSelector((state) => state.fontSize);

  const lyricsList = useSelector((state) => state.lyricsList);
  const songLyrics = lyricsList[id];
  const songLyricsLines = songLyrics.split('\n');

  const [currentLineIndex, setCurrentLineIndex] = useState(1);

  const Container = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: ${() => `${fontSize}px`};

    text-align: center;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .info {
      display: none;
    }

    .disabled {
      color: ${() => (theme === 'light' ? '#DDDDDD' : '#333333')};
    }

    strong {
      font-weight: 400;
    }
  `;

  const Line = styled.p`
    text-align: center;
    margin-bottom: 50px;
    color: ${() => (theme === 'light' ? '#000000' : '#EEEEEE')};
  `;

  const Button = styled.button`
    height: 40px;
    margin: 0 10px;
    padding: 10px;
    color: #000000;

    &:disabled {
      color: #000000;
    }
  `;

  function handleNextLine() {
    if (currentLineIndex < songLyricsLines.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
    }
  }

  function handlePreviousLine() {
    if (currentLineIndex > 1) {
      setCurrentLineIndex(currentLineIndex - 1);
    }
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowRight') {
        handleNextLine();
      } else if (event.key === 'ArrowLeft') {
        handlePreviousLine();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentLineIndex]);

  const isFirstLine = currentLineIndex === 1;
  const isLastLine = currentLineIndex === songLyricsLines.length - 1;

  let line = songLyricsLines[currentLineIndex];
  if (isFirstLine) {
    line = 'Début';
  } else if (isLastLine) {
    line = 'Fin';
  }

  return (
    <Container>
      <Line dangerouslySetInnerHTML={{ __html: line }} />
      <div>
        <Button
          type="button"
          onClick={() => handlePreviousLine()}
          disabled={isFirstLine}
        >
          Précédent
        </Button>
        <Button
          type="button"
          onClick={() => handleNextLine()}
          disabled={isLastLine}
        >
          Suivant
        </Button>
      </div>
    </Container>
  );
}

export default Lyrics;
