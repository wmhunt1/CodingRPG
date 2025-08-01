// Game.tsx
// Component Imports
import CharacterSheet from "./CharacterSheetComponent";
import CombatArena from "./CombatComponent";
import CreateCharacter from "./CreateCharacterComponent";
import { MainMenu } from "./MenuComponent";
import Shop from "./ShopComponent"
import Log from "./LogComponent";

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

    const showCharacterSheet = useCallback(() => {
        setActiveScreen("CharacterSheet");
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
    }, [addGameLog]); // Added addGameLog to dependencies

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
    }, [addGameLog]); // Added addGameLog to dependencies

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
        [hero.name, addGameLog] // Added addGameLog to dependencies
    );

    const handleUpdateHeroes = useCallback((updatedHeroes: Hero[]) => {
        setParty(updatedHeroes);
        setHero(updatedHeroes[0]);
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
                    />
                )}
                {activeScreen === "Game" && (
                    <>
                        <div className="hud">
                            <div className="hud-options">
                                <button className="hud-button" onClick={showCharacterSheet}>
                                    Character Sheet
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
