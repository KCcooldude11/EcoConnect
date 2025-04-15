import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import DonationsPage from './Pages/DonationsPage';
import MapPage from './Pages/MapPage';
import MapTestPage from './Pages/MapTestPage';
import AuthPage from "./Pages/AuthPage";
import AccountPage from "./Pages/AccountPage";
import EventsPage from './Pages/EventsPage';


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
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
