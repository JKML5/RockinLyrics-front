import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Tutorial from './Tutorial';

const SongWrapper = styled.div`
  border-top: ${({ theme }) =>
    theme === 'light' ? '1px solid #dddddd' : '1px solid #222222'};

  &:first-child {
    border-top: none;
  }
`;

const SongTitle = styled.a`
  width: 100%;
  padding: 15px 0;
  border: none;
  outline: none;
  text-align: left;
  font-size: 20px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  color: ${({ theme }) => (theme === 'light' ? '#505050' : '#cccccc')};
  cursor: pointer;
  text-decoration: none;
  display: block;
`;

function Song({ title, tutorials }) {
  const theme = useSelector((state) => state.theme);

  const [isActive, setIsActive] = useState(false);

  return (
    <SongWrapper theme={theme}>
      <SongTitle theme={theme} onClick={() => setIsActive(!isActive)}>
        {title}
      </SongTitle>

      {isActive &&
        Array.isArray(tutorials) &&
        tutorials.map((tutorial) => (
          <Tutorial
            key={tutorial._id}
            data={tutorial}
            songId={tutorial.googleId}
          />
        ))}
    </SongWrapper>
  );
}

Song.propTypes = {
  title: PropTypes.string.isRequired,
  tutorials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      googleId: PropTypes.string,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      gender: PropTypes.string,
      category: PropTypes.arrayOf(PropTypes.string),
      lyrics: PropTypes.string,
      message: PropTypes.string,
    }),
  ).isRequired,
};

export default Song;
