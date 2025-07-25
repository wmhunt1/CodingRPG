import '../StyleSheets/GameStyle.css';
import { useEffect,useState } from 'react';
import { Character, Hero} from "../Models/CharacterModel";
interface CombatArenaProps {
    hero: Hero;
    enemy: Character;
    onCombatEnd: (result: 'victory' | 'defeat' | 'run'|'exit', heroUpdated: Hero) => void;
onUpdateHero: (hero: Hero) => void;
}


function CombatArena({ hero,enemy, onCombatEnd,onUpdateHero}: CombatArenaProps) {
    const [combatOngoing, setCombatOngoing] = useState(true)
    const [currentHero, setCurrentHero] = useState<Hero>(hero);
    const [currentEnemy, setCurrentEnemy] = useState<Character>(enemy);
    const [combatLog, setCombatLog] = useState<string[]>([]);

    useEffect(() => {

       onUpdateHero(currentHero);
    }, [currentHero, onUpdateHero]);

    const handleCombatRound = () => {
        const updatedHero = { ...hero };
        const updatedEnemy = { ...enemy };
        if (combatOngoing === true) {
            updatedHero.currentHP -= enemy.weapon.power;
            updatedEnemy.currentHP -= hero.weapon.power;
            setCurrentHero(updatedHero);
            setCurrentEnemy(updatedEnemy);
        }
        checkCombatantHP(updatedHero,updatedEnemy)
    
    }
    const checkCombatantHP = (checkedHero: Character, checkedEnemy: Character) => {
        if (checkedHero.currentHP <= 0 || checkedEnemy.currentHP <= 0) {
            setCombatOngoing(false)
            if (checkedHero.currentHP > 0) {
                setCombatLog(prevLog => [...prevLog, `${checkedHero.name} is victorius!`]);
                //onCombatEnd('victory', checkedHero);
            }
            else {

                setCombatLog(prevLog => [...prevLog, `${checkedHero.name} is defeated!`]);
                onCombatEnd('defeat', checkedHero);
            }
        }
    }
    const handleRun = () => {
     setCombatOngoing(false);
          setCombatLog(prevLog => [...prevLog, `${currentHero.name} attempts to run!`]);
    onCombatEnd('run', currentHero);
     };
  return (
      <div className="combatArena">
          <h2>Combat</h2>
        
          {combatOngoing === true ?
              <div>
                  <div>
                      <h3>{currentHero.name}</h3>
                      <p><span>HP: {currentHero.currentHP}/{currentHero.maxHP}</span></p>
                  </div>
                  <div>
                      <h3>{enemy.name}</h3>
                      <p><span>HP: {currentEnemy.currentHP}/{currentEnemy.maxHP}</span></p>
                  </div>
                  <button className='menu-button' onClick={() => handleCombatRound()}>Attack</button>
                  <button className='menu-button' onClick={() => handleRun()}>Run</button>
              </div> : <div>
                  <button className='menu-button' onClick={() => onCombatEnd('exit', currentHero)}>Exit</button>
              </div>
          }
          <div className="combat-log">
                         {combatLog.map((log, index) => (
                             <p key={index}>{log}</p>
                         ))}
                     </div>
      </div>
  );
}

export default CombatArena;







//    // Initialize state with props, but allow internal updates
//    useEffect(() => {
//        setCurrentHero(hero);
//        setCurrentEnemy(enemy);
//        setCombatOngoing(true);
//        setCombatLog([`${hero.name} VS ${enemy.name}`]);
//    }, [hero, enemy]);

//    const handleCombatRound = () => {
//        if (!combatOngoing) return;

//        const heroDamage = currentEnemy.weapon.power;
//        const enemyDamage = currentHero.weapon.power;

//        const updatedHero = { ...currentHero, currentHP: currentHero.currentHP - heroDamage };
//        const updatedEnemy = { ...currentEnemy, currentHP: currentEnemy.currentHP - enemyDamage };

//        const newLog: string[] = [];
//        newLog.push(`${currentHero.name} attacks ${currentEnemy.name} for ${enemyDamage} damage.`);
//        newLog.push(`${currentEnemy.name} attacks ${currentHero.name} for ${heroDamage} damage.`);

//        setCurrentHero(updatedHero);
//        setCurrentEnemy(updatedEnemy);
//        setCombatLog(prevLog => [...prevLog, ...newLog]);

//        // Check for combat end conditions
//        if (updatedHero.currentHP <= 0 || updatedEnemy.currentHP <= 0) {
//            setCombatOngoing(false);
//            if (updatedHero.currentHP <= 0) {
//                setCombatLog(prevLog => [...prevLog, `${currentHero.name} is defeated!`]);
//                onCombatEnd('defeat', updatedHero);
//            } else {
//                setCombatLog(prevLog => [...prevLog, `${currentHero.name} is victorious!`]);
//                onCombatEnd('victory', updatedHero);
//            }
//        }
//    };

//    const handleRun = () => {
//        setCombatOngoing(false);
//        setCombatLog(prevLog => [...prevLog, `${currentHero.name} attempts to run!`]);
//        onCombatEnd('run', currentHero);
//    };

//    // Propagate hero state changes back to parent
//    useEffect(() => {
//        onUpdateHero(currentHero);
//    }, [currentHero, onUpdateHero]);


