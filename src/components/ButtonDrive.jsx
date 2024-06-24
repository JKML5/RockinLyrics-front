import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import imageSrc from '../assets/url.png';
import TutoLink from './shared/TutoLink';

const Image = styled.img`
  height: 18px;
  filter: ${({ theme }) => (theme === 'light' ? 'none' : 'invert(1);')};
`;

function ButtonDrive({ url = '' }) {
  const theme = useSelector((state) => state.theme);

  return (
    <TutoLink to={url}>
      <Image theme={theme} src={imageSrc} alt="URL" />
    </TutoLink>
  );
}

ButtonDrive.propTypes = {
  url: PropTypes.string,
};

export default ButtonDrive;
