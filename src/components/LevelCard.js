import '../styles/LevelCard.css';

const LevelCard = ({ title, imageUrl }) => {
  return (
    <div className="LevelCard">
      <div
        className="LevelCard_img-wrapper"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <h2 className="LevelCard_title">{title}</h2>
    </div>
  );
};

export default LevelCard;
