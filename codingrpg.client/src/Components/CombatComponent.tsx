// CombatArena.tsx
// Component Imports
import Log from "./LogComponent";

// Model Imports
import { Character, Hero } from "../Models/CharacterModel"; // Assuming Hero extends Character and has XP/Level properties

// React Imports
import { useEffect, useState, useCallback } from "react";

// Stylesheet Imports
import "../StyleSheets/GameStyle.css";
import "../StyleSheets/CombatStyle.css";

// Define the props interface for clarity and type safety
interface CombatArenaProps {
    heroes: Hero[]; // Array of heroes (specifically Hero type for XP/level)
    enemies: Character[]; // Array of enemies
    onCombatEnd: (result: "victory" | "defeat" | "run" | "exit", heroesUpdated: Hero[]) => void;
    onUpdateHeroes: (heroes: Hero[]) => void; // Prop to update heroes in parent
}

function CombatArena({ heroes, enemies, onCombatEnd, onUpdateHeroes }: CombatArenaProps) {
    // State to manage the combat flow and current combatants
    const [combatOngoing, setCombatOngoing] = useState(true);
    // Initialize currentHeroes and currentEnemies from props, ensuring deep copies
    // This is crucial to prevent direct mutation of props and ensure local state
    // reflects the initial combat setup.
    const [currentHeroes, setCurrentHeroes] = useState<Hero[]>(() =>
        heroes.map((hero) => ({ ...hero }))
    );
    const [currentEnemies, setCurrentEnemies] = useState<Character[]>(() =>
        enemies.map((enemy) => ({ ...enemy }))
    );
    const [combatLog, setCombatLog] = useState<string[]>(["Fight!"]);

    // Effect to synchronize hero data back to the parent component
    // This runs whenever currentHeroes changes, ensuring the parent always has the latest state
    useEffect(() => {
        onUpdateHeroes(currentHeroes);
    }, [currentHeroes, onUpdateHeroes]); // Dependencies ensure this runs when currentHeroes or onUpdateHeroes changes

    // Memoized function to check combat end conditions
    // Uses useCallback to prevent unnecessary re-creation on renders
    const checkCombatantHP = useCallback(
        (checkedHeroes: Hero[], checkedEnemies: Character[]) => {
            const allEnemiesDefeated = checkedEnemies.every((enemy) => enemy.currentHP <= 0);
            const allHeroesDefeated = checkedHeroes.every((hero) => hero.currentHP <= 0);

            if (allHeroesDefeated || allEnemiesDefeated) {
                setCombatOngoing(false); // End combat

                if (allHeroesDefeated) {
                    setCombatLog((prevLog) => [...prevLog, `All heroes are defeated! You have lost!`]);
                    onCombatEnd("defeat", checkedHeroes); // Pass the final state of heroes to parent
                } else {
                    // All enemies defeated - handle victory, XP gain, and leveling up
                    setCombatLog((prevLog) => [...prevLog, `All enemies are defeated! Heroes are victorious!`]);

                    // Process XP gain and potential level-ups for all participating heroes
                    const finalHeroes = checkedHeroes.map((hero) => {
                        const updatedHero = { ...hero }; // Create a mutable copy for updates

                        // Loop to handle multiple level-ups if a large amount of XP is gained
                        while (updatedHero.currentXP >= updatedHero.maxXP) {
                            updatedHero.level += 1;
                            updatedHero.currentXP -= updatedHero.maxXP; // Subtract XP required for the current level
                            updatedHero.maxXP *= 2; // Increase XP needed for the next level (example scaling)
                            updatedHero.maxHP += 10; // Increase max HP on level up
                            updatedHero.currentHP = Math.min(updatedHero.currentHP + 10, updatedHero.maxHP); // Restore some HP, capped at maxHP
                            setCombatLog((prevLog) => [...prevLog, `${updatedHero.name} is now level ${updatedHero.level}!`]);
                        }
                        return updatedHero;
                    });

                    setCurrentHeroes(finalHeroes); // Update component state with leveled-up heroes
                    onCombatEnd("victory", finalHeroes); // Notify parent of victory with updated heroes
                }
            }
        },
        [onCombatEnd] // Dependency: onCombatEnd prop
    );

    // Memoized function to handle a single combat round
    // Uses useCallback to prevent unnecessary re-creation on renders
    const handleCombatRound = useCallback(() => {
        if (!combatOngoing) return; // Prevent actions if combat is not ongoing

        // Create deep copies of current state to ensure immutability during the round
        const updatedHeroes = currentHeroes.map((h) => ({ ...h }));
        let updatedEnemies = currentEnemies.map((e) => ({ ...e }));

        // --- Heroes' Turn ---
        updatedHeroes.forEach((hero) => {
            if (hero.currentHP <= 0) return; // Skip defeated heroes

            // Hero attacks the first living enemy
            const targetEnemy = updatedEnemies.find((enemy) => enemy.currentHP > 0);

            if (targetEnemy) {
                const damageToEnemy = hero.weapon.power;
                targetEnemy.currentHP -= damageToEnemy;
                setCombatLog((prevLog) => [...prevLog, `${hero.name} attacks ${targetEnemy.name} for ${damageToEnemy} damage!`]);

                if (targetEnemy.currentHP <= 0) {
                    setCombatLog((prevLog) => [...prevLog, `${targetEnemy.name} has been defeated!`]);
                    // XP is granted to the hero who landed the killing blow
                    hero.currentXP += targetEnemy.currentXP;
                }
            }
        });

        // Filter out defeated enemies after all hero attacks have processed
        updatedEnemies = updatedEnemies.filter((enemy) => enemy.currentHP > 0);

        // --- Enemies' Turn ---
        // Only proceed if there are still living enemies
        if (updatedEnemies.some((enemy) => enemy.currentHP > 0)) {
            updatedEnemies.forEach((enemy) => {
                if (enemy.currentHP <= 0) return; // Skip defeated enemies

                // Enemy attacks the first living hero
                const targetHero = updatedHeroes.find((hero) => hero.currentHP > 0);

                if (targetHero) {
                    const damageToHero = enemy.weapon.power;
                    targetHero.currentHP -= damageToHero;
                    setCombatLog((prevLog) => [...prevLog, `${enemy.name} attacks ${targetHero.name} for ${damageToHero} damage!`]);

                    if (targetHero.currentHP <= 0) {
                        setCombatLog((prevLog) => [...prevLog, `${targetHero.name} has been defeated!`]);
                    }
                }
            });
        }

        // Update the state with the results of the round
        setCurrentEnemies(updatedEnemies);
        setCurrentHeroes(updatedHeroes);

        // Check combat end conditions after updating state
        checkCombatantHP(updatedHeroes, updatedEnemies);
    }, [combatOngoing, currentHeroes, currentEnemies, checkCombatantHP]); // Dependencies: state variables and memoized function

    // Memoized function to handle running from combat
    const handleRun = useCallback(() => {
        setCombatOngoing(false);
        setCombatLog((prevLog) => [...prevLog, `Heroes attempt to run!`]);
        onCombatEnd("run", currentHeroes); // Notify parent of run attempt with current hero state
    }, [onCombatEnd, currentHeroes]); // Dependencies: onCombatEnd prop and currentHeroes state

    return (
        <div className="combatArena">
            <h2>Combat</h2>
            {combatOngoing ? (
                <div>
                    {/* Display multiple heroes */}
                    <div className="heroes-container">
                        {currentHeroes.map((hero, index) => (
                            <div key={index} className="character-stats">
                                <h3>{hero.name}</h3>
                                <p>
                                    <span>
                                        HP: {hero.currentHP}/{hero.maxHP}
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        XP: {hero.currentXP}/{hero.maxXP}
                                    </span>
                                </p>
                                <p>
                                    <span>Level: {hero.level}</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Display multiple enemies */}
                    <div className="enemies-container">
                        {currentEnemies.map((enemy, index) => (
                            <div key={index} className="character-stats">
                                <h3>{enemy.name}</h3>
                                <p>
                                    <span>
                                        HP: {enemy.currentHP}/{enemy.maxHP}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="controls">
                        <button className="menu-button" onClick={handleCombatRound}>
                            Attack
                        </button>
                        <button className="menu-button" onClick={handleRun}>
                            Run
                        </button>
                    </div>
                </div>
            ) : (
                // Render exit button when combat is no longer ongoing
                <div className="controls">
                    <button className="menu-button" onClick={() => onCombatEnd("exit", currentHeroes)}>
                        Exit
                    </button>
                </div>
            )}
            {/* Log component is always visible in combat arena */}
            <Log logEntries={combatLog} />
        </div>
    );
}

export default CombatArena;
