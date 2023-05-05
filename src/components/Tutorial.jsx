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

function Tutorial({ data, songId }) {
  const gender = useSelector((state) => state.gender);
  const category = useSelector((state) => state.category);
  const theme = useSelector((state) => state.theme);

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
        <ButtonPlay googleId={data.id} onClick={handleClickAudioPlayer} />
        <ButtonDrive googleId={data.id} />
      </>
    );
  } else if (data.type === 'video') {
    buttonsToShow = (
      <>
        <ButtonPlay googleId={data.id} onClick={handleClickVideoPlayer} />
        <ButtonDrive googleId={data.id} />
      </>
    );
  } else if (data.type === 'lyrics') {
    buttonsToShow = (
      <>
        <ButtonLyrics />
        <ButtonDrive googleId={data.id} />
        <ButtonTest id={data.id} />
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

  return (
    show && (
      <StyledTutorial theme={theme}>
        <TutorialHeading theme={theme}>
          {data.title}
          <div>{buttonsToShow}</div>
        </TutorialHeading>

        {showAudioPlayerFlag && showAudioPlayer(data.id)}
        {showVideoPlayerFlag && showVideoPlayer(data.id)}

        {data.type === 'lyrics' && (
          <ContainerLyrics songId={songId} tutorialId={data.id} />
        )}
      </StyledTutorial>
    )
  );
}

Tutorial.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    gender: PropTypes.string,
    category: PropTypes.arrayOf(PropTypes.string),
    lyrics: PropTypes.string,
  }).isRequired,
  songId: PropTypes.number.isRequired,
};

export default Tutorial;
