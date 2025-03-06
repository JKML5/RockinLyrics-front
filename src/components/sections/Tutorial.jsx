import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useState } from 'react';
import ContainerLyrics from './ContainerLyrics';
import QuizLyrics from './QuizLyrics';
import ButtonPlay from '../unique/tutorial/ButtonPlay';
import ButtonQuiz from '../unique/tutorial/ButtonQuiz';
import ButtonDrive from '../unique/tutorial/ButtonDrive';
import { Link } from 'react-router-dom';

const StyledTutorial = styled.div`
  font-size: 16px;
  border-top: ${({ theme }) => theme.tutorial.borderTop};
  padding: 10px 0;
`;

const TutorialHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
`;

function Tutorial({ data, songId }) {
  const { _id, categories, gender, url, lyrics, title, type } = data;

  const selectedGender = useSelector((state) => state.gender);
  const selectedCategory = useSelector((state) => state.category);

  const [showQuiz, setShowQuiz] = useState(false);

  // Paramètres GET
  const searchParams = new URLSearchParams(document.location.search);
  const isAdmin = searchParams.get('admin') === 'true';

  const handleToggle = () => {
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
        {isAdmin && <Link to={`/admin/song/${songId}/${_id}/edit`}>EDIT</Link>}
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
      <StyledTutorial>
        <TutorialHeading>
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
