import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContainerLyrics from './ContainerLyrics';
import { useSelector } from 'react-redux';

const PartitionWrapper = styled.div`
  border-top: ${({ theme }) => theme.song.borderTop};
  &:first-child {
    border-top: none;
  }
`;

const SongTitle = styled.h2`
  width: 100%;
  padding: 15px 0;
  margin-top: 50px;
  border: none;
  outline: none;
  text-align: center;
  font-size: 24px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  text-decoration: none;
  display: block;
`;

function Partition({ id, title, tutorials }) {
  const selectedGender = useSelector((state) => state.gender);
  const selectedCategory = useSelector((state) => state.category);

  const isVisible = (tutorial) =>
    (!tutorial.gender || tutorial.gender === selectedGender) &&
    (!tutorial.categories ||
      tutorial.categories.length === 0 ||
      tutorial.categories.includes(selectedCategory));

  return (
    <PartitionWrapper id={`partition-${id}`}>
      <SongTitle>{title}</SongTitle>

      {Array.isArray(tutorials) &&
        tutorials
          .filter(isVisible)
          .map((tutorial) => (
            <ContainerLyrics key={tutorial._id} lyrics={tutorial.lyrics} />
          ))}
    </PartitionWrapper>
  );
}

Partition.propTypes = {
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

export default Partition;
