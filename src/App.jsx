import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import QuizLyrics from './pages/QuizLyrics';
import FormTutorial from './pages/admin/FormTutorial';
import Tutorials from './pages/Tutorials';
import Song from './pages/admin/Song';
import Error from './pages/Error';
import songs from './data/songs-festirock2';
import { addLyrics, addTitlesMongoDB } from './store';
import './css/reset.css';

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
  background-color: ${({ theme }) =>
    theme === 'light' ? '#FFFFFF' : '#000000'};

  @media screen and (min-width: 984px) { /* 1024 - padding 40 */
  background-image: ${({ theme }) =>
    theme === 'light'
      ? '#FFFFFF'
      : 'linear-gradient(to right, #181818, #000000, #181818)'};
  }
}
`;

function App() {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme);

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
              .catch((error) => console.error(error)),
          );
        }
      });
    });

    // Chargement des titres depuis MongoDB
    fetch(`http://localhost:3000/api/songs`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(addTitlesMongoDB(data));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <GlobalStyle theme={theme} />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Tutorials />} />
          <Route path="/lyrics/:id" element={<QuizLyrics />} />
          <Route path="/admin/song" element={<Song />} />
          <Route path="/admin/song/:id/add" element={<FormTutorial />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
