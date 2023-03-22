import { Link } from 'react-router-dom';
import '../styles/LevelCard.css';

const LevelCard = ({ title, imageUrl, id }) => {
  return (
    <Link to={`/level/${id}`}>
      <div className="LevelCard">
        <div
          className="LevelCard_img-wrapper"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <h2 className="LevelCard_title">{title}</h2>
      </div>
    </Link>
  );
};

export default LevelCard;
