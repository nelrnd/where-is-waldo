import { useState } from 'react';
import { getLongFormatTime } from '../utils';
import '../styles/GameOverMessage.css';

const GameOverMessage = ({ seconds }) => {
  const [username, setUsername] = useState('');

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="GameOverMessage">
      <h1>Congratulations!</h1>

      <p>
        You completed this level by finding all characters is{' '}
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

      <button className="GameOverMessage_secondary-btn">Go home</button>
    </div>
  );
};

export default GameOverMessage;
