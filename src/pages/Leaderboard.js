import LeaderboardTable from '../components/LeaderboardTable';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  return (
    <div className="Leaderboard">
      <h1>
        Leaderboard
        <br />
        Beach level
      </h1>

      <LeaderboardTable />
    </div>
  );
};

export default Leaderboard;
