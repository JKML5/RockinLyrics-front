import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: ${({ fontSize }) => `${fontSize}px`};

  text-align: center;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .info {
    color: ${({ theme }) => theme.tutorial.infoColor};
  }

  .disabled {
    color: ${({ theme }) => theme.tutorial.disabledColor};
  }
`;

const Line = styled.p`
  text-align: center;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.colors.primary};
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

function QuizLyrics({ lyrics }) {
  const fontSize = useSelector((state) => state.fontSize);

  const songLyricsLines = lyrics.split(/<br>|\n/);
  songLyricsLines.unshift('Début');
  songLyricsLines.push('Fin');

  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  function handleNextLine() {
    if (currentLineIndex < songLyricsLines.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
    }
  }

  function handlePreviousLine() {
    if (currentLineIndex > 0) {
      setCurrentLineIndex(currentLineIndex - 1);
    }
  }

  function handleFirstLine() {
    if (currentLineIndex > 0) {
      setCurrentLineIndex(0);
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

  const isFirstLine = currentLineIndex === 0;
  const isLastLine = currentLineIndex === songLyricsLines.length - 1;

  let line = songLyricsLines[currentLineIndex];

  // Remove clickable URLs { ... #}
  line = line.replace(/{([^#]+)#(\d+)}/g, '$1');

  return (
    <Container fontSize={fontSize}>
      <Line dangerouslySetInnerHTML={{ __html: line }} />
      <div>
        <Button
          type="button"
          onClick={() => handleFirstLine()}
          disabled={isFirstLine}
        >
          Début
        </Button>
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

QuizLyrics.propTypes = {
  lyrics: PropTypes.string.isRequired,
};

export default QuizLyrics;
