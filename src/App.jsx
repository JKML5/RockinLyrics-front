import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Lyrics from './pages/Lyrics';
import Tutorials from './pages/Tutorials';
import Error from './pages/Error';
import songs from './data/songs-riv2';
import { addLyrics } from './store';
import './css/reset.css';

function App() {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme);

  const GlobalStyle = createGlobalStyle`
    * {
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }

    body {
      font-family: 'Roboto', sans-serif;
      font-size: 18px;
      line-height: 1.2;
      padding-bottom: 95px;
      background-color: ${() => (theme === 'light' ? '#FFFFFF' : '#000000')};

      @media screen and (min-width: 984px) { /* 1024 - padding 40 */
      background-image: ${() =>
        theme === 'light'
          ? '#FFFFFF'
          : 'linear-gradient(to right, #181818, #000000, #181818)'};
      }
    }
  `;

  // Chargement des paroles de chansons
  useEffect(() => {
    songs.forEach((song) => {
      song.tutorials.forEach((tutorial) => {
        if (tutorial.type === 'lyrics') {
          fetch(`./lyrics/${song.id}/${tutorial.id}.html`).then((response) =>
            response
              .text()
              .then((lyrics) => {
                dispatch(addLyrics(tutorial.id, lyrics));
              })
              .catch((error) => console.error(error))
          );
        }
      });
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Tutorials />} />
          <Route path="/lyrics/:id" element={<Lyrics />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
