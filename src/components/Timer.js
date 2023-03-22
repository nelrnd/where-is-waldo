import { getShortFormatTime } from '../utils';
import '../styles/Timer.css';

const Timer = ({ seconds }) => {
  return <div className="Timer">{getShortFormatTime(seconds)}</div>;
};

export default Timer;
