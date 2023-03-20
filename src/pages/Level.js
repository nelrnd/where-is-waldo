import CharactersList from '../components/CharactersList';

import WaldoAvatar from '../assets/images/characters/waldo.png';
import WendaAvatar from '../assets/images/characters/wenda.png';
import WizardAvatar from '../assets/images/characters/wizard.png';
import WoofAvatar from '../assets/images/characters/woof.png';
import OdlawAvatar from '../assets/images/characters/odlaw.png';

const characters = [
  { name: 'Waldo', avatarUrl: WaldoAvatar, found: true },
  { name: 'Wenda', avatarUrl: WendaAvatar, found: false },
  { name: 'Wizard', avatarUrl: WizardAvatar, found: true },
  { name: 'Woof', avatarUrl: WoofAvatar, found: false },
  { name: 'Odlaw', avatarUrl: OdlawAvatar, found: false },
];

const Level = () => {
  return (
    <div>
      <CharactersList characters={characters} />
    </div>
  );
};

export default Level;
