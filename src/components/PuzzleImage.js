import '../styles/PuzzleImage.css';

const PuzzleImage = ({ imageUrl, handleClick }) => {
  return (
    <div className="PuzzleImage">
      <img src={imageUrl} alt="Landscape" onClick={handleClick} />
    </div>
  );
};

export default PuzzleImage;
