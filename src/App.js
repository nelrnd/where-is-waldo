import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Level from './pages/Level';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Level />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
