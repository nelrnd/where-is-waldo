import { useState } from 'react';
import '../styles/CharactersList.css';
import ExpandIcon from '../assets/icons/expand.svg';

const CharactersList = ({ characters }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => setIsExpanded((isExpanded) => !isExpanded);

  return (
    <aside className={'CharactersList' + (isExpanded ? ' expanded' : '')}>
      <ul>
        {characters.map((character, index) => (
          <CharacterItem
            key={index}
            name={character.name}
            avatarUrl={character.avatarUrl}
            found={character.found}
          />
        ))}
      </ul>

      <button onClick={toggleExpanded} className="CharactersList_expand-btn">
        <img
          src={ExpandIcon}
          alt="Expand"
          className="CharactersList_expand-icon"
        />
      </button>
    </aside>
  );
};

const CharacterItem = ({ name, avatarUrl, found }) => {
  return (
    <li className={'CharacterItem' + (found ? ' found' : '')}>
      <img src={avatarUrl} alt={name} className="CharacterItem_avatar" />
      <p className="CharacterItem_name">{name}</p>
    </li>
  );
};

export default CharactersList;
