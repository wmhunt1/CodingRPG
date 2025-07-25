//model imports
import { Character, Hero } from "../Models/CharacterModel";
//react imports
import { useEffect, useState } from 'react';
//stylesheetimports
import '../StyleSheets/GameStyle.css';
import '../StyleSheets/CombatStyle.css';

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
    const [combatLog, setCombatLog] = useState<string[]>(["Fight!"]);

    useEffect(() => {

       onUpdateHero(currentHero);
    }, [currentHero, onUpdateHero]);

    const handleCombatRound = () => {
        const updatedHero = { ...currentHero };
        const updatedEnemy = { ...currentEnemy };
        if (combatOngoing === true) {
            updatedHero.currentHP -= enemy.weapon.power;
            setCombatLog(prevLog => [...prevLog, `${updatedHero.name} attacks ${updatedEnemy.name}!`]);
            updatedEnemy.currentHP -= hero.weapon.power;
            setCurrentEnemy(updatedEnemy);
            if (currentEnemy.currentHP <= 0) {
                setCombatLog(prevLog => [...prevLog, `${updatedEnemy.name} attacks ${updatedHero.name}!`]);
            }
            setCurrentHero(updatedHero);
        }
        checkCombatantHP(updatedHero,updatedEnemy)
    
    }
    const checkCombatantHP = (checkedHero: Character, checkedEnemy: Character) => {
        if (checkedHero.currentHP <= 0 || checkedEnemy.currentHP <= 0) {
            setCombatOngoing(false)
            if (checkedHero.currentHP > 0) {
                setCombatLog(prevLog => [...prevLog, `${checkedHero.name} is victorius!`]);
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
                  <div className="character-stats">
                      <h3>{currentHero.name}</h3>
                      <p><span>HP: {currentHero.currentHP}/{currentHero.maxHP}</span></p>
                  </div>
                  <div className='character-stats'>
                      <h3>{enemy.name}</h3>
                      <p><span>HP: {currentEnemy.currentHP}/{currentEnemy.maxHP}</span></p>
                  </div>
                  <div className = "controls">
                  <button className='menu-button' onClick={() => handleCombatRound()}>Attack</button>
                      <button className='menu-button' onClick={() => handleRun()}>Run</button>
                  </div>
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

