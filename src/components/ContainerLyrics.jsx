import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

function ContainerLyrics({ songId, tutorialId }) {
  const [lyrics, setLyrics] = useState('');

  useEffect(() => {
    fetch(`./lyrics/${songId}/${tutorialId}.html`).then((response) =>
      response
        .text()
        .then((loadedData) => setLyrics(loadedData))
        .catch((error) => console.log(error))
    );
  }, []);

  // const fontSize = useSelector((state) => state.fontSize);
  const fontSize = 18;

  const StyledContainerLyrics = styled.div`
    background-color: white;
    padding: 10px 0;
    font-size: ${() => `${fontSize}px`};

    .info {
      color: #aaaaaa;
    }

    .disabled {
      color: #dddddd;
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
  songId: PropTypes.number.isRequired,
  tutorialId: PropTypes.string.isRequired,
};

export default ContainerLyrics;
