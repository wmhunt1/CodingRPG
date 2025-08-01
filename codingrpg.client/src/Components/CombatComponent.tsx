// CombatArena.tsx
// Component Imports
import Log from "./LogComponent";

// Model Imports
import { Character, Hero } from "../Models/CharacterModel";

// React Imports
import { useEffect, useState, useCallback } from "react";

// Stylesheet Imports
import "../StyleSheets/GameStyle.css";
import "../StyleSheets/CombatStyle.css";

// The interface now includes the new props for the game log
interface CombatArenaProps {
    heroes: Hero[];
    enemies: Character[];
    onCombatEnd: (result: "victory" | "defeat" | "run" | "exit", heroesUpdated: Hero[]) => void;
    onUpdateHeroes: (heroes: Hero[]) => void;
    gameLog: string[];
    addGameLog: (message: string) => void;
}

// The component accepts the new props
function CombatArena({ heroes, enemies, onCombatEnd, onUpdateHeroes, gameLog, addGameLog }: CombatArenaProps) {

    const [combatOngoing, setCombatOngoing] = useState(true);
    const [currentHeroes, setCurrentHeroes] = useState<Character[]>(() =>
        heroes.map((hero) => ({ ...hero }))
    );
    const [currentEnemies, setCurrentEnemies] = useState<Character[]>(() =>
        enemies.map((enemy) => ({ ...enemy }))
    );
    // The local combatLog state is removed and replaced by the prop.
    // const [combatLog, setCombatLog] = useState<string[]>(["Fight!"]);

    useEffect(() => {
        onUpdateHeroes(currentHeroes);
    }, [currentHeroes, onUpdateHeroes]);

    const checkCombatantHP = useCallback(
        (checkedHeroes: Character[], checkedEnemies: Character[]) => {
            const allEnemiesDefeated = checkedEnemies.every((enemy) => enemy.currentHP <= 0);
            const allHeroesDefeated = checkedHeroes.every((hero) => hero.currentHP <= 0);

            if (allHeroesDefeated || allEnemiesDefeated) {
                setCombatOngoing(false);

                if (allHeroesDefeated) {
                    // Use the prop function to update the main log
                    addGameLog(`All heroes are defeated! You have lost!`);
                    onCombatEnd("defeat", checkedHeroes);
                } else {
                    // Use the prop function to update the main log
                    addGameLog(`All enemies are defeated! Heroes are victorious!`);

                    const finalHeroes = checkedHeroes.map((hero) => {
                        const updatedHero = { ...hero };

                        while (updatedHero.currentXP >= updatedHero.maxXP) {
                            updatedHero.level += 1;
                            updatedHero.currentXP -= updatedHero.maxXP;
                            updatedHero.maxXP *= 2;
                            updatedHero.maxHP += 10;
                            updatedHero.currentHP = Math.min(updatedHero.currentHP + 10, updatedHero.maxHP);
                            // Use the prop function to update the main log
                            addGameLog(`${updatedHero.name} is now level ${updatedHero.level}!`);
                        }
                        return updatedHero;
                    });

                    setCurrentHeroes(finalHeroes);
                    onCombatEnd("victory", finalHeroes);
                }
            }
        },
        [onCombatEnd, addGameLog] // Added addGameLog to dependencies
    );

    const handleCombatRound = useCallback(() => {
        if (!combatOngoing) return;

        const updatedHeroes = currentHeroes.map((h) => ({ ...h }));
        let updatedEnemies = currentEnemies.map((e) => ({ ...e }));

        // --- Heroes' Turn ---
        updatedHeroes.forEach((hero) => {
            if (hero.currentHP <= 0) return;

            const targetEnemy = updatedEnemies.find((enemy) => enemy.currentHP > 0);

            if (targetEnemy) {
                const damageToEnemy = hero.weapon.power;
                targetEnemy.currentHP -= damageToEnemy;
                // Use the prop function to update the main log
                addGameLog(`${hero.name} attacks ${targetEnemy.name} for ${damageToEnemy} damage!`);

                if (targetEnemy.currentHP <= 0) {
                    // Use the prop function to update the main log
                    addGameLog(`${targetEnemy.name} has been defeated!`);
                    hero.currentXP += targetEnemy.currentXP;
                }
            }
        });

        updatedEnemies = updatedEnemies.filter((enemy) => enemy.currentHP > 0);

        // --- Enemies' Turn ---
        if (updatedEnemies.some((enemy) => enemy.currentHP > 0)) {
            updatedEnemies.forEach((enemy) => {
                if (enemy.currentHP <= 0) return;

                const targetHero = updatedHeroes.find((hero) => hero.currentHP > 0);

                if (targetHero) {
                    const damageToHero = enemy.weapon.power;
                    targetHero.currentHP -= damageToHero;
                    // Use the prop function to update the main log
                    addGameLog(`${enemy.name} attacks ${targetHero.name} for ${damageToHero} damage!`);

                    if (targetHero.currentHP <= 0) {
                        // Use the prop function to update the main log
                        addGameLog(`${targetHero.name} has been defeated!`);
                    }
                }
            });
        }

        setCurrentEnemies(updatedEnemies);
        setCurrentHeroes(updatedHeroes);
        checkCombatantHP(updatedHeroes, updatedEnemies);
    }, [combatOngoing, currentHeroes, currentEnemies, checkCombatantHP, addGameLog]); // Added addGameLog to dependencies


    const handleRun = useCallback(() => {
        setCombatOngoing(false);
        // Use the prop function to update the main log
        addGameLog(`Heroes attempt to run!`);
        onCombatEnd("run", currentHeroes);
    }, [onCombatEnd, currentHeroes, addGameLog]); // Added addGameLog to dependencies

    // Display a welcome message at the start of combat, but only once.
    useEffect(() => {
        addGameLog("A new battle begins!");
    }, [addGameLog]);


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
                <div className="controls">
                    <button className="menu-button" onClick={() => onCombatEnd("exit", currentHeroes)}>
                        Exit
                    </button>
                </div>
            )}
            {/* The Log component now displays the gameLog passed as a prop */}
            <Log logEntries={gameLog} />
        </div>
    );
}

export default CombatArena;