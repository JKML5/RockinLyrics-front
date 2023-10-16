import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ButtonLyrics from './ButtonLyrics';
import ButtonPlay from './ButtonPlay';
import ButtonDrive from './ButtonDrive';
import ContainerLyrics from './ContainerLyrics';
import showAudioPlayer from '../hooks/showAudioPlayer';
import showVideoPlayer from '../hooks/showVideoPlayer';
import ButtonTest from './ButtonTest';

const StyledTutorial = styled.div`
  font-size: 16px;
  border-top: 1px solid
    ${({ theme }) => (theme === 'light' ? '#eeeeee' : '#111111')};
  padding: 10px 0;
`;

const TutorialHeading = styled.div`
  color: ${({ theme }) => (theme === 'light' ? '#333333' : '#cccccc')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
`;

const StyledMessage = styled.div`
  font-size: ${({ fontSize }) => `${fontSize}px`};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#FFFFFF')};
`;

function Tutorial({ data, songId }) {
  const id = data.googleId || data.id;
  const gender = useSelector((state) => state.gender);
  const category = useSelector((state) => state.category);
  const theme = useSelector((state) => state.theme);
  const fontSize = useSelector((state) => state.fontSize);

  const [showAudioPlayerFlag, setShowAudioPlayerFlag] = useState(false);
  const [showVideoPlayerFlag, setShowVideoPlayerFlag] = useState(false);

  const handleClickAudioPlayer = () => {
    setShowAudioPlayerFlag(!showAudioPlayerFlag);
  };

  const handleClickVideoPlayer = () => {
    setShowVideoPlayerFlag(!showVideoPlayerFlag);
  };

  let buttonsToShow = null;

  if (data.type === 'audio') {
    buttonsToShow = (
      <>
        <ButtonPlay googleId={id} onClick={handleClickAudioPlayer} />
        <ButtonDrive googleId={id} />
      </>
    );
  } else if (data.type === 'video') {
    buttonsToShow = (
      <>
        <ButtonPlay googleId={id} onClick={handleClickVideoPlayer} />
        <ButtonDrive googleId={id} />
      </>
    );
  } else if (data.type === 'lyrics') {
    buttonsToShow = (
      <>
        <ButtonLyrics />
        <ButtonDrive googleId={id} />
        <ButtonTest id={id} />
      </>
    );
  }

  let show = true;

  if (data.gender) {
    show = data.gender === gender;
  }

  if (show && data.category) {
    show = data.category.includes(category);
  }

  // TODO JK supprimer category
  if (show && data.categories) {
    if (data.categories.length === 0) {
      show = true;
    } else {
      show = data.categories.includes(category);
    }
  }

  return (
    show && (
      <StyledTutorial theme={theme}>
        <TutorialHeading theme={theme}>
          {data.title}
          <div>{buttonsToShow}</div>
        </TutorialHeading>

        {showAudioPlayerFlag && showAudioPlayer(id)}
        {showVideoPlayerFlag && showVideoPlayer(id)}

        {data.type === 'lyrics' && (
          <ContainerLyrics tutorialId={id} lyrics={data.lyrics} />
        )}

        {data.type === 'message' && (
          <StyledMessage theme={theme} fontSize={fontSize}>
            {data.message}
          </StyledMessage>
        )}
      </StyledTutorial>
    )
  );
}

Tutorial.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    googleId: PropTypes.string,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    gender: PropTypes.string,
    category: PropTypes.arrayOf(PropTypes.string),
    lyrics: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  songId: PropTypes.string.isRequired,
};

export default Tutorial;
