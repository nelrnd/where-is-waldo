import { getShortFormatTime } from '../utils';

const LeaderboardTable = ({ scores }) => {
  return (
    <table className="LeaderboardTable">
      <thead>
        <tr>
          <th></th>
          <th>Username</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {scores
          .sort((a, b) => a.seconds - b.seconds)
          .map((item, index) => (
            <LeaderboardTableRow
              key={index}
              index={index}
              username={item.username}
              seconds={item.seconds}
              date={item.date}
            />
          ))}
      </tbody>
    </table>
  );
};

const LeaderboardTableRow = ({ index, username, seconds, date }) => {
  let position;
  if (index === 0) {
    position = '🏆';
  } else if (index === 1) {
    position = '🥈';
  } else if (index === 2) {
    position = '🥉';
  } else {
    position = index + 1 + '.';
  }

  return (
    <tr>
      <td>{position}</td>
      <td>{username}</td>
      <td>{getShortFormatTime(seconds)}</td>
      <td>{new Date(date).toLocaleDateString()}</td>
    </tr>
  );
};

export default LeaderboardTable;
