import { useState } from 'react';
import '../styles/GameOverMessage.css';

const GameOverMessage = ({ seconds, getTime }) => {
  const [username, setUsername] = useState('');

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const getFormattedTime = (seconds) => {
    const time = getTime(seconds);
    const convert = (unit) =>
      unit.value + ' ' + (unit.value > 1 ? unit.name : unit.name.slice(0, -1));
    const converted = time
      .filter((unit) => unit.value !== 0)
      .map((unit) => convert(unit));
    if (converted.length === 1) return converted.toString();
    return converted
      .slice(0, -1)
      .join(', ')
      .concat(' and ', converted.slice(-1));
  };

  return (
    <div className="GameOverMessage">
      <h1>Congratulations!</h1>

      <p>
        You completed this level by finding all characters is{' '}
        <span className="underlined">{getFormattedTime(seconds)}</span>.
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
