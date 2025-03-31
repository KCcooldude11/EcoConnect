import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import DonationsPage from './Pages/DonationsPage';
import MapPage from './Pages/MapPage';
import MapTestPage from './Pages/MapTestPage';



function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/maptest" element={<MapTestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
