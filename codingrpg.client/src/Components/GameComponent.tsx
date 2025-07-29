// Game.tsx
//component imports
import CharacterSheet from ".//CharacterSheetComponent"
import CombatArena from ".//CombatComponent"
import CreateCharacter from ".//CreateCharacterComponent"
import { MainMenu } from ".//MenuComponent"
import Log from ".//LogComponent"; // <--- Import your new component here

//model imports
import { Character, Hero, Rat } from "../Models/CharacterModel";
//react imports
import { useState } from "react";
//stylesheet imports
import '../StyleSheets/GameStyle.css';


function Game() {
    const [active, setActive] = useState("MainMenu");
    const [hero, setHero] = useState(new Hero("Hero"));
    const [gameLog, setGameLog] = useState<string[]>(["Welcome to Coding RPG"]);
    const [party, setParty] = useState<Character[]>(() => [hero])

    const handleContinueGame = () => {
        setActive("Game")
    }

    const showCharacterSheet = () => {
        setActive("CharacterSheet")
    }
    const handleCombat = () => {
        setActive("Combat")
    }
    const handleExitGame = () => {
        console.log("Exiting Game")
    }
    const handleHeal = () => {
        const updatedHero = { ...hero };
        updatedHero.currentHP = updatedHero.maxHP;
        setHero(updatedHero)
        setGameLog(prevLog => [...prevLog, `Fully healed`]);
    }
    const handleLoadGame = () => {
        setActive("Load Game")
    }
    const handleNewGame = () => {
        setActive("NewGame")
    }
    const handleSettings = () => {
        setActive("Settings")
    }

    const handleShop = () => {
        //
    }
    const handleCombatEnd = (result: 'victory' | 'defeat' | 'run' | 'exit', updatedHeroes: Hero[]) => {
        setActive("Game");
        setHero(updatedHeroes[0]);
        setParty(updatedHeroes);
        if (result === 'victory') {
            setGameLog(prevLog => [...prevLog, `${hero.name} is victorious!`]);
        } else if (result === 'defeat') {
            setGameLog(prevLog => [...prevLog, `${hero.name} is defeated!`]);
        } else if (result === 'run') {
            setGameLog(prevLog => [...prevLog, `${hero.name} manages to escape...`]);
        }
    };
    const handleUpdateHeroes = (updatedHeroes: Hero[]) => {
        setParty(updatedHeroes);
        setHero(updatedHeroes[0])
    };
    return (
        <div id="game">
            <div className="game-screen">
                {active === "Combat" ? <CombatArena heroes={party} enemies={[new Rat("Rat")]} onCombatEnd={handleCombatEnd}
                    onUpdateHeroes={handleUpdateHeroes}></CombatArena> : null}
                {active === "CharacterSheet" ? <CharacterSheet hero={hero} back={() => setActive("Game")}></CharacterSheet> : null}
                {active === "Game" ? <div>
                    <div className="hud">
                        <div className="hud-options">
                            <button className='hud-button' onClick={() => showCharacterSheet()}>Character Sheet</button>
                            <button className='hud-button' onClick={() => setActive("MainMenu")}>Main Menu</button>
                        </div>
                    </div>
                    <div id="game-content">
                    </div>
                    <div className="area-options">
                        <h2>Area Options</h2>
                        <button className='area-button' onClick={() => handleCombat()}>Combat Test</button>
                        <button className='area-button' onClick={() => handleHeal()}>Heal Test</button>
                        <button className='area-button' onClick={() => handleShop()}>Shop Test</button>
                    </div>
                </div> : <div></div>}
                {active === "LoadGame" ? <div className="menu">
                    <h2>Saves</h2>
                    <button className='menu-button' onClick={() => setActive("MainMenu")}>Back</button>
                </div> : <div></div>}
                {active === "MainMenu" ? <MainMenu continueGame={handleContinueGame} newGame={handleNewGame} loadGame={handleLoadGame} settings={handleSettings} exitGame={handleExitGame}></MainMenu> : null}
                {active === "NewGame" ? <CreateCharacter hero={hero} back={() => setActive("MainMenu")}></CreateCharacter> : <div></div>}
                {active === "Settings" ? <div className="char-creation">
                    <h2>Settings</h2>
                    <button className='menu-button' onClick={() => setActive("MainMenu")}>Back</button>
                </div> : <div></div>}

            </div>
            {active !== "Combat" && active !== "NewGame" ? <Log logEntries={gameLog}></Log> : null}
        </div>
    );
}

export default Game;