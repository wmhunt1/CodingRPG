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
        console.log(currentHero)
        console.log(updatedHero)
        const updatedEnemy = { ...currentEnemy };
        if (combatOngoing === true) {
            setCombatLog(prevLog => [...prevLog, `${updatedHero.name} attacks ${updatedEnemy.name}!`]);
            updatedEnemy.currentHP -= updatedHero.weapon.power;
            setCurrentEnemy(updatedEnemy);
            if (currentEnemy.currentHP > 0) {
                updatedHero.currentHP -= updatedEnemy.weapon.power;
                setCombatLog(prevLog => [...prevLog, `${updatedEnemy.name} attacks ${updatedHero.name}!`]);
                console.log(updatedHero.currentHP)
              
            }
            setCurrentHero(updatedHero);
        }
        checkCombatantHP(updatedHero,updatedEnemy)
    
    }
    const checkCombatantHP = (checkedHero: Character, checkedEnemy: Character) => {
        const updatedHero = { ...currentHero };
        if (checkedHero.currentHP <= 0 || checkedEnemy.currentHP <= 0) {
            setCombatOngoing(false)
            if (checkedHero.currentHP > 0) {
                setCombatLog(prevLog => [...prevLog, `${checkedHero.name} is victorius!`]);
                setCombatLog(prevLog => [...prevLog, `${checkedHero.name} gains ${checkedEnemy.currentXP}`]);
                updatedHero.currentXP += checkedEnemy.currentXP;
                if (updatedHero.currentXP >= updatedHero.maxXP) {
                    updatedHero.level += 1;
                    updatedHero.maxXP *= 2;
                    updatedHero.maxHP += 10;
                    setCombatLog(prevLog => [...prevLog, `${checkedHero.name} is now ${updatedHero.level}`]);
                    setCurrentHero(updatedHero);
                }
            }
            else {

                setCombatLog(prevLog => [...prevLog, `${checkedHero.name} is defeated!`]);
                onCombatEnd('defeat', checkedHero);
                setCurrentHero(updatedHero);
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
              </div> : <div className="controls">
                  <button className='menu-button' onClick={() => onCombatEnd('exit', currentHero)}>Exit</button>
              </div>
          }
          <div className="game-log">
          <h3>Combat Log</h3>
                         {combatLog.map((log, index) => (
                             <p key={index}>{log}</p>
                         ))}
                     </div>
      </div>
  );
}

export default CombatArena;

