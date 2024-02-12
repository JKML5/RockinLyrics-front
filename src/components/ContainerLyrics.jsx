import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainerLyrics = styled.div`
  padding: 10px 0;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#FFFFFF')};

  .info {
    color: ${({ theme }) => (theme === 'light' ? '#AAAAAA' : '#AAAAAA')};
  }

  .disabled {
    color: ${({ theme }) => (theme === 'light' ? '#DDDDDD' : '#444444')};
  }

  strong {
    font-weight: 400;
  }

  p:empty {
    min-height: 1em;
  }
`;

function ContainerLyrics({ lyrics, onPlayClick }) {
  const theme = useSelector((state) => state.theme);
  const fontSize = useSelector((state) => state.fontSize);

  useEffect(() => {
    const handleClick = (googleId) => {
      onPlayClick('audio', 'play', googleId);
      console.log(googleId);
    };

    const handleClickOnWord = (event) => {
      const { googleId } = event.target.dataset;

      if (googleId) {
        handleClick(googleId);
      }
    };

    const elements = document.querySelectorAll('.clickable');
    elements.forEach((element) => {
      element.addEventListener('click', handleClickOnWord);
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('click', handleClickOnWord);
      });
    };
  }, [lyrics]);

  return (
    lyrics && (
      <StyledContainerLyrics
        theme={theme}
        fontSize={fontSize}
        dangerouslySetInnerHTML={{ __html: lyrics }}
      />
    )
  );
}

ContainerLyrics.propTypes = {
  lyrics: PropTypes.string.isRequired,
  onPlayClick: PropTypes.func.isRequired,
};

export default ContainerLyrics;
