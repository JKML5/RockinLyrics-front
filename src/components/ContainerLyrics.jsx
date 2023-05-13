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
`;

function ContainerLyrics({ tutorialId }) {
  const theme = useSelector((state) => state.theme);
  const lyricsList = useSelector((state) => state.lyricsList);
  const lyrics = lyricsList[tutorialId];
  const fontSize = useSelector((state) => state.fontSize);

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
  tutorialId: PropTypes.string.isRequired,
};

export default ContainerLyrics;
