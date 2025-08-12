import '../StyleSheets/GameStyle.css';



import { Character } from "../Models/CharacterModel"
interface mainMenuProps {
    hero: Character;
    continueGame: () => void;
    newGame: () => void;
    loadGame: () => void;
    saveGame: (hero: Character) => void;
    settings: () => void;
    exitGame: () => void;
}
export function Menu() {
    return (
        <div>

        </div>
    );
}
export function MainMenu({ continueGame, exitGame, newGame, loadGame, saveGame, settings, hero }: mainMenuProps) {
    return (
        <div className="menu" id="main-menu">
            <h2>Main Menu</h2>
            <button className='menu-button' onClick={() => continueGame()}>Continue</button>
            <button className='menu-button' onClick={() => newGame()}>New Game</button>
            <button className='menu-button' onClick={() => loadGame()}>Load Game</button>
            <button className='menu-button' onClick={() => saveGame(hero)}>Save Game</button>
            <button className='menu-button' onClick={() => settings()}>Settings</button>
            <button className='menu-button' onClick={() => exitGame()}>Exit Game</button>
        </div>
    );
}