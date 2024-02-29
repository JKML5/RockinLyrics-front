import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useFetchSongs from '../hooks/useImportSongs';

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: ${({ fontSize }) => `${fontSize}px`};

  text-align: center;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .info {
    display: none;
  }

  .disabled {
    color: ${({ theme }) => (theme === 'light' ? '#DDDDDD' : '#333333')};
  }
`;

const Line = styled.p`
  text-align: center;
  margin-bottom: 50px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#EEEEEE')};
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

function QuizLyrics() {
  useFetchSongs();

  const { songId, tutorialId } = useParams();
  const theme = useSelector((state) => state.theme);
  const fontSize = useSelector((state) => state.fontSize);
  const songs = useSelector((state) => state.songs);

  const findItemById = (idToFind) => songs.find((item) => item.id === idToFind);

  const selectedSong = findItemById(songId);

  const findTutorialById = (idToFind) =>
    selectedSong.tutorials.find((item) => item._id === idToFind);

  const selectedTutorial = findTutorialById(tutorialId);
  const songLyrics = selectedTutorial.lyrics;
  const songLyricsLines = songLyrics.split('<br>');
  const [currentLineIndex, setCurrentLineIndex] = useState(1);

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
  }

  // Remove clickable URLs { ... #}
  line = line.replace(/{([^#]+)#(\d+)}/g, '$1');

  return (
    <Container theme={theme} fontSize={fontSize}>
      <Line theme={theme} dangerouslySetInnerHTML={{ __html: line }} />
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

export default QuizLyrics;
