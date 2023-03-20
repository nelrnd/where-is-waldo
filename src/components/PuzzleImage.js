import '../styles/PuzzleImage.css';

const PuzzleImage = ({ imageUrl }) => {
  return (
    <div className="PuzzleImage">
      <img src={imageUrl} alt="Landscape" />
    </div>
  );
};

export default PuzzleImage;
