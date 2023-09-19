import PropTypes from 'prop-types';
import playButton from '../assets/play.svg';
import driveButton from '../assets/drive.png';

function TutoButton({ type, googleId }) {
  if (type === 'play') {
    return (
      <button type="button" className="btn btn-play-tutorial">
        <img
          src={playButton}
          alt="Jouer"
          className="tutorial__heading__icon tutorial__heading__icon--play"
        />
      </button>
    );
  }

  if (type === 'drive') {
    return (
      <button
        type="button"
        href={`https://drive.google.com/file/d/${googleId}/view?usp=sharing`}
        className="btn btn-download-tutorial"
      >
        <img
          src={driveButton}
          alt="Drive"
          className="tutorial__heading__icon tutorial__heading__icon--download"
        />
      </button>
    );
  }
}

TutoButton.defaultProps = {
  googleId: '',
};

TutoButton.propTypes = {
  type: PropTypes.string.isRequired,
  googleId: PropTypes.string,
};

export default TutoButton;
