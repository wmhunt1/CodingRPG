// CombatArena.tsx
// Component Imports

// Model Imports
import { Character, Hero } from "../Models/CharacterModel";

// React Imports
import { useEffect, useState, useCallback } from "react";

// Stylesheet Imports
import "../StyleSheets/GameStyle.css";

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

//add target selection later
function CombatArena({ heroes, enemies, onCombatEnd, onUpdateHeroes, addGameLog }: CombatArenaProps) {
    const [combatOngoing, setCombatOngoing] = useState(true);
    const [currentHeroes, setCurrentHeroes] = useState<Hero[]>(() =>
        heroes.map((hero) => ({ ...hero }))
    );
    const [currentEnemies, setCurrentEnemies] = useState<Character[]>(() =>
        enemies.map((enemy) => ({ ...enemy }))
    );
    const [action, setAction] = useState("Attack")
    const [target, setTarget] = useState(enemies[0])
    const [targetType, setTargetType] = useState<"Ally" | "Enemy">("Enemy");
    // State to hold the index of the selected target
    const [targetedIndex, setTargetedIndex] = useState(0);
    const [round, setRound] = useState(1);

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
        const selectedTarget = targetType === "Ally" ? currentHeroes[targetedIndex] : currentEnemies[targetedIndex];

        const { updatedHeroes, updatedEnemies } = executeCombatRound(
            currentHeroes,
            currentEnemies,
            addGameLog,
            action,
            selectedTarget
        );

        setCurrentEnemies(updatedEnemies);
        setCurrentHeroes(updatedHeroes);
        handleCheckCombatOutcome(updatedHeroes, updatedEnemies);
        setRound(round + 1)
    }, [combatOngoing, currentHeroes, currentEnemies, addGameLog, handleCheckCombatOutcome, action, targetType, targetedIndex, round]);

    const handleRun = useCallback(() => {
        setCombatOngoing(false);
        addGameLog(`Heroes attempt to run!`);
        onCombatEnd("run", currentHeroes);
    }, [onCombatEnd, currentHeroes, addGameLog]);

    const handleSelectAction = useCallback((selectedAction: string) => {
        setAction(selectedAction);
    }, []);
    // Updated handleSelectTarget to store the index
    const handleSelectTarget = useCallback((selectedTarget: Character, type: "Ally" | "Enemy", index: number) => {
        setTarget(selectedTarget);
        setTargetType(type);
        setTargetedIndex(index);
    }, []);

    useEffect(() => {
        addGameLog("A new battle begins!");
    }, [addGameLog]);

    return (
        <div className="game-layout-grid">
            <div className="toolbar">
                <h2>Combat Round {round}</h2>
            </div>
            <div className="game-content-left">
                <h3>Action Options</h3>
                {/*Maybe use item etc overhere*/}
                {combatOngoing ? (
                    <>
                        <button className="action-button" onClick={() => handleSelectAction("Attack")}>
                            Basic Attack
                        </button>
                        <button className="action-button" onClick={() => handleSelectAction("Attack")}>
                            Item
                        </button>
                        <button className="action-button" onClick={() => handleSelectAction("Attack")}>
                            Spell
                        </button>
                        <button className="action-button" onClick={() => handleSelectAction("Attack")}>
                            Ability
                        </button>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <div className="game-content-main">
                <div className="combat-display-area">
                    <div className="heroes-container">
                        <h3>Heroes</h3>
                        {currentHeroes.map((hero, index) => (
                            <div key={index} className="character-stats">
                                {/* Use index and targetType for accurate targeting */}
                                <h3>{hero.name} {targetType === "Ally" && targetedIndex === index && "(Target)"}</h3>
                                <p>
                                    <span>
                                        HP: {hero.currentHP}/{hero.maxHP} -
                                        MP: {hero.currentMP}/{hero.maxMP} -
                                        SP: {hero.currentSP}/{hero.maxSP}
                                    </span>
                                </p>
                                <button onClick={() => handleSelectTarget(hero, "Ally", index)}>Select Target</button>
                            </div>
                        ))}
                    </div>
                    <div className="enemies-container">
                        <h3>Enemies</h3>
                        {currentEnemies.map((enemy, index) => (
                            <div key={index} className="character-stats">
                                {/* Use index and targetType for accurate targeting */}
                                <h3>{enemy.name} {targetType === "Enemy" && targetedIndex === index && "(Target)"}</h3>
                                <p>
                                    <span>
                                        HP: {enemy.currentHP}/{enemy.maxHP} -
                                        MP: {enemy.currentMP}/{enemy.maxMP} -
                                        SP: {enemy.currentSP}/{enemy.maxSP}
                                    </span>
                                </p>
                                <button onClick={() => handleSelectTarget(enemy, "Enemy", index)}>Select Target</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="area-options">
                <h3>Combat Options</h3>
                {/*Maybe use item etc overhere*/}
                {combatOngoing ? (
                    <>
                        <button className="area-button" onClick={handleCombatRound}>
                            Start Round
                        </button>
                        <button className="area-button" onClick={handleRun}>
                            Run
                        </button>
                    </>
                ) : (
                    <button className="area-button" onClick={() => onCombatEnd("exit", currentHeroes)}>
                        Exit
                    </button>
                )}

            </div>
            <div className="game-content-bottom">
                <h3>Current Target/Current Action </h3>
                <p>{target.name} ({targetType})/{action}</p>
            </div>
        </div>
    );
}

export default CombatArena;