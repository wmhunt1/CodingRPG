// CombatArena.tsx
// Component Imports

// Model Imports
import { Character, Hero } from "../Models/CharacterModel";

// React Imports
import { useEffect, useState, useCallback } from "react";

// Stylesheet Imports
import "../StyleSheets/GameStyle.css";
import "../StyleSheets/CombatStyle.css";

// Utility Imports
import { executeCombatRound } from "../Utils/CombatUtils";
import { checkCombatOutcome } from "../Utils/CombatOutcomeUtils";

interface CombatArenaProps {
    heroes: Hero[];
    enemies: Character[];
    onCombatEnd: (result: "victory" | "defeat" | "run" | "exit", heroesUpdated: Hero[]) => void;
    onUpdateHeroes: (heroes: Hero[]) => void;
    gameLog: string[];
    addGameLog: (message: string) => void;
}

function CombatArena({ heroes, enemies, onCombatEnd, onUpdateHeroes, addGameLog }: CombatArenaProps) {
    const [combatOngoing, setCombatOngoing] = useState(true);
    const [currentHeroes, setCurrentHeroes] = useState<Hero[]>(() =>
        heroes.map((hero) => ({ ...hero }))
    );
    const [currentEnemies, setCurrentEnemies] = useState<Character[]>(() =>
        enemies.map((enemy) => ({ ...enemy }))
    );

    useEffect(() => {
        onUpdateHeroes(currentHeroes);
    }, [currentHeroes, onUpdateHeroes]);

    // This useCallback now calls the external utility
    const handleCheckCombatOutcome = useCallback(
        (checkedHeroes: Hero[], checkedEnemies: Character[]) => {
            const { combatOngoing: newCombatOngoing, finalHeroes } = checkCombatOutcome(
                checkedHeroes,
                checkedEnemies,
                onCombatEnd,
                addGameLog
            );
            setCombatOngoing(newCombatOngoing);
            if (!newCombatOngoing && finalHeroes) {
                setCurrentHeroes(finalHeroes); // Update heroes with leveled-up versions
            }
        },
        [onCombatEnd, addGameLog]
    );

    const handleCombatRound = useCallback(() => {
        if (!combatOngoing) return;

        const { updatedHeroes, updatedEnemies } = executeCombatRound(
            currentHeroes,
            currentEnemies,
            addGameLog
        );

        setCurrentEnemies(updatedEnemies);
        setCurrentHeroes(updatedHeroes);
        handleCheckCombatOutcome(updatedHeroes, updatedEnemies);
    }, [combatOngoing, currentHeroes, currentEnemies, addGameLog, handleCheckCombatOutcome]);


    const handleRun = useCallback(() => {
        setCombatOngoing(false);
        addGameLog(`Heroes attempt to run!`);
        onCombatEnd("run", currentHeroes);
    }, [onCombatEnd, currentHeroes, addGameLog]);

    useEffect(() => {
        addGameLog("A new battle begins!");
    }, [addGameLog]);

    return (
        <div className="combatArena">
            <h2>Combat</h2>
            {combatOngoing ? (
                <>
                    <div className="combat-display-area">
                        <div className="heroes-container">
                            {currentHeroes.map((hero, index) => (
                                <div key={index} className="character-stats">
                                    <h3>{hero.name}</h3>
                                    <p>
                                        <span>
                                            HP: {hero.currentHP}/{hero.maxHP}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>

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
                    </div>

                    <div className="controls">
                        <button className="menu-button" onClick={handleCombatRound}>
                            Attack
                        </button>
                        <button className="menu-button" onClick={handleRun}>
                            Run
                        </button>
                    </div>
                </>
            ) : (
                <div className="controls">
                    <button className="menu-button" onClick={() => onCombatEnd("exit", currentHeroes)}>
                        Exit
                    </button>
                </div>
            )}
        </div>
    );
}

export default CombatArena;