import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tutorial from './Tutorial';

const SongWrapper = styled.div`
  border-top: ${({ theme }) => theme.song.borderTop};
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
  cursor: pointer;
  text-decoration: none;
  display: block;
`;

function Song({ id, title, tutorials }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <SongWrapper>
      <SongTitle onClick={() => setIsActive(!isActive)}>{title}</SongTitle>

      {isActive &&
        Array.isArray(tutorials) &&
        tutorials.map((tutorial) => (
          <Tutorial key={tutorial._id} data={tutorial} songId={id} />
        ))}
    </SongWrapper>
  );
}

Song.propTypes = {
  title: PropTypes.string.isRequired,
  tutorials: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
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
