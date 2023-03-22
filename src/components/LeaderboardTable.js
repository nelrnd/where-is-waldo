const data = [
  { username: 'EnZeSky', score: '00:03:21', date: '22/03/23' },
  { username: 'DaVinci', score: '00:05:15', date: '25/03/23' },
  { username: 'BelowC', score: '00:06:32', date: '22/03/23' },
  { username: 'Karnagi', score: '00:07:21', date: '22/03/23' },
];

const LeaderboardTable = () => {
  return (
    <table className="LeaderboardTable">
      <tr>
        <th></th>
        <th>Username</th>
        <th>Score</th>
        <th>Date</th>
      </tr>
      {data.map((item, index) => (
        <LeaderboardTableRow
          key={index}
          index={index}
          username={item.username}
          score={item.score}
          date={item.date}
        />
      ))}
    </table>
  );
};

const LeaderboardTableRow = ({ index, username, score, date }) => {
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
      <td>{score}</td>
      <td>{date}</td>
    </tr>
  );
};

export default LeaderboardTable;
