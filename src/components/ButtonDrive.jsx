import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import imageSrc from '../assets/drive.png';

function ButtonDrive({ googleId }) {
  return (
    <Link
      to={`https://drive.google.com/file/d/${googleId}/view?usp=sharing`}
      className="btn btn-download-tutorial"
    >
      <img
        src={imageSrc}
        alt="Drive"
        className="tutorial__heading__icon tutorial__heading__icon--download"
      />
    </Link>
  );
}

ButtonDrive.defaultProps = {
  googleId: '',
};

ButtonDrive.propTypes = {
  googleId: PropTypes.string,
};

export default ButtonDrive;
