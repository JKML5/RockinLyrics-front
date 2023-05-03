import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import imageSrc from '../assets/drive.png';
import TutoLink from './shared/TutoLink';

function ButtonDrive({ googleId }) {
  const theme = useSelector((state) => state.theme);

  const Image = styled.img`
    height: 18px;
    filter: ${() => (theme === 'light' ? 'none' : 'invert(1);')};
  `;

  return (
    <TutoLink
      to={`https://drive.google.com/file/d/${googleId}/view?usp=sharing`}
    >
      <Image src={imageSrc} alt="Drive" />
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
