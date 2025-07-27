//component imports
import CombatArena from ".//CombatComponent"
//model imports
import {/* Character,*/ Hero, Rat } from "../Models/CharacterModel";
//react imports
import { useState } from "react";
//stylesheet imports
import '../StyleSheets/GameStyle.css';

function Game() {
    const [active, setActive] = useState("MainMenu");
    const [hero, setHero] = useState(new Hero("Hero"));
    const [gameLog, setGameLog] = useState<string[]>(["Welcome to Coding RPG"]);

    const handleCreateCharacter = () => {
        const inputElement = document.getElementById('name-input') as HTMLInputElement;
        hero.name = inputElement.value;
        console.log(hero.name)
        if (hero.name !== "") {
            setHero(hero);
            setGameLog(prevLog => [...prevLog, `Hello, ${hero.name}`]);
            setActive("Game");
        }
        else {
            setGameLog(prevLog => [...prevLog, `Please name your Character`]);
        }
    }

    const handleCombat = () => {
        setActive("Combat")
    }
    const handleCombatEnd = (result: 'victory' | 'defeat' | 'run' | 'exit', updatedHero: Hero) => {
        setActive("Game");
        setHero(updatedHero);
        if (result === 'victory') {
            setGameLog(prevLog => [...prevLog, `${updatedHero.name} is victorious!`]);
        } else if (result === 'defeat') {
            setGameLog(prevLog => [...prevLog, `${updatedHero.name} is defeated!`]);
        } else if (result === 'run') {
            setGameLog(prevLog => [...prevLog, `${updatedHero.name} manages to escape...`]);
        }
    };
    const handleUpdateHeroInGame = (updatedHero: Hero) => {
        setHero(updatedHero);
    };
    return (
        <div id="game"><div className="game-screen">
            {active === "Combat" ? <div>
                <CombatArena hero={hero} enemy={new Rat("Rat")} onCombatEnd={handleCombatEnd}
                    onUpdateHero={handleUpdateHeroInGame}></CombatArena>

            </div> : <div></div>}
            {active === "Game" ? <div>
                <div className="player-info">
                    <span>{hero.name} - Level {hero.level}</span>
                </div>
                <div className="hud">
                    <div className="hud-options">
                        <button className='hud-button' onClick={() => handleCombat()}>Combat Test</button>
                        <button className='hud-button' onClick={() => setActive("MainMenu")}>Main Menu</button>
                    </div>
                </div>
                <div id="game-content"></div>
            </div> : <div></div>}
            {active === "LoadGame" ? <div className="menu">
                <h2>Saves</h2>
                <button className='menu-button' onClick={() => setActive("MainMenu")}>Back</button>
            </div> : <div></div>}
            {active === "MainMenu" ? <div className="menu" id="main-menu">
                <h2>Main Menu</h2>
                <button className='menu-button' onClick={() => setActive("Game")}>Continue</button>
                <button className='menu-button' onClick={() => setActive("NewGame")}>New Game</button>
                <button className='menu-button' onClick={() => setActive("LoadGame")}>Load Game</button>
                <button className='menu-button' onClick={() => setActive("Settings")}>Settings</button>
                <button className='menu-button'>Exit Game</button>
            </div> : <div></div>}
            {active === "NewGame" ? <div className="char-creation">
                <h2>Character Creation</h2>
                <div>
                    <label htmlFor="name-input">Select Character Name: <input id="name-input" ></input></label>
                </div>
                <div>
                    <button className="menu-button" onClick={() => handleCreateCharacter()}>Create Character</button>
                    <button className='menu-button' onClick={() => setActive("MainMenu")}>Back</button>
                </div>
            </div> : <div></div>}
            {active === "Settings" ? <div className="char-creation">
                <h2>Settings</h2>
                <button className='menu-button' onClick={() => setActive("MainMenu")}>Back</button>
            </div> : <div></div>}
          
        </div>
          {active !== "Combat" ?  < div className="game-log">
            <h3>Log</h3>
            {gameLog.map((log, index) => (
                <p key={index}>{log}</p>
            ))}
            </div> : <div></div>}
        </div>
    );
}

export default Game;