// Game.tsx
// Component Imports
import CharacterSheet from "./CharacterSheetComponent";
import CombatArena from "./CombatComponent";
import CreateCharacter from "./CreateCharacterComponent";
import Equipment from "./EquipmentComponent";
import Inventory from "./InventoryComponent";
import Log from "./LogComponent";
import { MainMenu } from "./MenuComponent";
import Settings from "./SettingsComponent";
import Shop from "./ShopComponent"
import Toolbar from "./ToolbarComponent"

// Model Imports
import { Character, Hero, Rat } from "../Models/CharacterModel";
import { ShopModel, TestShop } from "../Models/ShopModel"

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
    | "Equipment"
    | "Inventory"
    | "LoadGame"
    | "NewGame"
    | "Settings"
    | "Shop";

function Game() {
    const [activeScreen, setActiveScreen] = useState<GameState>("MainMenu");
    const [hero, setHero] = useState<Hero>(new Hero("Hero"));
    const [enemies, setEnemies] = useState<Character[]>(() => []);
    const [gameLog, setGameLog] = useState<string[]>(["Welcome to Coding RPG"]);
    const [party, setParty] = useState<Character[]>(() => [hero, ...hero.party])

    //const [combat, setCombat] = useState(null)
    //const [dialogue, setDialogue] = useState(null)
    //const [dungeon, setDungeon] = useState(null)
    const [currentShop, setCurrentShop] = useState<ShopModel>(new TestShop())
    //const [skill, setSkill] = useState(null)
    //const [town, setTown] = useState(null)

    const addGameLog = useCallback((message: string) => {
        setGameLog((prevLog) => [...prevLog, message]);
    }, []);

    const handleContinueGame = useCallback(() => {
        setActiveScreen("Game");
    }, []);

    const handleCombat = useCallback((enemies: Character[]) => {
        console.log("handling combat")
        setActiveScreen("Combat");
        setEnemies(enemies)
    }, [setEnemies]);

    const handleExitGame = useCallback(() => {
        console.log("Exiting Game");
    }, []);

    const handleHeal = useCallback(() => {
        setHero((prevHero) => {
            if (prevHero.currentHP < prevHero.maxHP) {
                const updatedHero = { ...prevHero, currentHP: prevHero.maxHP };

                addGameLog(`${prevHero.name} fully healed!`);

                setParty((prevParty) => {
                    const newParty = [...prevParty];
                    newParty[0] = updatedHero;
                    return newParty;
                });

                // Return the updated hero for the `setHero` state
                return updatedHero;
            }
            // If already at full health, just log a message and return the hero unchanged
            addGameLog(`${prevHero.name} is already at full health.`);
            return prevHero;
        });
    }, [addGameLog, setParty]); // Added setParty to the dependency array
    // --- END OF UPDATED FUNCTION ---

    const handleLoadGame = useCallback(() => {
        setActiveScreen("LoadGame");
    }, []);

    const handleNewGame = useCallback(() => {
        setActiveScreen("NewGame");
    }, []);

    const handleOnCreateEnd = useCallback((updatedHero: Hero) => {
        setHero(updatedHero);
        setParty([updatedHero, ...updatedHero.party]);
        setActiveScreen("Game");
    }, []);

    const handleSettings = useCallback(() => {
        setActiveScreen("Settings");
    }, []);

    const handleShop = useCallback((shop: ShopModel) => {
        setCurrentShop(shop)
        setActiveScreen("Shop")
        // Use the new centralized log function
    }, []);

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
    const showEquipment = useCallback(() => {
        setActiveScreen("Equipment");
    }, []);
    const showInventory = useCallback(() => {
        setActiveScreen("Inventory");
    }, []);

    const area = {
        name: "Test Area", areaOptions: [{
            label: "Combat Test",
            onClick: () => handleCombat([new Rat()]),
        },
        {
            label: "Heal Test",
            onClick: handleHeal,
        },
        {
            label: "Shop Test",
            onClick: () => handleShop(new TestShop()),
        },]
    }

    return (
        <div id="game">
            <div className="game-screen">
                {activeScreen === "CharacterSheet" && (
                    <CharacterSheet hero={hero} back={() => setActiveScreen("Game")} />
                )}
                {activeScreen === "Combat" && (
                    <CombatArena
                        heroes={party}
                        enemies={enemies}
                        onCombatEnd={handleCombatEnd}
                        onUpdateHeroes={handleUpdateHeroes}
                        gameLog={gameLog}
                        addGameLog={addGameLog}
                    />
                )}
                {activeScreen === "Equipment" && (
                    <Equipment hero={hero} back={() => setActiveScreen("Game")} />
                )}
                {activeScreen === "Game" && (
                    // This is the new grid container for the "Game" screen
                    <div className="game-layout-grid">
                        <div className="toolbar">
                            <Toolbar characterSheet={() => showCharacterSheet()} equipment={() => showEquipment()} inventory={() => showInventory()} mainMenu={() => setActiveScreen("MainMenu")} />
                        </div>
                        <div className="game-content-left">
                            <h3>Party</h3>
                            {party.map((partyMember, index) => (
                                <div key={index}>
                                    <p>{partyMember.name} - LV: {partyMember.level}</p>
                                    <p>HP: {partyMember.currentHP}/{partyMember.maxHP}</p>
                                    <p>HP: {partyMember.currentMP}/{partyMember.maxMP}</p>
                                    <p>HP: {partyMember.currentSP}/{partyMember.maxSP}</p>
                                </div>
                            ))}
                        </div>
                        <div className="game-content-main">
                            <h2>{area.name}</h2>
                            <p>Placeholder for Main Game Content</p>
                            {/* Map */}
                        </div>
                        <div className="area-options">
                            <h3>Area Options</h3>
                            {area.areaOptions.map((button, index) => (
                                <button key={index} className="area-button" onClick={button.onClick}>
                                    {button.label}
                                </button>
                            ))}
                        </div>
                        <div className="game-content-bottom">
                            <h3>{area.name} (X,Y)</h3>
                            <p>Controls</p>
                        </div>
                    </div>
                )}
                {activeScreen === "Inventory" && (
                    <Inventory
                        hero={hero}
                        back={() => setActiveScreen("Game")}
                        onUpdateHero={handleUpdateSingleHero}
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
                    <Settings back={() => setActiveScreen("MainMenu")} />
                )}
                {activeScreen === "Shop" && (
                    <Shop hero={hero} back={() => setActiveScreen("Game")} shop={currentShop} onUpdateHero={handleUpdateSingleHero}
                        addGameLog={addGameLog} />
                )}
            </div>
            <Log logEntries={gameLog} />
        </div>
    );
}

export default Game;