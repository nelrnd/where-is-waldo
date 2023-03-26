import { useLayoutEffect, useRef } from 'react';
import '../styles/ContextMenu.css';

const ContextMenu = ({ characters, clickEvent, handleSelect }) => {
  const ref = useRef(null);

  let position = {
    x: clickEvent.pageX,
    y: clickEvent.pageY,
  };

  useLayoutEffect(() => {
    const CtxMenuDims = {
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    };
    const windowDims = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    if (clickEvent.clientX + CtxMenuDims.width > windowDims.width) {
      ref.current.style.left = clickEvent.pageX - CtxMenuDims.width + 'px';
    }
    if (clickEvent.clientY + CtxMenuDims.height > windowDims.height) {
      ref.current.style.top = clickEvent.pageY - CtxMenuDims.height + 'px';
    }
  }, [clickEvent]);

  return (
    <div
      className="ContextMenu"
      style={{ top: position.y + 'px', left: position.x + 'px' }}
      ref={ref}
    >
      <ul>
        {characters.map((character, index) => (
          <ContextMenuOption
            key={index}
            name={character.name}
            avatarUrl={character.avatarUrl}
            isFound={character.isFound}
            handleSelect={handleSelect}
          />
        ))}
      </ul>
    </div>
  );
};

const ContextMenuOption = ({ name, avatarUrl, isFound, handleSelect }) => {
  return (
    <li
      className={'ContextMenuOption' + (isFound ? ' found' : '')}
      onClick={!isFound ? () => handleSelect(name) : null}
    >
      <img src={avatarUrl} alt={name} className="ContextMenuOption_avatar" />
      <p className="ContextMenuOption_name">{name}</p>
    </li>
  );
};

export default ContextMenu;
