import { useState } from 'react';
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
import WoofAvatar from '../assets/images/characters/woof.png';
import OdlawAvatar from '../assets/images/characters/odlaw.png';

import SpaceImg from '../assets/images/space.jpg';

const characters = [
  { name: 'Waldo', avatarUrl: WaldoAvatar, found: true },
  { name: 'Wenda', avatarUrl: WendaAvatar, found: false },
  { name: 'Wizard', avatarUrl: WizardAvatar, found: true },
  { name: 'Woof', avatarUrl: WoofAvatar, found: false },
  { name: 'Odlaw', avatarUrl: OdlawAvatar, found: false },
];

const Level = () => {
  // Position and state of context menu
  const [ctxMenuPos, setCtxMenuPos] = useState({ x: 0, y: 0 });
  const [isCtxMenuOpen, setIsCtxMenuOpen] = useState(false);

  // Toggle context menu state (open and close)
  const toggleCtxMenu = () => setIsCtxMenuOpen(!isCtxMenuOpen);

  // Handle clicking on puzzle image
  const handlePuzzleImageClick = (event) => {
    if (!isCtxMenuOpen) {
      setCtxMenuPos({ x: event.pageX + 5, y: event.pageY + 5 });
    }
    toggleCtxMenu();
  };

  // Get hours, minutes, and seconds from seconds
  const getTime = (seconds) => {
    const units = [
      { name: 'hours', nbOfSeconds: 3600, value: 0 },
      { name: 'minutes', nbOfSeconds: 60, value: 0 },
    ];

    units.forEach((unit) => {
      while (seconds >= unit.nbOfSeconds) {
        unit.value++;
        seconds -= unit.nbOfSeconds;
      }
    });

    return [
      ...units.map((u) => ({ name: u.name, value: u.value })),
      { name: 'seconds', value: seconds },
    ];
  };

  return (
    <>
      <NavBar>
        <Timer />
      </NavBar>

      <div>
        <Timer />
        <GameOverMessage seconds={3670} getTime={getTime} />
        <CharactersList characters={characters} />
        <ContextMenu
          isOpen={isCtxMenuOpen}
          position={ctxMenuPos}
          characters={characters}
        />
        <PuzzleImage imageUrl={SpaceImg} handleClick={handlePuzzleImageClick} />
      </div>

      <Footer />
    </>
  );
};

export default Level;
