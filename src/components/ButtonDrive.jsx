import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import imageSrc from '../assets/drive.png';
import TutoLink from './shared/TutoLink';

const Image = styled.img`
  height: 18px;
  filter: ${({ theme }) => (theme === 'light' ? 'none' : 'invert(1);')};
`;

function ButtonDrive({ googleId }) {
  const theme = useSelector((state) => state.theme);

  return (
    <TutoLink
      to={`https://drive.google.com/file/d/${googleId}/view?usp=sharing`}
    >
      <Image theme={theme} src={imageSrc} alt="Drive" />
    </TutoLink>
  );
}

ButtonDrive.defaultProps = {
  googleId: '',
};

ButtonDrive.propTypes = {
  googleId: PropTypes.string,
};

export default ButtonDrive;