//    return (
//        <div className="combat-arena">
//            <h2>Combat</h2>
//            <div className="combat-stats">
//                <div className="character-display">
//                    <h3>{currentHero.name}</h3>
//                    <p><span>HP: {Math.max(0, currentHero.currentHP)}/{currentHero.maxHP}</span></p>
//                </div>
//                <div className="character-display">
//                    <h3>{currentEnemy.name}</h3>
//                    <p><span>HP: {Math.max(0, currentEnemy.currentHP)}/{currentEnemy.maxHP}</span></p>
//                </div>
//            </div>

//            <div className="combat-log">
//                {combatLog.map((log, index) => (
//                    <p key={index}>{log}</p>
//                ))}
//            </div>

//            {combatOngoing ? (
//                <div className="combat-actions">
//                    <button className='menu-button' onClick={handleCombatRound}>Attack</button>
//                    <button className='menu-button' onClick={handleRun}>Run</button>
//                </div>
//            ) : (
//                <div className="combat-actions">
//                    <button className='menu-button' onClick={() => onCombatEnd('exit', currentHero)}>Exit</button>
//                </div>
//            )}
//        </div>
//    );
//}

//export default CombatArena;


//// GameComponent.tsx
//import { Hero, Rat } from "../Models/CharacterModel";
//import { useState } from "react";
//import CombatArena from "./CombatArena"; // Import the new component
//import '../StyleSheets/GameStyle.css';

//function GameComponent() {
//    const [active, setActive] = useState("MainMenu");
//    const [hero, setHero] = useState(new Hero("Hero"));
//    const [text, setText] = useState("Welcome to Coding RPG");
//    const [enemy, setEnemy] = useState(new Rat("Rat")); // Initialize with a default or null
//    // combat state is now primarily managed within CombatArena, but GameComponent still needs to know when to show it
//    // const [combat, setCombat] = useState(false) // This state is now redundant for rendering CombatArena

//    const handleCreateCharacter = () => {
//        const inputElement = document.getElementById('name-input') as HTMLInputElement;
//        const newHeroName = inputElement.value;
//        if (newHeroName !== "") {
//            const newHero = new Hero(newHeroName); // Create a new Hero instance
//            setHero(newHero);
//            setActive("Game");
//            setText(`Hello, ${newHero.name}`);
//        } else {
//            setText("Please name your character");
//        }
//    };

//    const handleStartCombat = () => {
//        setEnemy(new Rat("Rat")); // Ensure a new enemy for each combat
//        setActive("Combat");
//        setText(`${hero.name} VS ${enemy.name}`); // This text might be overridden by CombatArena's internal log
//    };

//    const handleCombatEnd = (result: 'victory' | 'defeat' | 'run', updatedHero: Hero) => {
//        setActive("Game"); // Return to game state
//        setHero(updatedHero); // Update hero's state after combat
//        if (result === 'victory') {
//            setText(`${updatedHero.name} is victorious!`);
//        } else if (result === 'defeat') {
//            setText(`${updatedHero.name} is defeated!`);
//        } else if (result === 'run') {
//            setText(`${updatedHero.name} managed to escape!`);
//        }
//    };

//    const handleUpdateHeroInGame = (updatedHero: Hero) => {
//        setHero(updatedHero);
//    };

//    return (
//        <div id="game">
//            {active === "Combat" && (
//                <CombatArena
//                    hero={hero}
//                    enemy={enemy}
//                    onCombatEnd={handleCombatEnd}
//                    onUpdateHero={handleUpdateHeroInGame}
//                />
//            )}

//            {active === "Game" && (
//                <div>
//                    <button className='menu-button' onClick={handleStartCombat}>Combat Test</button>
//                    <button className='menu-button' onClick={() => setActive("MainMenu")}>Main Menu</button>
//                </div>
//            )}

//            {active === "LoadGame" && (
//                <div>
//                    <h2>Saves</h2>
//                    <button className='menu-button' onClick={() => setActive("MainMenu")}>Back</button>
//                </div>
//            )}

//            {active === "MainMenu" && (
//                <div id="main-menu">
//                    <h2>Main Menu</h2>
//                    <button className='menu-button' onClick={() => setActive("Game")}>Continue</button>
//                    <button className='menu-button' onClick={() => setActive("NewGame")}>New Game</button>
//                    <button className='menu-button' onClick={() => setActive("LoadGame")}>Load Game</button>
//                    <button className='menu-button' onClick={() => setActive("Settings")}>Settings</button>
//                    <button className='menu-button'>Exit Game</button>
//                </div>
//            )}

//            {active === "NewGame" && (
//                <div>
//                    <h2>Character Creation</h2>
//                    <div>
//                        <label htmlFor="name-input">Select Character Name: <input id="name-input" /></label>
//                        <button onClick={handleCreateCharacter}>Create Character</button>
//                    </div>
//                    <div>
//                        <button className='menu-button' onClick={() => setActive("MainMenu")}>Back</button>
//                    </div>
//                </div>
//            )}

//            {active === "Settings" && (
//                <div>
//                    <h2>Settings</h2>
//                    <button className='menu-button' onClick={() => setActive("MainMenu")}>Back</button>
//                </div>
//            )}

//            <div id="text">{text}</div>
//        </div>
//    );
//}

//export default GameComponent;
