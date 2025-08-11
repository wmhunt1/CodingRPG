// src/Components/CombatArena.tsx
// Component Imports

// Model Imports
import { Character, Hero } from "../Models/CharacterModel";
import { Item } from "../Models/ItemModel"
import { Spell } from "../Models/SpellModel"

// React Imports
import { useEffect, useState, useCallback, useRef } from "react";

// Stylesheet Imports
import "../StyleSheets/GameStyle.css";

// Utility Imports
import { executeCombatRound } from "../Utils/CombatUtils";
import { checkCombatOutcome } from "../Utils/CombatOutcomeUtils";
import { addItemToInventory, removeItemFromInventory } from "../Utils/InventoryUtils"

interface CombatArenaProps {
    heroes: Character[];
    enemies: Character[];
    onCombatEnd: (result: "victory" | "defeat" | "run" | "exit", heroesUpdated: Character[]) => void;
    onUpdateHeroes: (heroes: Character[]) => void;
    gameLog: string[];
    addGameLog: (message: string) => void;
}

//add target selection later
function CombatArena({ heroes, enemies, onCombatEnd, onUpdateHeroes, addGameLog }: CombatArenaProps) {
    // We now store a copy of the initial enemies to ensure the full list is available for looting on victory
    const originalEnemiesRef = useRef<Character[]>(enemies.map((enemy) => ({ ...enemy })));

    const [combatOngoing, setCombatOngoing] = useState(true);
    const [currentHeroes, setCurrentHeroes] = useState<Character[]>(() =>
        heroes.map((hero) => ({ ...hero }))
    );
    const [currentEnemies, setCurrentEnemies] = useState<Character[]>(() =>
        enemies.map((enemy) => ({ ...enemy }))
    );
    const [action, setAction] = useState("Attack")
    const [target, setTarget] = useState(enemies[0])
    const [targetType, setTargetType] = useState<"Ally" | "Enemy">("Enemy");
    const [useItem, setUseItem] = useState<Item>()
    const [useSpell, setUseSpell] = useState<Spell>()
    // State to hold the index of the selected target
    const [targetedIndex, setTargetedIndex] = useState(0);
    const [round, setRound] = useState(1);
    // New state to manage modal visibility
    const [showItemModal, setShowItemModal] = useState(false);
    const [showSpellModal, setShowSpellModal] = useState(false);
    const [showAbilityModal, setShowAbilityModal] = useState(false);

    useEffect(() => {
        onUpdateHeroes(currentHeroes);
    }, [currentHeroes, onUpdateHeroes]);

    // Pass the original enemies list to the combat outcome check
    const handleCheckCombatOutcome = useCallback(
        (checkedHeroes: Hero[], checkedEnemies: Character[]) => {
            const { combatOngoing: newCombatOngoing, finalHeroes } = checkCombatOutcome(
                checkedHeroes,
                // We now pass the original list of enemies to the check, not the current list
                checkedEnemies,
                originalEnemiesRef.current,
                onCombatEnd,
                addGameLog
            );
            setCombatOngoing(newCombatOngoing);
            if (!newCombatOngoing && finalHeroes) {
                setCurrentHeroes(finalHeroes); // Update heroes with leveled-up versions
            }
        },
        [onCombatEnd, addGameLog, originalEnemiesRef]
    );

    // No longer filtering enemies inside this function
    const handleCombatRound = useCallback(() => {
        if (!combatOngoing) return;
        const selectedTarget = targetType === "Ally" ? currentHeroes[targetedIndex] : currentEnemies[targetedIndex];

        if (action === "Item" && useItem) {
            //later move this to inside the execute combat round
            removeItemFromInventory(currentHeroes[0].inventory, useItem, 1)
            addItemToInventory(selectedTarget.inventory, useItem, 1)
            useItem.use(selectedTarget)
            addGameLog(`${selectedTarget.name} uses a ${useItem.name}`)
        }
        if (action === "Spell" && useSpell) {
            //later move this inside execute combat
            useSpell.cast(currentHeroes[0], selectedTarget)
            addGameLog(`${currentHeroes[0].name} casts ${useSpell.name} on ${selectedTarget.name}`)
        }
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
        setUseItem(undefined)
        setUseSpell(undefined)
    }, [combatOngoing, currentHeroes, currentEnemies, addGameLog, handleCheckCombatOutcome, action, targetType, targetedIndex, round, useItem, useSpell]);

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

    // Handlers to open and close the modals
    const openItemModal = () => setShowItemModal(true);
    const closeItemModal = () => {
        setShowItemModal(false);
        handleSelectAction("Item")
        //setItem
    }
    const openSpellModal = () => setShowSpellModal(true);
    const closeSpellModal = () => {
        setShowSpellModal(false);
        handleSelectAction("Spell")
        //setSpell
    }
    const openAbilityModal = () => setShowAbilityModal(true);
    const closeAbilityModal = () => {
        setShowAbilityModal(false);
        handleSelectAction("Ability")
        //setSpell
    }

    return (
        <div className="game-layout-grid">
            <div className="toolbar">
                <h2>Combat Round {round}</h2>
            </div>
            <div className="game-content-left">
                <h3>Action Options</h3>
                {combatOngoing ? (
                    <>
                        <button className="action-button" onClick={() => handleSelectAction("Attack")}>
                            Basic Attack
                        </button>
                        <button className="action-button" onClick={openItemModal}>
                            Item
                        </button>
                        <button className="action-button" onClick={openSpellModal}>
                            Spell
                        </button>
                        <button className="action-button" onClick={openAbilityModal}>
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

            {/* Item Modal */}
            {showItemModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Inventory</h3>
                        {heroes[0].inventory.map((item, index) => (
                            <div key={index}>
                                <p>{item.name} x {item.quantity}</p>
                                <button className="buy-sell-button" onClick={() => setUseItem(item)}>Use</button>
                            </div>
                        ))}
                        <button onClick={closeItemModal}>Close</button>
                    </div>
                </div>
            )}

            {/* Spell Modal */}
            {showSpellModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Spellbook</h3>
                        {heroes[0].spellBook.map((spell, index) => (
                            <div key={index}>
                                <p>{spell.name} - {spell.manaCost} MP</p>
                                <p>{spell.description}</p>
                                <button className="buy-sell-button" onClick={() => setUseSpell(spell)}>Use</button>
                            </div>
                        ))}
                        <button onClick={closeSpellModal}>Close</button>
                    </div>
                </div>
            )}
            {/* Spell Modal */}
            {showAbilityModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Abilities</h3>
                        {/*Map Combat Spells*/}
                        <p>Abilities not yet implemented.</p>
                        <button onClick={closeAbilityModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CombatArena;