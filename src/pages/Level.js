import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PuzzleImage from '../components/PuzzleImage';
import ContextMenu from '../components/ContextMenu';
import CharactersList from '../components/CharactersList';
import Timer from '../components/Timer';
import GameOverMessage from '../components/GameOverMessage';
import FeedbackMessage from '../components/FeedbackMessage';

const Level = () => {
  const levelId = useParams().levelId;
  const [imageUrl, setImageUrl] = useState('');
  const [characters, setCharacters] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const [isCtxMenuOpen, setIsCtxMenuOpen] = useState(false);
  const [ctxMenuPos, setCtxMenuPos] = useState({ x: 0, y: 0 });

  const [currentFeedbackMessage, setCurrentFeedbackMessage] = useState(null);

  const startTimer = () => setIsTimerRunning(true);
  const stopTimer = () => setIsTimerRunning(false);

  const getClickPos = (event) => {
    const x = event.pageX - event.target.offsetLeft;
    const y = event.pageY - event.target.offsetTop;
    setClickPos({ x, y });
  };

  const updateCtxMenuPos = (newPos) => {
    setCtxMenuPos(newPos);
  };

  const openCtxMenu = () => setIsCtxMenuOpen(true);
  const closeCtxMenu = () => setIsCtxMenuOpen(false);

  const handlePuzzleImageClick = (event) => {
    if (!isCtxMenuOpen) {
      getClickPos(event);
      openCtxMenu();
      setCtxMenuPos({ x: event.pageX, y: event.pageY });
    } else {
      closeCtxMenu();
    }
  };

  const handleSelectCharacter = async (character) => {
    const isHere = await checkIfHere(character, clickPos);

    if (isHere) {
      characters.find((c) => c.name === character).found = true;
      const isGameOver = checkIfGameOver();

      if (isGameOver) {
        handleGameOver();
      }
    }

    displayFeedbackMessage(isHere);
    closeCtxMenu();
  };

  const displayFeedbackMessage = (isCorrect) => {
    let elem = <FeedbackMessage isCorrect={isCorrect} key={Math.random()} />;
    setCurrentFeedbackMessage(elem);
  };

  // Remove feedback message after 1.5 seconds
  useEffect(() => {
    let feedbackTimer = setTimeout(() => {
      setCurrentFeedbackMessage(null);
    }, 1500);

    return () => clearTimeout(feedbackTimer);
  }, [currentFeedbackMessage]);

  // Check if character is at position
  const checkIfHere = async (name, position) => {
    const docRef = doc(db, 'levels', levelId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.error('Cannot find level');
      return;
    }
    const data = docSnap.data();
    const characters = data.characters;
    const character = characters.find((c) => c.name === name);

    if (
      position.x > character.position.left &&
      position.x < character.position.left + character.position.width &&
      position.y > character.position.top &&
      position.y < character.position.top + character.position.height
    ) {
      return true;
    }
    return false;
  };

  // Check if all characters has been found
  const checkIfGameOver = () => {
    return characters.every((character) => character.found === true);
  };

  const handleGameOver = () => {
    stopTimer();
    setIsGameOver(true);
  };

  // Get level info and start timer when page mounts
  useEffect(() => {
    const getLevelInfo = async (levelId) => {
      const docRef = doc(db, 'levels', levelId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.error('Cannot find level');
        return;
      }
      const data = docSnap.data();
      setImageUrl(data.imageUrl.medium);
      setCharacters(
        data.characters.map((c) => ({
          name: c.name,
          avatarUrl: c.avatarUrl,
          found: false,
        }))
      );
      startTimer();
    };

    getLevelInfo(levelId);
  }, [levelId]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  return (
    <>
      <NavBar>
        <Timer seconds={seconds} />
      </NavBar>

      <div>
        {currentFeedbackMessage}

        {characters && <CharactersList characters={characters} />}

        {characters && (
          <ContextMenu
            isOpen={isCtxMenuOpen}
            position={ctxMenuPos}
            updatePosition={updateCtxMenuPos}
            characters={characters}
            handleSelect={handleSelectCharacter}
          />
        )}

        {imageUrl && (
          <PuzzleImage
            imageUrl={imageUrl}
            handleClick={handlePuzzleImageClick}
          />
        )}

        {isGameOver && <GameOverMessage seconds={seconds} />}
      </div>

      <Footer />
    </>
  );
};

export default Level;
