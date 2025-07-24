//component imports
//model imports
import { Hero, Rat } from "../Models/CharacterModel";
//react imports
import { useState } from "react";
//stylesheet imports
import '../StyleSheets/GameStyle.css';

function GameComponent() {
    const [active, setActive] = useState("MainMenu");
    const [hero, setHero] = useState(new Hero("Hero"));
    const [text, setText] = useState("Welcome to Coding RPG")
    const [enemy, setEnemy] = useState(new Rat("Rat"))
    const [combat, setCombat] = useState(false)

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
        setCombat(true)
        setEnemy(new Rat("Rat"))
        setActive("Combat")
        setText(`${hero.name} VS ${enemy.name}`)
    }
    const handleCombatRound = () => {
        if (hero.currentHP > 0 && enemy.currentHP > 0) {
            console.log("combat round");
            hero.currentHP -= enemy.weapon.power;
            console.log(hero.currentHP)
            enemy.currentHP -= hero.weapon.power;
            console.log(enemy.currentHP)
            setHero(hero)
            setEnemy(enemy)
        }
        if (hero.currentHP <= 0 || enemy.currentHP <= 0)
        {
            setCombat(false)
            if (hero.currentHP > 0) {
                setText(`${hero.name} is victorious`)
            }
            else { setText(`${hero.name} is defeated`) }
        }
    }
    return (
        <div id="game">
            {active === "Combat" ? <div>
                <h2>Combat</h2>
                <div>
                    <h3>{hero.name}</h3>
                    <p><span>HP: {hero.currentHP}/{hero.maxHP}</span></p>
                </div>
                <div>
                    <h3>{enemy.name}</h3>
                    <p><span>HP: {enemy.currentHP}/{enemy.maxHP}</span></p>
                </div>
                {combat === true ?
                    <div>
                        <button className='menu-button' onClick={() => handleCombatRound()}>Attack</button>
                        <button className='menu-button' onClick={() => setActive("Game")}>Run</button>
                    </div> : <div>
                        <button className='menu-button' onClick={() => setActive("Game")}>Exit</button></div>}
            </div> : <div></div>}
            {active === "Game" ? <div>
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

export default GameComponent;