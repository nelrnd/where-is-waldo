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

import WaldoAvatar from '../assets/images/characters/waldo.png';
import WendaAvatar from '../assets/images/characters/wenda.png';
import WizardAvatar from '../assets/images/characters/wizard.png';
import OdlawAvatar from '../assets/images/characters/odlaw.png';

const characters = [
  { name: 'Waldo', avatarUrl: WaldoAvatar, found: true },
  { name: 'Wenda', avatarUrl: WendaAvatar, found: false },
  { name: 'Wizard', avatarUrl: WizardAvatar, found: true },
  { name: 'Odlaw', avatarUrl: OdlawAvatar, found: false },
];

const Level = () => {
  const levelid = useParams().levelid;
  const [levelInfo, setLevelInfo] = useState({});

  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Position and state of context menu
  const [ctxMenuPos, setCtxMenuPos] = useState({ x: 0, y: 0 });
  const [isCtxMenuOpen, setIsCtxMenuOpen] = useState(false);

  // Get level info when page mounts
  useEffect(() => {
    const getLevelInfo = async (levelid) => {
      const docRef = doc(db, 'levels', levelid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const levelInfo = { title: data.title, imageUrl: data.imageUrl.medium };
        setLevelInfo(levelInfo);
      } else {
        console.error('Cannot find level');
      }
    };

    getLevelInfo(levelid);
  }, [levelid]);

  // Handle starting and stopping timer
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const stopTimer = () => setIsTimerRunning(false);

  // Toggle context menu state (open and close)
  const toggleCtxMenu = () => setIsCtxMenuOpen(!isCtxMenuOpen);

  // Handle clicking on puzzle image
  const handlePuzzleImageClick = (event) => {
    if (!isCtxMenuOpen) {
      setCtxMenuPos({ x: event.pageX + 5, y: event.pageY + 5 });
    }
    toggleCtxMenu();
    getClickPosition(event);
  };

  // Get click position on PuzzleImage
  const getClickPosition = (event) => {
    const x = event.pageX - event.target.offsetLeft;
    const y = event.pageY - event.target.offsetTop;
    return { x, y };
  };

  return (
    <>
      <NavBar>
        <Timer seconds={seconds} />
      </NavBar>

      <div>
        <CharactersList characters={characters} />
        <ContextMenu
          isOpen={isCtxMenuOpen}
          position={ctxMenuPos}
          characters={characters}
        />
        {levelInfo && levelInfo.imageUrl && (
          <PuzzleImage
            imageUrl={levelInfo.imageUrl}
            handleClick={handlePuzzleImageClick}
          />
        )}
      </div>

      <Footer />
    </>
  );
};

export default Level;
