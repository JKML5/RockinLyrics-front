import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Lyrics from './pages/Lyrics';
import Tutorials from './pages/Tutorials';
import Error from './pages/Error';
import './css/reset.css';
import './css/style.css';

function App() {
  return (
    <>
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
