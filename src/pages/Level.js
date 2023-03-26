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
  const params = useParams();

  // level info

  const [imageUrl, setImageUrl] = useState('');
  const [characters, setCharacters] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const getLevelData = async (levelId) => {
    const docRef = doc(db, 'levels', levelId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.error('Cannot find level');
    } else {
      const data = docSnap.data();
      return data;
    }
  };

  useEffect(() => {
    (async () => {
      const levelData = await getLevelData(params.levelId);
      const imageUrl = levelData.imageUrl.medium;
      const characters = levelData.characters.map((c) => ({
        name: c.name,
        avatarUrl: c.avatarUrl,
        isFound: false,
      }));

      setImageUrl(imageUrl);
      setCharacters(characters);

      startTimer();
    })();
  }, [params]);

  // timer

  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const startTimer = () => setIsTimerRunning(true);
  const stopTimer = () => setIsTimerRunning(false);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // context menu

  const [currentClickEvent, setCurrentClickEvent] = useState(null);
  const [isCtxMenuOpen, setIsCtxMenuOpen] = useState(false);

  const openCtxMenu = () => setIsCtxMenuOpen(true);
  const closeCtxMenu = () => setIsCtxMenuOpen(false);

  const handleSelectCharacter = async (characterName) => {
    let updatedCharacters = [...characters];

    let clickPosition = {
      x: currentClickEvent.pageX - currentClickEvent.target.offsetLeft,
      y: currentClickEvent.pageY - currentClickEvent.target.offsetTop,
    };

    // check if character is present at current click position
    const isHere = await checkIfCharacterAtPosition(
      characterName,
      clickPosition
    );

    if (isHere) {
      const character = updatedCharacters.find((c) => c.name === characterName);
      character.isFound = true;
      setCharacters(updatedCharacters);
    }

    // check if game is over
    const isGameOver = checkIfGameOver(updatedCharacters);

    if (isGameOver) {
      handleGameOver();
    }

    displayFeedbackMessage(isHere);
    closeCtxMenu();
  };

  const checkIfCharacterAtPosition = async (characterName, position) => {
    const levelData = await getLevelData(params.levelId);
    const characters = levelData.characters;
    const character = characters.find((c) => c.name === characterName);

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

  const checkIfGameOver = (characters) => {
    const isGameOver = characters.every((c) => c.isFound === true);
    return isGameOver;
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    stopTimer();
  };

  // puzzle image

  const handlePuzzleImageClick = (event) => {
    if (!isCtxMenuOpen) {
      setCurrentClickEvent(event);
      openCtxMenu();
    } else {
      closeCtxMenu();
    }
  };

  // feedback message

  const [currentFeedbackMessage, setCurrentFeedbackMessage] = useState(null);

  const displayFeedbackMessage = (isCorrect) => {
    const elem = <FeedbackMessage isCorrect={isCorrect} key={Math.random()} />;
    setCurrentFeedbackMessage(elem);
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      setCurrentFeedbackMessage(null);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [currentFeedbackMessage]);

  return (
    <>
      <NavBar>
        <Timer seconds={seconds} />
      </NavBar>

      <div>
        {currentFeedbackMessage}

        {characters && <CharactersList characters={characters} />}

        {isCtxMenuOpen && (
          <ContextMenu
            characters={characters}
            clickEvent={currentClickEvent}
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
