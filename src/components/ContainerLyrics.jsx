import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function ContainerLyrics({ tutorialId }) {
  const theme = useSelector((state) => state.theme);
  const lyricsList = useSelector((state) => state.lyricsList);
  const lyrics = lyricsList[tutorialId];
  const fontSize = useSelector((state) => state.fontSize);

  const StyledContainerLyrics = styled.div`
    padding: 10px 0;
    font-size: ${() => `${fontSize}px`};

    .info {
      color: ${() => (theme === 'light' ? '#AAAAAA' : '#999999')};
    }

    .disabled {
      color: ${() => (theme === 'light' ? '#DDDDDD' : '#CCCCCC')};
    }

    strong {
      font-weight: 400;
    }
  `;

  return (
    { lyrics } && (
      <StyledContainerLyrics dangerouslySetInnerHTML={{ __html: lyrics }} />
    )
  );
}

ContainerLyrics.propTypes = {
  tutorialId: PropTypes.string.isRequired,
};

export default ContainerLyrics;
