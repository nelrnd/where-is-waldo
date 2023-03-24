import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getLongFormatTime } from '../utils';
import '../styles/GameOverMessage.css';

const GameOverMessage = ({ seconds }) => {
  const levelId = useParams().levelId;
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const objName = username + '-' + Date.now();
    const obj = { username, seconds, date: Date.now() };

    const docRef = doc(db, 'scores', levelId);

    await updateDoc(docRef, {
      [objName]: obj,
    });

    navigate(`/leaderboard/${levelId}`);
  };

  return (
    <div className="GameOverMessage">
      <h1>Congratulations!</h1>

      <p>
        You completed this level by finding all characters in{' '}
        <span className="underlined">{getLongFormatTime(seconds)}</span>.
      </p>

      <p>
        Save your score to the global leader board and see other players score:
      </p>

      <form action="#" onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <button type="submit" className="GameOverMessage_primary-btn">
          Submit
        </button>
      </form>

      <div className="separator-bar"></div>

      <Link to="/" className="GameOverMessage_secondary-btn">
        Go home
      </Link>
    </div>
  );
};

export default GameOverMessage;
