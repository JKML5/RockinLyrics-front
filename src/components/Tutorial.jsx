import PropTypes from 'prop-types';
import TutoButton from './TutoButton';
// import lyricsButton from '../assets/text.png';

function Tutorial({ data }) {
  return (
    <div className={`tutorial ${data.icon}`} id={data.id}>
      <div className="tutorial__heading">
        {data.title}
        <div className="tutorial__heading_buttons">
          <TutoButton type="play" />
          <TutoButton type="drive" googleId={data.id} />
        </div>
      </div>
    </div>
  );
}

Tutorial.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Tutorial;
