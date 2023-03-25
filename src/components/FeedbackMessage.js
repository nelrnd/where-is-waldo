import '../styles/FeedbackMessage.css';

const FeedbackMessage = ({ isCorrect }) => {
  return (
    <div className="FeedbackMessage">
      {isCorrect && 'Correct ✅'}
      {!isCorrect && 'Incorrect ❌'}
    </div>
  );
};

export default FeedbackMessage;
