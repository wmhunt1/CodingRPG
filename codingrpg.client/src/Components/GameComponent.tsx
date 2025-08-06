// Game.tsx
// Component Imports
import CharacterSheet from "./CharacterSheetComponent";
import CombatArena from "./CombatComponent";
import Compass from "./CompassComponent"
import CreateCharacter from "./CreateCharacterComponent";
import Equipment from "./EquipmentComponent";
import Inventory from "./InventoryComponent";
import LoadGame from "./LoadGameComponent";
import Log from "./LogComponent";
import { MainMenu } from "./MenuComponent";
import Settings from "./SettingsComponent";
import Shop from "./ShopComponent"
import SkillNode from "./SkillNodeComponent";
import Toolbar from "./ToolbarComponent"

// Model Imports
import { AreaModel, NotArea, StartingVillage } from "../Models/AreaModel"
import { Character, Hero } from "../Models/CharacterModel";
import {CombatEncounter, NoCombatEncounter } from "../Models/EncounterModel"
import { CombatLocation, Location, ShopLocation, SkillLocation } from "../Models/LocationModel"
import { ValleyMap } from "../Models/MapModel"
import { ShopModel } from "../Models/ShopModel"
import { SkillNodeModel } from "../Models/SkillNodeModel"

// React Imports
import { useCallback, useMemo, useState } from "react";

// Stylesheet Imports
import "../StyleSheets/GameStyle.css";

//Util Imports
import { calculateNewLocation } from "../Utils/MovementUtil"

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
    | "Shop"
    | "SkillNode";

type AppLocation = CombatLocation | ShopLocation | SkillLocation | Location;

