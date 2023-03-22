import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Leaderboard />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
