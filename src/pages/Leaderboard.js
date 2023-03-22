import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LeaderboardTable from '../components/LeaderboardTable';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
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

        <LeaderboardTable />
      </div>

      <Footer />
    </>
  );
};

export default Leaderboard;
