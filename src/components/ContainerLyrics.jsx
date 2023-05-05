import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledContainerLyrics = styled.div`
  padding: 10px 0;
  font-size: ${({ fontSize }) => `${fontSize}px`};

  .info {
    color: ${({ theme }) => (theme === 'light' ? '#AAAAAA' : '#999999')};
  }

  .disabled {
    color: ${({ theme }) => (theme === 'light' ? '#DDDDDD' : '#CCCCCC')};
  }

  strong {
    font-weight: 400;
  }
`;

function ContainerLyrics({ tutorialId }) {
  const theme = useSelector((state) => state.theme);
  const lyricsList = useSelector((state) => state.lyricsList);
  const lyrics = lyricsList[tutorialId];
  const fontSize = useSelector((state) => state.fontSize);

  return (
    { lyrics } && (
      <StyledContainerLyrics
        theme={theme}
        fontSize={fontSize}
        dangerouslySetInnerHTML={{ __html: lyrics }}
      />
    )
  );
}

ContainerLyrics.propTypes = {
  tutorialId: PropTypes.string.isRequired,
};

export default ContainerLyrics;
