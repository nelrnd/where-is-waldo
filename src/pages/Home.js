import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LevelsGrid from '../components/LevelsGrid';
import LevelCard from '../components/LevelCard';
import '../styles/Home.css';

const Home = () => {
  const [levels, setLevels] = useState([]);

  // Fetch levels from database when page first mounts
  useEffect(() => {
    const getLevels = async () => {
      const levels = [];
      const docs = await getDocs(collection(db, 'levels'));
      docs.forEach((doc) => {
        const data = doc.data();
        const level = {
          title: data.title,
          imageUrl: data.imageUrl.small,
          id: doc.id,
        };
        levels.push(level);
      });
      setLevels(levels);
    };

    getLevels();
  }, []);

  return (
    <>
      <NavBar />

      <div className="Home">
        <h1>Select your level:</h1>
        <LevelsGrid>
          {levels.map((level, index) => (
            <LevelCard
              key={index}
              title={level.title}
              imageUrl={level.imageUrl}
              id={level.id}
            />
          ))}
        </LevelsGrid>
      </div>

      <Footer />
    </>
  );
};

export default Home;
