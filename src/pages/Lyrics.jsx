import songs from '../data/songs';
import Tutorial from '../components/Tutorial';

function Lyrics() {
  return (
    <section className="section">
      <h1 className="section__title">Tutoriels</h1>
      <ul className="songs">
        {songs.map((song) => (
          <li className="song" key={song.id}>
            <a className="song__title" href={`#song_${song.id}`}>
              {song.title} - {song.artist}
            </a>
            <div className="song__content" id={`song_${song.id}`}>
              {song.tutorials.map((tutorial) => (
                <Tutorial key={tutorial.id} data={tutorial} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Lyrics;
