//component imports
import Log from ".//LogComponent"; // <--- Import your new component here
//model imports
import { Character, Hero } from "../Models/CharacterModel";
//react imports
import { useEffect, useState } from 'react';
//stylesheetimports
import '../StyleSheets/GameStyle.css';
import '../StyleSheets/CombatStyle.css';

interface CombatArenaProps {
    heroes: Character[]; // Array of heroes
    enemies: Character[]; // Array of enemies
    onCombatEnd: (result: 'victory' | 'defeat' | 'run' | 'exit', heroesUpdated: Hero[]) => void;
    onUpdateHeroes: (heroes: Hero[]) => void; // Prop to update heroes in parent
}

function CombatArena({ heroes, enemies, onCombatEnd, onUpdateHeroes }: CombatArenaProps) {
    const [combatOngoing, setCombatOngoing] = useState(true);
    const [currentHeroes, setCurrentHeroes] = useState<Hero[]>(heroes);
    const [currentEnemies, setCurrentEnemies] = useState<Character[]>(enemies);
    const [combatLog, setCombatLog] = useState<string[]>(["Fight!"]);

    useEffect(() => {
        // This ensures the parent component always has the latest hero data
        onUpdateHeroes(currentHeroes);
    }, [currentHeroes, onUpdateHeroes]);

    const handleCombatRound = () => {
        // Create deep copies to ensure immutability and correct state updates
        const updatedHeroes = currentHeroes.map(h => ({ ...h }));
        let updatedEnemies = currentEnemies.map(e => ({ ...e }));

        if (!combatOngoing) return; // Prevent actions if combat is not ongoing

        // --- Heroes' Turn ---
        updatedHeroes.forEach(hero => {
            if (hero.currentHP <= 0) return; // Skip defeated heroes

            // Hero attacks the first living enemy
            const targetEnemy = updatedEnemies.find(enemy => enemy.currentHP > 0);

            if (targetEnemy) {
                const damageToEnemy = hero.weapon.power;
                targetEnemy.currentHP -= damageToEnemy;
                setCombatLog(prevLog => [...prevLog, `${hero.name} attacks ${targetEnemy.name} for ${damageToEnemy} damage!`]);

                if (targetEnemy.currentHP <= 0) {
                    setCombatLog(prevLog => [...prevLog, `${targetEnemy.name} has been defeated!`]);
                    hero.currentXP += targetEnemy.currentXP; // Grant XP to the hero who defeated the enemy
                }
            }
        });

        // Filter out defeated enemies after all hero attacks have processed
        updatedEnemies = updatedEnemies.filter(enemy => enemy.currentHP > 0);

        // --- Enemies' Turn ---
        if (updatedEnemies.some(enemy => enemy.currentHP > 0)) { // Only if there are still living enemies
            updatedEnemies.forEach(enemy => {
                if (enemy.currentHP <= 0) return; // Skip defeated enemies

                // Enemy attacks the first living hero
                const targetHero = updatedHeroes.find(hero => hero.currentHP > 0);

                if (targetHero) {
                    const damageToHero = enemy.weapon.power;
                    targetHero.currentHP -= damageToHero;
                    setCombatLog(prevLog => [...prevLog, `${enemy.name} attacks ${targetHero.name} for ${damageToHero} damage!`]);

                    if (targetHero.currentHP <= 0) {
                        setCombatLog(prevLog => [...prevLog, `${targetHero.name} has been defeated!`]);
                    }
                }
            });
        }

        setCurrentEnemies(updatedEnemies);
        setCurrentHeroes(updatedHeroes); // Update heroes state after both turns

        // Check combat end conditions
        checkCombatantHP(updatedHeroes, updatedEnemies);
    };

    const checkCombatantHP = (checkedHeroes: Hero[], checkedEnemies: Character[]) => {
        const allEnemiesDefeated = checkedEnemies.every(enemy => enemy.currentHP <= 0);
        const allHeroesDefeated = checkedHeroes.every(hero => hero.currentHP <= 0);

        if (allHeroesDefeated || allEnemiesDefeated) {
            setCombatOngoing(false); // End combat

            if (allHeroesDefeated) {
                setCombatLog(prevLog => [...prevLog, `All heroes are defeated! You have lost!`]);
                onCombatEnd('defeat', checkedHeroes); // Pass the final state of heroes
            } else { // All enemies defeated
                setCombatLog(prevLog => [...prevLog, `All enemies are defeated! Heroes are victorious!`]);

                // Handle XP gain and leveling up for all heroes that participated
                const finalHeroes = checkedHeroes.map(hero => {
                    const updatedHero = { ...hero };
                    // If hero gained enough XP to level up
                    while (updatedHero.currentXP >= updatedHero.maxXP) { // Use while loop to handle multiple level ups if XP gain is large
                        updatedHero.level += 1;
                        updatedHero.maxXP *= 2; // Increase XP needed for next level
                        updatedHero.currentXP -= (updatedHero.maxXP / 2); // Subtract the XP required for the last level
                        updatedHero.maxHP += 10;
                        updatedHero.currentHP = Math.min(updatedHero.currentHP + 10, updatedHero.maxHP); // Restore some HP, cap at maxHP
                        setCombatLog(prevLog => [...prevLog, `${updatedHero.name} is now level ${updatedHero.level}!`]);
                    }
                    return updatedHero;
                });
                setCurrentHeroes(finalHeroes); // Update state with potentially leveled-up heroes
                onCombatEnd('victory', finalHeroes);
            }
        }
    };

    const handleRun = () => {
        setCombatOngoing(false);
        setCombatLog(prevLog => [...prevLog, `Heroes attempt to run!`]);
        onCombatEnd('run', currentHeroes); // Pass the current state of heroes
    };

    return (
        <div className="combatArena">
            <h2>Combat</h2>
            {combatOngoing === true ?
                <div>
                    {/* Display multiple heroes */}
                    <div className="heroes-container">
                        {currentHeroes.map((hero, index) => (
                            <div key={index} className="character-stats">
                                <h3>{hero.name}</h3>
                                <p><span>HP: {hero.currentHP}/{hero.maxHP}</span></p>
                                <p><span>XP: {hero.currentXP}/{hero.maxXP}</span></p>
                                <p><span>Level: {hero.level}</span></p>
                            </div>
                        ))}
                    </div>

                    {/* Display multiple enemies */}
                    <div className='enemies-container'>
                        {currentEnemies.map((enemy, index) => (
                            <div key={index} className='character-stats'>
                                <h3>{enemy.name}</h3>
                                <p><span>HP: {enemy.currentHP}/{enemy.maxHP}</span></p>
                            </div>
                        ))}
                    </div>

                    <div className="controls">
                        <button className='menu-button' onClick={() => handleCombatRound()}>Attack</button>
                        <button className='menu-button' onClick={() => handleRun()}>Run</button>
                    </div>
                </div> :
                <div className="controls">
                    <button className='menu-button' onClick={() => onCombatEnd('exit', currentHeroes)}>Exit</button>
                </div>
            }
            <Log logEntries={combatLog}></Log>
        </div>
    );
}

export default CombatArena;