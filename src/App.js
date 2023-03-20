import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './styles/App.css';

// Temp
import LevelCard from './components/LevelCard';
import LevelsGrid from './components/LevelsGrid';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <LevelsGrid>
          <LevelCard
            title="Mountain"
            imageUrl="https://wallpapers.com/images/hd/where-s-waldo-snow-mountain-jfcrg87pmobfoauq.jpg"
          />
          <LevelCard
            title="Mountain"
            imageUrl="https://wallpapers.com/images/hd/where-s-waldo-snow-mountain-jfcrg87pmobfoauq.jpg"
          />
          <LevelCard
            title="Mountain"
            imageUrl="https://wallpapers.com/images/hd/where-s-waldo-snow-mountain-jfcrg87pmobfoauq.jpg"
          />
        </LevelsGrid>
      </main>
      <Footer />
    </div>
  );
}

export default App;
