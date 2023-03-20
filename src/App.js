import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
