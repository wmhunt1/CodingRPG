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
    const [text, setText] = useState("Welcome to Coding RPG")
    //const [enemy, setEnemy] = useState<Character>(new Character)

    const handleCreateCharacter = () => {
        const inputElement = document.getElementById('name-input') as HTMLInputElement;
        hero.name = inputElement.value;
        if (hero.name !== "") {
            setHero(hero);
            setActive("Game");
            setText(`Hello, ${hero.name}`)
        }
        else {
            setText("Please name your character")
        }
    }

    const handleCombat = () => {
        setActive("Combat")
    }
        const handleCombatEnd = (result: 'victory' | 'defeat' | 'run'|'exit', updatedHero: Hero) => {
            setActive("Game"); 
            setHero(updatedHero); 
            if (result === 'victory') {
                setText(`${updatedHero.name} is victorious!`);
            } else if (result === 'defeat') {
                setText(`${updatedHero.name} is defeated!`);
            } else if (result === 'run') {
                setText(`${updatedHero.name} managed to escape!`);
            }
        };
    const handleUpdateHeroInGame = (updatedHero: Hero) => {
         setHero(updatedHero);
        };
    return (
        <div id="game">
            {active === "Combat" ? <div>
                <CombatArena hero={hero} enemy={new Rat("Rat")} onCombatEnd={handleCombatEnd}
                    onUpdateHero={handleUpdateHeroInGame}></CombatArena>
              
            </div> : <div></div>}
            {active === "Game" ? <div>
                <div>
                    <span>{hero.name} - Level {hero.level}</span>
                </div>
                <button className='menu-button' onClick={() => handleCombat()}>Combat Test</button>
                <button className='menu-button' onClick={() => setActive("MainMenu")}>Main Menu</button>
            </div> : <div></div>}
            {active === "LoadGame" ? <div>
                <h2>Saves</h2>
                <button className='menu-button' onClick={() => setActive("MainMenu")}>Back</button>
            </div> : <div></div>}
            {active === "MainMenu" ? <div id="main-menu">
                <h2>Main Menu</h2>
                <button className='menu-button' onClick={() => setActive("Game")}>Continue</button>
                <button className='menu-button' onClick={() => setActive("NewGame")}>New Game</button>
                <button className='menu-button' onClick={() => setActive("LoadGame")}>Load Game</button>
                <button className='menu-button' onClick={() => setActive("Settings")}>Settings</button>
                <button className='menu-button'>Exit Game</button>
            </div> : <div></div>}
            {active === "NewGame" ? <div>
                <h2>Character Creation</h2>
                <div>
                    <label htmlFor="name-input">Select Character Name: <input id="name-input" ></input></label>
                    <button onClick={() => handleCreateCharacter()}>Create Character</button>
                </div>
                <div>
                    <button className='menu-button' onClick={() => setActive("MainMenu")}>Back</button>
                </div>
            </div> : <div></div>}
            {active === "Settings" ? <div>
                <h2>Settings</h2>
                <button className='menu-button' onClick={() => setActive("MainMenu")}>Back</button>
            </div> : <div></div>}
            <div id="text">{text}</div>
        </div>
    );
}

export default Game;