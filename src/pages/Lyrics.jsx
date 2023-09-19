import React from 'react';
import songs from '../data/songs';
import playButton from '../assets/play.svg';
import driveButton from '../assets/drive.png';
// import lyricsButton from '../assets/text.png';

function Lyrics() {
  return (
    <section className="section">
      <h1 className="section__title">Tutoriels</h1>
      <ul className="songs">
        {songs.map((song) => (
          <li className="song">
            <a className="song__title" href={`#song_${song.id}`}>
              {song.title} - {song.artist}
            </a>
            <div className="song__content" id={`song_${song.id}`}>
              {song.tutorials.map((tutorial) => (
                <div className={`tutorial ${tutorial.icon}`} id={tutorial.id}>
                  <div className="tutorial__heading">
                    {tutorial.title}
                    <div className="tutorial__heading_buttons">
                      <button type="button" className="btn-play-tutorial">
                        <img
                          src={playButton}
                          alt="Jouer"
                          className="tutorial__heading__icon tutorial__heading__icon--play"
                        />
                      </button>
                      <button
                        type="button"
                        href="https://drive.google.com/file/d/1W5aEQezoKCQ766x4ULXc7oKyxoMoWrcB/view?usp=sharing"
                        className="btn-download-tutorial"
                      >
                        <img
                          src={driveButton}
                          alt="Drive"
                          className="tutorial__heading__icon tutorial__heading__icon--download"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Lyrics;
