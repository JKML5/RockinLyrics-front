import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import QuizLyrics from './pages/QuizLyrics';
import FormTutorial from './pages/admin/FormTutorial';
import Home from './pages/Home';
import Song from './pages/admin/Song';
import Error from './pages/Error';
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
  background-color: ${({ theme }) =>
    theme === 'light'
      ? '#FFFFFF'
      : 'linear-gradient(to right, #181818, #000000, #181818)'};
  }
}
`;

function App() {
  const theme = useSelector((state) => state.theme);

  return (
    <>
      <GlobalStyle theme={theme} />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lyrics/:songId/:tutorialId" element={<QuizLyrics />} />
          <Route path="/admin/song" element={<Song />} />
          <Route path="/admin/song/:songId/add" element={<FormTutorial />} />
          <Route
            path="/admin/song/:songId/:tutorialId/edit"
            element={<FormTutorial />}
          />
          <Route path="/*" element={<Error />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
