import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addLyrics } from '../store';

function ContainerLyrics({ songId, tutorialId }) {
  const dispatch = useDispatch();

  const [lyrics, setLyrics] = useState('');

  const theme = useSelector((state) => state.theme);
  const fontSize = useSelector((state) => state.fontSize);

  useEffect(() => {
    fetch(`./lyrics/${songId}/${tutorialId}.html`).then((response) =>
      response
        .text()
        .then((loadedData) => {
          setLyrics(loadedData);
          dispatch(addLyrics(tutorialId, loadedData));
        })
        .catch((error) => console.log(error))
    );
  }, [dispatch, tutorialId]);

  const StyledContainerLyrics = styled.div`
    background-color: white;
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
  songId: PropTypes.number.isRequired,
  tutorialId: PropTypes.string.isRequired,
};

export default ContainerLyrics;
