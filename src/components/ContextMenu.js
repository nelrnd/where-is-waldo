import { useEffect, useState } from 'react';
import '../styles/ContextMenu.css';

const ContextMenu = ({ isOpen, position, characters }) => {
  const [animation, setAnimation] = useState('');
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const opening = async () => {
      setIsHidden(false);
      setAnimation('opening');
      await new Promise((r) => setTimeout(r, 300));
      setAnimation('');
    };

    const closing = async () => {
      setAnimation('closing');
      await new Promise((r) => setTimeout(r, 300));
      setIsHidden(true);
      setAnimation('');
    };

    if (isOpen) {
      opening();
    } else {
      closing();
    }
  }, [isOpen]);

  return (
    <div
      className={`ContextMenu ${isHidden ? 'hidden' : ''} ${animation}`}
      style={{ left: position.x + 'px', top: position.y + 'px' }}
    >
      <ul>
        {characters.map((character, index) => (
          <ContextOption
            key={index}
            name={character.name}
            avatarUrl={character.avatarUrl}
            found={character.found}
          />
        ))}
      </ul>
    </div>
  );
};

const ContextOption = ({ name, avatarUrl, found }) => {
  return (
    <li className={'ContextOption' + (found ? ' found' : '')}>
      <img src={avatarUrl} alt={name} className="ContextOption_avatar" />
      <p className="ContextOption_name">{name}</p>
    </li>
  );
};

export default ContextMenu;
