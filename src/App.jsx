import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import themes from './assets/styles/theme';
import Home from './components/pages/Home';
import Error from './components/pages/Error';
import Header from './components/layouts/Header';
import PlyrComponent from './components/sections/PlyrComponent';
import AdminHeader from './components/layouts/AdminHeader';
import AdminSong from './components/pages/AdminSong';
import AdminTutorialForm from './components/pages/admin/TutorialForm';
import AdminConcert from './components/pages/admin/Concert';
import AdminConcertForm from './components/pages/admin/ConcertForm';
import AdminSongForm from './components/pages/AdminSongForm';
import Container from './components/layouts/Main';
import { GlobalStyle } from './assets/styles/GlobalStyle';

const App = () => {
  const theme = useSelector((state) => state.theme);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin/');

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle isAdmin={isAdmin} />
      {isAdmin ? <AdminHeader /> : <Header />}
      <Container>
        <Routes>
          <Route path="/:slug?" element={<Home />} />

          <Route path="/admin/song" element={<AdminSong />} />
          <Route path="/admin/concert" element={<AdminConcert />} />
          <Route
            path="/admin/song/:songId/add"
            element={<AdminTutorialForm />}
          />
          <Route
            path="/admin/song/:songId/:tutorialId/edit"
            element={<AdminTutorialForm />}
          />
          <Route path="/admin/song/add" element={<AdminSongForm />} />
          <Route path="/admin/song/edit/:songId" element={<AdminSongForm />} />
          <Route path="/admin/concert/add" element={<AdminConcertForm />} />
          <Route
            path="/admin/concert/edit/:concertId"
            element={<AdminConcertForm />}
          />

          <Route path="/*" element={<Error />} />
        </Routes>
        <PlyrComponent />
      </Container>
    </ThemeProvider>
  );
};

export default App;
