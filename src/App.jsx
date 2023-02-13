import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Lyrics from './pages/Lyrics';
import Error from './pages/Error';
import './css/style.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Lyrics />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
