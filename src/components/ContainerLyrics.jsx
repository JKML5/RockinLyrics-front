import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import songsExtracts from '../data/songsExtracts';

const StyledContainerLyrics = styled.div`
  padding: 10px 0;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#FFFFFF')};
  white-space: pre-wrap;

  .info {
    color: ${({ theme }) => (theme === 'light' ? '#AAAAAA' : '#AAAAAA')};
  }

  .disabled {
    color: ${({ theme }) => (theme === 'light' ? '#DDDDDD' : '#444444')};
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
    };

    const handleClickOnWord = (event) => {
      const { id } = event.target.dataset;

      if (id) {
        handleClick(songsExtracts[id]);
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

  const renderLyrics = () =>
    lyrics.replace(
      /{([^#]+)#(\d+)}/g,
      '<a class="clickable" data-id="$2">$1 <img class="icon-speaker" src="./img/speaker.svg" alt="click" /></a>',
    );

  return (
    lyrics && (
      <StyledContainerLyrics
        theme={theme}
        fontSize={fontSize}
        dangerouslySetInnerHTML={{ __html: renderLyrics() }}
      />
    )
  );
}

ContainerLyrics.propTypes = {
  lyrics: PropTypes.string.isRequired,
  onPlayClick: PropTypes.func.isRequired,
};

export default ContainerLyrics;
