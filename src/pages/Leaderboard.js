import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LeaderboardTable from '../components/LeaderboardTable';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const levelId = useParams().levelId;
  const [scores, setScores] = useState(null);

  useEffect(() => {
    const getScores = async (levelId) => {
      const docRef = doc(db, 'scores', levelId);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      const scores = Object.values(data);
      setScores(scores);
    };

    getScores(levelId);
  }, [levelId]);

  return (
    <>
      <NavBar>
        <Link to="/" className="primary-btn">
          Go home
        </Link>
      </NavBar>

      <div className="Leaderboard">
        <h1>
          Leaderboard
          <br />
          Beach level
        </h1>

        {scores && <LeaderboardTable scores={scores} />}
      </div>

      <Footer />
    </>
  );
};

export default Leaderboard;
