import { useState } from 'react';
import CharactersList from '../components/CharactersList';
import ContextMenu from '../components/ContextMenu';
import PuzzleImage from '../components/PuzzleImage';
import Timer from '../components/Timer';

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
  const [ctxMenuPos, setCtxMenuPos] = useState({ x: 0, y: 0 });
  const [isCtxMenuOpen, setIsCtxMenuOpen] = useState(false);

  const toggleCtxMenu = () => setIsCtxMenuOpen(!isCtxMenuOpen);

  const handlePuzzleImageClick = (event) => {
    if (!isCtxMenuOpen) {
      setCtxMenuPos({ x: event.pageX + 5, y: event.pageY + 5 });
    }
    toggleCtxMenu();
  };

  return (
    <div>
      <Timer />
      <CharactersList characters={characters} />
      <ContextMenu
        isOpen={isCtxMenuOpen}
        position={ctxMenuPos}
        characters={characters}
      />
      <PuzzleImage imageUrl={SpaceImg} handleClick={handlePuzzleImageClick} />
    </div>
  );
};

export default Level;
