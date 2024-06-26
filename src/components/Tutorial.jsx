import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useState } from 'react';
import ButtonPlay from './ButtonPlay';
import ButtonDrive from './ButtonDrive';
import ContainerLyrics from './ContainerLyrics';
import ButtonQuiz from './ButtonQuiz';
import QuizLyrics from './QuizLyrics';

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

function Tutorial({ data }) {
  const { categories, gender, url, lyrics, title, type } = data;

  const theme = useSelector((state) => state.theme);
  const selectedGender = useSelector((state) => state.gender);
  const selectedCategory = useSelector((state) => state.category);

  const [showQuiz, setShowQuiz] = useState(false);

  const handleToggle = () => {
    console.log('coucou toggle');
    setShowQuiz((prevShowQuiz) => !prevShowQuiz);
  };

  let buttonsToShow = null;

  if (type === 'audio') {
    buttonsToShow = (
      <>
        <ButtonPlay url={url} type="audio" />
        <ButtonDrive url={url} />
      </>
    );
  } else if (type === 'video') {
    buttonsToShow = (
      <>
        <ButtonPlay url={url} type="video" />
        <ButtonDrive url={url} />
      </>
    );
  } else if (type === 'lyrics') {
    buttonsToShow = (
      <>
        <ButtonQuiz onClick={handleToggle} />
        <ButtonDrive url={url} />
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

        {type === 'lyrics' &&
          (showQuiz ? (
            <QuizLyrics lyrics={lyrics} />
          ) : (
            <ContainerLyrics lyrics={lyrics} />
          ))}
      </StyledTutorial>
    )
  );
}

Tutorial.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    gender: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    lyrics: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

export default Tutorial;
