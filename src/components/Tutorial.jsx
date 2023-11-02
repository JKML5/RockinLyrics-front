import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ButtonLyrics from './ButtonLyrics';
import ButtonPlay from './ButtonPlay';
import ButtonDrive from './ButtonDrive';
import ContainerLyrics from './ContainerLyrics';
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

function Tutorial({ data, onPlayAudio, onPauseAudio }) {
  const { categories, gender, googleId, lyrics, title, type } = data;

  const theme = useSelector((state) => state.theme);
  const selectedGender = useSelector((state) => state.gender);
  const selectedCategory = useSelector((state) => state.category);

  let buttonsToShow = null;

  if (type === 'audio' || type === 'video') {
    buttonsToShow = (
      <>
        <ButtonPlay
          googleId={googleId}
          onPlayAudio={onPlayAudio}
          onPauseAudio={onPauseAudio}
        />
        <ButtonDrive googleId={googleId} />
      </>
    );
  } else if (type === 'lyrics') {
    buttonsToShow = (
      <>
        <ButtonLyrics />
        <ButtonDrive googleId={googleId} />
        <ButtonTest id={googleId} />
      </>
    );
  }

  const isVisible =
    (!gender || gender === selectedGender) &&
    (!categories ||
      categories.length === 0 ||
      categories.includes(selectedCategory));

  return (
    isVisible && (
      <StyledTutorial theme={theme}>
        <TutorialHeading theme={theme}>
          {title}
          <div>{buttonsToShow}</div>
        </TutorialHeading>

        {type === 'lyrics' && (
          <ContainerLyrics tutorialId={googleId} lyrics={lyrics} />
        )}
      </StyledTutorial>
    )
  );
}

Tutorial.propTypes = {
  data: PropTypes.shape({
    googleId: PropTypes.string,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    gender: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    lyrics: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  onPlayAudio: PropTypes.func.isRequired,
  onPauseAudio: PropTypes.func.isRequired,
};

export default Tutorial;
