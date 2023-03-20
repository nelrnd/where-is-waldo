import '../styles/ContextMenu.css';

const ContextMenu = ({ isOpen, characters }) => {
  return (
    <div className={'ContextMenu' + (!isOpen ? ' hidden' : '')}>
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