function Game() {
    const [activeScreen, setActiveScreen] = useState<GameState>("MainMenu");
    const [area, setArea] = useState<AreaModel>(new StartingVillage());
    const [currentShop, setCurrentShop] = useState<ShopModel>(new ShopModel("", [],[],new NoCombatEncounter()))
    const [currentSkillNode, setCurrentSkillNode] = useState<SkillNodeModel>(new SkillNodeModel("Empty", []))
    const [hero, setHero] = useState<Hero>(new Hero("Hero"));
    const [enemies, setEnemies] = useState<CombatEncounter>(new CombatEncounter("",[]))
    const [gameLog, setGameLog] = useState<string[]>(["Welcome to Coding RPG"]);
    const [lastScreen, setLastScreen] = useState<GameState>("Game");
    const [party, setParty] = useState<Character[]>(() => [hero, ...hero.party])

    const areaMap = useMemo(() => {
        return new ValleyMap();
    }, [])


    // --- UPDATED CODE STARTS HERE --

    // Create a memoized array of surrounding areas for efficient rendering
    const surroundingAreas = useMemo(() => {
        const areas = [];
        for (let y = area.yCoord + 2; y >= area.yCoord - 2; y--) {
            for (let x = area.xCoord - 2; x <= area.xCoord + 2; x++) {
                // Find the area by coordinates. If not found, create a new NotArea.
                const foundArea = areaMap.areas.find(a => a.xCoord === x && a.yCoord === y) || new NotArea(x, y);
                areas.push(foundArea);
            }
        }
        return areas;
    }, [area.xCoord, area.yCoord, areaMap.areas]); // Recalculate only when the current area changes

    // --- UPDATED CODE ENDS HERE ---

    const addGameLog = useCallback((message: string) => {
        setGameLog((prevLog) => [...prevLog, message]);
    }, []);

    const handleContinueGame = useCallback(() => {
        setActiveScreen("Game");
    }, []);

    const handleCombat = useCallback((enemies: CombatEncounter) => {
        setActiveScreen("Combat");
        setEnemies(enemies)
    }, [setEnemies]);

    const handleExitGame = useCallback(() => {
        console.log("Exiting Game");
    }, []);

    // --- END OF UPDATED FUNCTION ---

    const handleLoadGame = useCallback(() => {
        setActiveScreen("LoadGame");
    }, []);
    const handleMovement = useCallback((direction: string) => {
        const { newArea, way, message } = calculateNewLocation(area.xCoord, area.yCoord, direction, areaMap);

        if (newArea) {
            setArea(newArea);
            addGameLog(`${hero.name} travels ${way} to ${newArea.name}`);
        } else {
            addGameLog(message || `You cannot go that way`); // Use the message from utility or a default
        }
    }, [addGameLog, area, hero, areaMap]);

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
        setLastScreen("Shop")
    }, []);
    const handleSkillNode = useCallback((skillNode: SkillNodeModel) => {
        setCurrentSkillNode(skillNode)
        console.log(skillNode.name)
        setActiveScreen("SkillNode")
    }, []);
    const handleLocation = useCallback((location: AppLocation) => {
        if ("combatEncounter" in location) {
            handleCombat(location.combatEncounter);
        }
        if ("shop" in location) {
            handleShop(location.shop);
        }
        if ("skillNode" in location) {
            handleSkillNode(location.skillNode)
        }

    }, [handleCombat, handleShop, handleSkillNode]);

    const handleCombatEnd = useCallback(
        (result: "victory" | "defeat" | "run" | "exit", updatedHeroes: Hero[]) => {
            setActiveScreen(lastScreen);
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

            addGameLog(combatMessage);
        },
        [hero.name, addGameLog,lastScreen]
    );
    const handleUpdateHeroes = useCallback((updatedHeroes: Character[]) => {
        setParty(updatedHeroes);

        if (updatedHeroes.length > 0) {
            setHero(updatedHeroes[0] as Hero);
        }
    }, []);


    const handleUpdateSingleHero = useCallback((updatedHero: Character) => {
        setHero(updatedHero as Hero);

        setParty([updatedHero]);
    }, []);

    const showCharacterSheet = useCallback(() => {
        setActiveScreen("CharacterSheet");
    }, []);
    const showEquipment = useCallback(() => {
        setActiveScreen("Equipment");
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
                        enemies={enemies.combatants}
                        onCombatEnd={handleCombatEnd}
                        onUpdateHeroes={handleUpdateHeroes}
                        gameLog={gameLog}
                        addGameLog={addGameLog}
                    />
                )}
                {activeScreen === "Equipment" && (
                    <Equipment hero={hero}
                        back={() => setActiveScreen("Game")}
                        onUpdateHero={handleUpdateSingleHero}
                        addGameLog={addGameLog} />
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
                            <div className="area-map">
                                {/* This is the updated code for rendering the map grid */}
                                {surroundingAreas.map((surroundingArea, index) => {
                                    // Determine if the current area in the loop is the player's current location
                                    const isCurrentLocation = surroundingArea.xCoord === area.xCoord && surroundingArea.yCoord === area.yCoord;
                                    const imageClassName = `area-image${isCurrentLocation ? ' current-location' : ''}`;

                                    return (
                                        // The 'area-image-row' divs are no longer needed
                                        <img key={index} className={imageClassName} src={surroundingArea.imageSrc} alt={surroundingArea.imageAlt} />
                                    );
                                })}
                            </div>
                        </div>
                        <div className="area-options">
                            <h3>Area Options</h3>
                            {area.locations.map((location, index) => (
                                <button key={index} className="area-button" onClick={() => handleLocation(location)}>
                                    {location.name}
                                </button>
                            ))}
                        </div>
                        <div className="game-content-bottom">
                            <div id="area-info">
                                <h3>{area.name} ({area.xCoord},{area.yCoord})</h3>
                            </div>
                            <Compass move={handleMovement}></Compass>
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
                    <LoadGame back={() => setActiveScreen("MainMenu")}></LoadGame>
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
                    <Shop hero={hero} back={() => {
                        setActiveScreen("Game")
                        setLastScreen("Game")
                    }
                    } shop={currentShop} onUpdateHero={handleUpdateSingleHero}
                        addGameLog={addGameLog} shopSkillNode={handleSkillNode} shopCombatEncounter={handleCombat} />
                )}
                {activeScreen === "SkillNode" && (

                    <SkillNode hero={hero} back={() => setActiveScreen(lastScreen)} skillNode={currentSkillNode} onUpdateHero={handleUpdateSingleHero}
                        addGameLog={addGameLog} />
                )}
            </div>
            <Log logEntries={gameLog} />
        </div>
    );
}

export default Game;