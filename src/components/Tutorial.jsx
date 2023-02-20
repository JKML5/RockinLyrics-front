import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLyrics from './ButtonLyrics';
import ButtonPlay from './ButtonPlay';
import ButtonDrive from './ButtonDrive';
import { addLyrics } from '../store';

/**
 * Affiche une ligne de tuto
 * @param {*} param0
 * @returns
 */
function Tutorial({ data }) {
  const dispatch = useDispatch();

  function showLyrics(id) {
    const lyricsList = useSelector((state) => state.lyricsList);
    const lyrics = lyricsList[id];

    return (
      <div
        className="tutorial__lyrics"
        dangerouslySetInnerHTML={{ __html: lyrics }}
      />
    );
  }

  let buttonsToShow = null;

  if (data.type === 'audio') {
    buttonsToShow = (
      <>
        <ButtonPlay googleId={data.id} className="tutorial__audio" />
        <ButtonDrive googleId={data.id} />
      </>
    );
  } else if (data.type === 'video') {
    buttonsToShow = (
      <>
        <ButtonPlay googleId={data.id} />
        <ButtonDrive googleId={data.id} />
      </>
    );
  } else if (data.type === 'pdf') {
    // Save lyrics into redux
    fetch(`/lyrics/${data.id}.html`)
      .then((response) => response.text())
      .then((lyrics) => dispatch(addLyrics(data.id, lyrics)))
      .catch((error) => console.error(error));

    buttonsToShow = (
      <>
        <ButtonLyrics onClick={() => showLyrics(data.id)} />
        <ButtonDrive googleId={data.id} />
      </>
    );
  }

  return (
    <div className={`tutorial ${data.icon}`} id={data.id}>
      <div className="tutorial__heading">
        {data.title}
        <div className="tutorial__heading_buttons">{buttonsToShow}</div>
      </div>

      <audio controls>
        <source type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

Tutorial.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    lyrics: PropTypes.string,
  }).isRequired,
};

export default Tutorial;
