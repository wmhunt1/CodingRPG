import '../StyleSheets/GameStyle.css';



interface mainMenuProps {
    continueGame: () => void;
    newGame: () => void;
    loadGame: () => void;
    settings: () => void;
    exitGame: () => void
}
export function Menu() {
    return (
        <div>
          
  </div>
  );
}
export function MainMenu({ continueGame, newGame, loadGame, settings, exitGame }:mainMenuProps) { 
return (
    <div className="menu"  id="main-menu">
        <h2>Main Menu</h2>
        <button className='menu-button' onClick={() => continueGame()}>Continue</button>
        <button className='menu-button' onClick={() => newGame()}>New Game</button>
        <button className='menu-button' onClick={() => loadGame()}>Load Game</button>
        <button className='menu-button' onClick={() => settings()}>Settings</button>
        <button className='menu-button' onClick={() => exitGame()}>Exit Game</button>
    </div>
);
}