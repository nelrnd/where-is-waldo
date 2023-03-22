import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Level from './pages/Level';
import './styles/App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/level/:levelid" element={<Level />} />
          <Route path="/leaderboard/:levelid" element={<Leaderboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
