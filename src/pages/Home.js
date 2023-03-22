import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LevelsGrid from '../components/LevelsGrid';
import LevelCard from '../components/LevelCard';
import '../styles/Home.css';

const Home = () => {
  return (
    <>
      <NavBar />

      <div className="Home">
        <h1>Select your level:</h1>
        <LevelsGrid>
          <LevelCard
            title="Mountain"
            imageUrl="https://wallpapers.com/images/hd/where-s-waldo-snow-mountain-jfcrg87pmobfoauq.jpg"
          />
          <LevelCard
            title="Stadius"
            imageUrl="https://www.podiumrunner.com/wp-content/uploads/2018/04/Waldo.png"
          />
          <LevelCard
            title="Space"
            imageUrl="https://astrobites.org/wp-content/uploads/2020/05/waldo-1024x719.jpg"
          />
          <LevelCard
            title="Beach"
            imageUrl="https://i.pinimg.com/originals/24/c1/b0/24c1b065c17d4c4bf8d5bc725234988f.jpg"
          />
        </LevelsGrid>
      </div>

      <Footer />
    </>
  );
};

export default Home;
