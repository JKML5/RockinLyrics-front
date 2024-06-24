import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import songsExtracts from '../data/songsExtracts';
import { launchAudioPlayer } from '../store';
import speakerIcon from '../assets/speaker.svg';

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

  .clickable {
    cursor: pointer;
    text-decoration: underline;

    .icon-speaker {
      display: inline-block;
      width: 20px;
      height: 20px;
      position: relative;
      top: 4px;
    }
  }
`;

function ContainerLyrics({ lyrics = '' }) {
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const theme = useSelector((state) => state.theme);
  const fontSize = useSelector((state) => state.fontSize);

  useEffect(() => {
    const handleClick = (url) => {
      dispatch(launchAudioPlayer(url));
    };

    const handleClickOnWord = (event) => {
      const { id } = event.target.dataset;

      if (id) {
        handleClick(`/${songsExtracts[id]}`);
      }
    };

    const container = containerRef.current;
    if (container) {
      const elements = container.querySelectorAll('.clickable');
      elements.forEach((element) => {
        element.addEventListener('click', handleClickOnWord);
      });

      return () => {
        elements.forEach((element) => {
          element.removeEventListener('click', handleClickOnWord);
        });
      };
    }
  }, [lyrics, dispatch]);

  const renderLyrics = () =>
    lyrics.replace(
      /{([^#]+)#(\d+)}/g,
      `<a class="clickable" data-id="$2">$1 <img class="icon-speaker" src="${speakerIcon}" alt="click" /></a>`,
    );

  return (
    lyrics && (
      <StyledContainerLyrics
        ref={containerRef}
        theme={theme}
        fontSize={fontSize}
        dangerouslySetInnerHTML={{ __html: renderLyrics() }}
      />
    )
  );
}

ContainerLyrics.propTypes = {
  lyrics: PropTypes.string,
};

export default ContainerLyrics;
