// Game.tsx
// Component Imports
import CharacterSheet from "./CharacterSheetComponent";
import CombatArena from "./CombatComponent";
import CreateCharacter from "./CreateCharacterComponent";
import Inventory from "./InventoryComponent";
import Log from "./LogComponent";
import { MainMenu } from "./MenuComponent";
import Shop from "./ShopComponent"

// Model Imports
import { Character, Hero, Rat } from "../Models/CharacterModel";

// React Imports
import { useState, useCallback } from "react";

// Stylesheet Imports
import "../StyleSheets/GameStyle.css";

// Define possible game states for better readability and type safety
type GameState =
    | "MainMenu"
    | "Game"
    | "CharacterSheet"
    | "Combat"
    | "Inventory"
    | "LoadGame"
    | "NewGame"
    | "Settings"
    | "Shop";

function Game() {
    const [activeScreen, setActiveScreen] = useState<GameState>("MainMenu");
    const [hero, setHero] = useState<Hero>(new Hero("Hero"));
    const [gameLog, setGameLog] = useState<string[]>(["Welcome to Coding RPG"]);
    const [party, setParty] = useState<Character[]>(() => [hero]);

    // This new memoized function is used to add new messages to the game log
    const addGameLog = useCallback((message: string) => {
        setGameLog((prevLog) => [...prevLog, message]);
    }, []);

    // Memoized callback functions for event handlers
    const handleContinueGame = useCallback(() => {
        setActiveScreen("Game");
    }, []);

    const handleCombat = useCallback(() => {
        setActiveScreen("Combat");
    }, []);

    const handleExitGame = useCallback(() => {
        console.log("Exiting Game");
    }, []);

    const handleHeal = useCallback(() => {
        setHero((prevHero) => {
            if (prevHero.currentHP < prevHero.maxHP) {
                // Use the new centralized log function
                addGameLog(`${prevHero.name} fully healed!`);
                return { ...prevHero, currentHP: prevHero.maxHP };
            }
            // Use the new centralized log function
            addGameLog(`${prevHero.name} is already at full health.`);
            return prevHero;
        });
    }, [addGameLog]);

    const handleLoadGame = useCallback(() => {
        setActiveScreen("LoadGame");
    }, []);

    const handleNewGame = useCallback(() => {
        setActiveScreen("NewGame");
    }, []);

    const handleOnCreateEnd = useCallback((updatedHero: Hero) => {
        setHero(updatedHero);
        setParty([updatedHero]);
        setActiveScreen("Game");
    }, []);

    const handleSettings = useCallback(() => {
        setActiveScreen("Settings");
    }, []);

    const handleShop = useCallback(() => {
        setActiveScreen("Shop");
        // Use the new centralized log function
        addGameLog("The shop is not implemented yet.");
    }, [addGameLog]);

    const handleCombatEnd = useCallback(
        (result: "victory" | "defeat" | "run" | "exit", updatedHeroes: Hero[]) => {
            setActiveScreen("Game");
            setHero(updatedHeroes[0]);
            setParty(updatedHeroes);

            let combatMessage: string;
            switch (result) {
                case "victory":
                    combatMessage = `${hero.name} is victorious!`;
                    break;
                case "defeat":
                    combatMessage = `${hero.name} is defeated!`;
                    break;
                case "run":
                    combatMessage = `${hero.name} manages to escape...`;
                    break;
                default:
                    combatMessage = "Combat ended.";
            }
            // Use the new centralized log function
            addGameLog(combatMessage);
        },
        [hero.name, addGameLog]
    );

    const handleUpdateHeroes = useCallback((updatedHeroes: Character[]) => {
        setParty(updatedHeroes);
        // Assuming the first hero in the party is always 'the' hero you want to update
        if (updatedHeroes.length > 0) {
            setHero(updatedHeroes[0] as Hero);
        }
    }, []);

    // --- New callback for updating a single hero specifically from Inventory ---
    const handleUpdateSingleHero = useCallback((updatedHero: Character) => {
        setHero(updatedHero as Hero); // Update the main hero state
        // You'll also need to update the party array if it's meant to reflect the single hero
        setParty([updatedHero]);
    }, []);
    // -------------------------------------------------------------------------

    const showCharacterSheet = useCallback(() => {
        setActiveScreen("CharacterSheet");
    }, []);
    const showInventory = useCallback(() => {
        setActiveScreen("Inventory");
    }, []);

    return (
        <div id="game">
            <div className="game-screen">
                {activeScreen === "CharacterSheet" && (
                    <CharacterSheet hero={hero} back={() => setActiveScreen("Game")} />
                )}
                {activeScreen === "Combat" && (
                    <CombatArena
                        heroes={party}
                        enemies={[new Rat("Rat")]}
                        onCombatEnd={handleCombatEnd}
                        onUpdateHeroes={handleUpdateHeroes}
                        gameLog={gameLog}
                        addGameLog={addGameLog}
                    />
                )}
                {activeScreen === "Game" && (
                    <>
                        <div className="hud">
                            <div className="hud-options">
                                <button className="hud-button" onClick={showCharacterSheet}>
                                    Character Sheet
                                </button>
                                <button className="hud-button" onClick={showInventory}>
                                    Inventory
                                </button>
                                <button className="hud-button" onClick={() => setActiveScreen("MainMenu")}>
                                    Main Menu
                                </button>
                            </div>
                        </div>
                        <div id="game-content">
                            {/* This div could house current area information or events */}
                        </div>
                        <div className="area-options">
                            <h2>Area Options</h2>
                            <button className="area-button" onClick={handleCombat}>
                                Combat Test
                            </button>
                            <button className="area-button" onClick={handleHeal}>
                                Heal Test
                            </button>
                            <button className="area-button" onClick={handleShop}>
                                Shop Test
                            </button>
                        </div>
                    </>
                )}
                {activeScreen === "Inventory" && (
                    <Inventory
                        hero={hero}
                        back={() => setActiveScreen("Game")}
                        onUpdateHero={handleUpdateSingleHero} // Pass the new handler
                        //gameLog={gameLog}
                        addGameLog={addGameLog}
                    />
                )}
                {activeScreen === "LoadGame" && (
                    <div className="menu">
                        <h2>Saves</h2>
                        <button className="menu-button" onClick={() => setActiveScreen("MainMenu")}>
                            Back
                        </button>
                    </div>
                )}
                {activeScreen === "MainMenu" && (
                    <MainMenu
                        continueGame={handleContinueGame}
                        newGame={handleNewGame}
                        loadGame={handleLoadGame}
                        settings={handleSettings}
                        exitGame={handleExitGame}
                    />
                )}
                {activeScreen === "NewGame" && (
                    <CreateCharacter
                        hero={hero}
                        back={() => setActiveScreen("MainMenu")}
                        onCreateEnd={handleOnCreateEnd}
                        // Pass down the gameLog state and the function to update it
                        gameLog={gameLog}
                        addGameLog={addGameLog}
                    />
                )}
                {activeScreen === "Settings" && (
                    <div className="char-creation">
                        <h2>Settings</h2>
                        <button className="menu-button" onClick={() => setActiveScreen("MainMenu")}>
                            Back
                        </button>
                    </div>
                )}
                {activeScreen === "Shop" && (
                    <Shop />
                )}
            </div>
            <Log logEntries={gameLog} />
        </div>
    );
}

export default Game;