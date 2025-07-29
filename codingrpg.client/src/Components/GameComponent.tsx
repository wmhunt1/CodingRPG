// Game.tsx
// Component Imports
import CharacterSheet from "./CharacterSheetComponent";
import CombatArena from "./CombatComponent";
import CreateCharacter from "./CreateCharacterComponent";
import { MainMenu } from "./MenuComponent";
import Log from "./LogComponent";

// Model Imports
import { Character, Hero, Rat } from "../Models/CharacterModel";

// React Imports
import { useState, useCallback } from "react"; // Added useCallback for memoizing functions

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
    | "Settings";

function Game() {
    const [activeScreen, setActiveScreen] = useState<GameState>("MainMenu");
    const [hero, setHero] = useState<Hero>(new Hero("Hero"));
    const [gameLog, setGameLog] = useState<string[]>(["Welcome to Coding RPG"]);
    const [party, setParty] = useState<Character[]>(() => [hero]); // Initialize party with the hero

    // Memoized callback functions for event handlers
    const handleContinueGame = useCallback(() => {
        setActiveScreen("Game");
    }, []); // No dependencies, as it only sets a static state

    const showCharacterSheet = useCallback(() => {
        setActiveScreen("CharacterSheet");
    }, []);

    const handleCombat = useCallback(() => {
        setActiveScreen("Combat");
    }, []);

    const handleExitGame = useCallback(() => {
        console.log("Exiting Game");
        // In a real application, you might add more exit logic here (e.g., confirm dialog)
    }, []);

    const handleHeal = useCallback(() => {
        setHero((prevHero) => {
            // Use functional update for state based on previous state
            if (prevHero.currentHP < prevHero.maxHP) {
                setGameLog((prevLog) => [...prevLog, `${prevHero.name} fully healed!`]);
                return { ...prevHero, currentHP: prevHero.maxHP };
            }
            setGameLog((prevLog) => [...prevLog, `${prevHero.name} is already at full health.`]);
            return prevHero;
        });
    }, []);

    const handleLoadGame = useCallback(() => {
        setActiveScreen("LoadGame");
    }, []);

    const handleNewGame = useCallback(() => {
        setActiveScreen("NewGame");
    }, []);

    const handleOnCreateEnd = useCallback((updatedHero: Hero) => {
        setHero(updatedHero);
        setParty([updatedHero]); // Ensure party is updated with the new hero
        setActiveScreen("Game");
    }, []);

    const handleSettings = useCallback(() => {
        setActiveScreen("Settings");
    }, []);

    const handleShop = useCallback(() => {
        // Placeholder for shop logic
        setGameLog((prevLog) => [...prevLog, "The shop is not implemented yet."]);
    }, []);

    const handleCombatEnd = useCallback(
        (result: "victory" | "defeat" | "run" | "exit", updatedHeroes: Hero[]) => {
            setActiveScreen("Game");
            setHero(updatedHeroes[0]); // Assuming the first hero in the array is the main player
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
                    combatMessage = "Combat ended."; // Should not happen with defined results
            }
            setGameLog((prevLog) => [...prevLog, combatMessage]);
        },
        [hero.name] // Depend on hero.name for the log message
    );

    const handleUpdateHeroes = useCallback((updatedHeroes: Hero[]) => {
        setParty(updatedHeroes);
        setHero(updatedHeroes[0]); // Keep the main hero updated
    }, []);

    return (
        <div id="game">
            <div className="game-screen">
                {activeScreen === "Combat" && (
                    <CombatArena
                        heroes={party}
                        enemies={[new Rat("Rat")]} // Consider making enemies dynamic
                        onCombatEnd={handleCombatEnd}
                        onUpdateHeroes={handleUpdateHeroes}
                    />
                )}
                {activeScreen === "CharacterSheet" && (
                    <CharacterSheet hero={hero} back={() => setActiveScreen("Game")} />
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
                    <CreateCharacter hero={hero} back={() => setActiveScreen("MainMenu")} onCreateEnd={handleOnCreateEnd} />
                )}
                {activeScreen === "Settings" && (
                    <div className="char-creation">
                        <h2>Settings</h2>
                        <button className="menu-button" onClick={() => setActiveScreen("MainMenu")}>
                            Back
                        </button>
                    </div>
                )}
            </div>
            {activeScreen !== "Combat" && activeScreen !== "NewGame" && <Log logEntries={gameLog} />}
        </div>
    );
}

export default Game;