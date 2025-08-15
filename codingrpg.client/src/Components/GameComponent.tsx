// Game.tsx
// Component Imports
import CharacterSheet from "./CharacterSheetComponent";
import CombatArena from "./CombatComponent";
import Compass from "./CompassComponent"
import CreateCharacter from "./CreateCharacterComponent";
import DialogueSystem from "./DialogueSystemComponent";
import Equipment from "./EquipmentComponent";
import Inventory from "./InventoryComponent";
import Journal from "./JournalComponent";
import LoadGame from "./LoadGameComponent";
import Log from "./LogComponent";
import { MainMenu } from "./MenuComponent";
import PartySidebar from "./PartySidebarComponent";
import Settings from "./SettingsComponent";
import Shop from "./ShopComponent"
import SkillBook from "./SkillBookComponent"
import SkillNode from "./SkillNodeComponent";
import SpellBook from "./SpellBookComponent"
import Toolbar from "./ToolbarComponent"

// Model Imports
import { AreaModel, NotArea, StartingVillage } from "../Models/AreaModel"
import { Character, Hero } from "../Models/CharacterModel";
// We now import the function, not the dialogue array itself
import { type DialogueNode, getRawMinnowQuest1Dialogue } from "../Models/DialogueNodeModel"
import { DialogueManager } from "../Models/DialogueManager"
import { CombatEncounter, NoCombatEncounter } from "../Models/EncounterModel"
import { CombatLocation, Location, ShopLocation, SkillLocation } from "../Models/LocationModel"
import { ValleyMap } from "../Models/MapModel"
import { Quest } from "../Models/QuestModel"
import { ShopModel } from "../Models/ShopModel"
import { SkillNodeModel } from "../Models/SkillNodeModel"

// React Imports
import { useCallback, useMemo, useState } from "react";

// Stylesheet Imports
import "../StyleSheets/GameStyle.css";

//Util Imports
import { instantiateCharacterItems } from "../Utils/CharacterUtils"
import { calculateNewLocation } from "../Utils/MovementUtil"
import { acceptQuest, checkQuestProgress } from "../Utils/QuestUtils";
import { QuestManager } from "../Models/QuestManager";


// Define possible game states for better readability and type safety
type GameState =
    | "MainMenu"
    | "Game"
    | "CharacterSheet"
    | "Combat"
    | "Dialogue"
    | "Equipment"
    | "Inventory"
    | "Journal"
    | "LoadGame"
    | "NewGame"
    | "Settings"
    | "Shop"
    | "SkillBook"
    | "SkillNode"
    | "SpellBook";

type AppLocation = CombatLocation | ShopLocation | SkillLocation | Location;

function Game() {
    const [activeScreen, setActiveScreen] = useState<GameState>("MainMenu");
    const [area, setArea] = useState<AreaModel>(new StartingVillage());
    const [currentShop, setCurrentShop] = useState<ShopModel>(new ShopModel("", [], [], new NoCombatEncounter(),[]))
    const [currentSkillNode, setCurrentSkillNode] = useState<SkillNodeModel>(new SkillNodeModel("Empty", []))
    const [hero, setHero] = useState<Hero>(new Hero("Hero"));
    const [enemies, setEnemies] = useState<CombatEncounter>(new CombatEncounter("", []))
    const [gameLog, setGameLog] = useState<string[]>(["Welcome to Coding RPG"]);
    const [lastScreen, setLastScreen] = useState<GameState>("Game");
    const [party, setParty] = useState<Character[]>(() =>
        hero.party.map((partyMember) => ({ ...partyMember }))
    );
    const questManager = useMemo(() => new QuestManager(), []);
    // Initialize state by calling the dialogue function with the hero object

    const areaMap = useMemo(() => {
        return new ValleyMap();
    }, [])
    const availableQuests = area.quests.filter(quest => {
        const journalEntry = hero.journal.find(journalQuest => journalQuest.id === quest.id);
        return !journalEntry || journalEntry.status !== "Completed";
    });
    // --- UPDATED CODE STARTS HERE --

    // Create a memoized array of surrounding areas for efficient rendering
    const surroundingAreas = useMemo(() => {
        const areas = [];
        for (let y = area.yCoord + 4; y >= area.yCoord - 4; y--) {
            for (let x = area.xCoord - 4; x <= area.xCoord + 4; x++) {
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

    const [currentDialogueData, setCurrentDialogueData] = useState<DialogueNode[]>(getRawMinnowQuest1Dialogue(hero, addGameLog));
    const dialogueManager = useMemo(() => new DialogueManager(currentDialogueData, questManager), [currentDialogueData, questManager]);

    const handleContinueGame = useCallback(() => {
        setActiveScreen("Game");
    }, []);

    const handleCombat = useCallback((enemies: CombatEncounter) => {
        setActiveScreen("Combat");
        setEnemies(enemies)
    }, [setEnemies]);

    // The handleDialogue function now accepts a function that generates dialogue
    const handleDialogue = useCallback((dialogueGenerator: (hero: Hero, addGameLog: (message: string) => void) => DialogueNode[]) => {
        // Call the dialogue generator function with the current hero object
        const dialogueData = dialogueGenerator(hero, addGameLog);
        setCurrentDialogueData(dialogueData);
        setActiveScreen("Dialogue");
    }, [hero, addGameLog]); // Add hero as a dependency

    const handleExitGame = useCallback(() => {
        console.log("Exiting Game");
    }, []);

    const handleLoadGame = useCallback(() => {
        const storedHero = localStorage.getItem('currentUser');
        console.log(storedHero)
        const updatedHero = instantiateCharacterItems(storedHero ? JSON.parse(storedHero) : null)
        addGameLog("Loading Character..." + updatedHero.name)
        setHero(updatedHero)

    }, [addGameLog]);

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
        setParty([...updatedHero.party]);
        setActiveScreen("Game");
    }, []);

    const handleQuest = useCallback((handledQuest: Quest) => {
        const existingQuest = hero.journal.find(quest => quest.name === handledQuest.name);
        if (!existingQuest) {
            acceptQuest(hero, hero.journal, handledQuest, addGameLog)
        }
        else {
            checkQuestProgress(hero, hero.journal, handledQuest, addGameLog)
        }
    }, [hero, addGameLog]);
    const handleSaveGame = useCallback((hero: Character) => {
        console.log(hero.name)
        localStorage.setItem('currentUser', JSON.stringify(hero));
        addGameLog("Saving Character... " + hero.name)
    }, [addGameLog]);

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
        (result: "victory" | "defeat" | "run" | "exit", updatedHeroes: Character[]) => {
            setActiveScreen(lastScreen);
            setHero(updatedHeroes[0]);
            setParty(updatedHeroes[0].party);

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
        [hero.name, addGameLog, lastScreen]
    );
    const handleUpdateHeroes = useCallback((updatedHeroes: Character[]) => {
        setHero(updatedHeroes[0] as Hero)
        setParty(updatedHeroes[0].party);

        if (updatedHeroes.length > 0) {
            setHero(updatedHeroes[0] as Hero);
        }
    }, []);


    const handleUpdateSingleHero = useCallback((updatedHero: Character) => {
        setHero(updatedHero as Character);
    }, []);

    const showCharacterSheet = useCallback(() => {
        setActiveScreen("CharacterSheet");
    }, []);
    const showEquipment = useCallback(() => {
        setActiveScreen("Equipment");
    }, []);
    const showInventory = useCallback(() => {
        setLastScreen("Inventory")
        setActiveScreen("Inventory");
    }, []);
    const showJournal = useCallback(() => {
        setActiveScreen("Journal");
    }, []);
    const showSkillBook = useCallback(() => {
        setActiveScreen("SkillBook");
    }, []);
    const showSpellBook = useCallback(() => {
        setActiveScreen("SpellBook");
    }, []);
    return (
        <div id="game">
            <div className="game-screen">
                {activeScreen === "CharacterSheet" && (
                    <CharacterSheet hero={hero} back={() => setActiveScreen("Game")} />
                )}
                {activeScreen === "Combat" && (
                    <CombatArena
                        heroes={[hero, ...party]}
                        enemies={enemies.combatants}
                        onCombatEnd={handleCombatEnd}
                        onUpdateHeroes={handleUpdateHeroes}
                        gameLog={gameLog}
                        addGameLog={addGameLog}
                    />
                )}
                {activeScreen === "Dialogue" && (
                    <DialogueSystem dialogueManager={dialogueManager}
                        back={() => {
                            setActiveScreen("Game")
                            setLastScreen("Game")
                        }} />
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
                            <Toolbar characterSheet={() => showCharacterSheet()} equipment={() => showEquipment()} inventory={() => showInventory()} journal={() => showJournal()} skill={() => showSkillBook()} spell={() => showSpellBook()} mainMenu={() => setActiveScreen("MainMenu")} />
                        </div>
                        <div className="game-content-left">
                            <PartySidebar hero={hero} party={party} />
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
                            <div>
                                <h3>Area Options</h3>
                                {area.locations.map((location, index) => (
                                    <button key={index} className="area-button" onClick={() => handleLocation(location)}>
                                        {location.name}
                                    </button>
                                ))}
                            </div>
                            <div>
                                <h3>Quests</h3>
                                {availableQuests.length > 0 ? (
                                    // If there are available quests, map over them and render the buttons
                                    availableQuests.map((quest, index) => (
                                        <button key={index} className="area-button" onClick={() => handleQuest(quest)}>
                                            {quest.name}
                                        </button>
                                    ))
                                ) : (
                                    // If the available quests array is empty, display the message
                                    <p>No available quests.</p>
                                )}
                            </div>
                            <div>
                                <h3>People</h3>
                                {area.conversations.map((dialogueGenerator, index) => (
                                    // Pass the dialogue function, not the result
                                    <button key={index} className="area-button" onClick={() => handleDialogue(dialogueGenerator)}>
                                        Speak with {dialogueGenerator(hero, addGameLog)[0].character}
                                    </button>
                                ))}
                            </div>
                            {/*<div>*/}
                            {/*    <h3>Test Features</h3>*/}
                            {/*    <button className="area-button" onClick={() => handleDialogue(getRawMinnowQuest1Dialogue)}>*/}
                            {/*        Speak with Old Fisherman*/}
                            {/*    </button>*/}
                            {/*</div>*/}
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
                        back={() => {
                            setActiveScreen("Game")
                            setLastScreen("Game")
                        }}
                        onUpdateHero={handleUpdateSingleHero}
                        addGameLog={addGameLog}
                        inventorySkillNode={handleSkillNode}
                    />
                )}
                {activeScreen === "Journal" && (
                    <Journal hero={hero} back={() => setActiveScreen("Game")} />
                )}
                {activeScreen === "LoadGame" && (
                    <LoadGame back={() => setActiveScreen("MainMenu")}></LoadGame>
                )}
                {activeScreen === "MainMenu" && (
                    <MainMenu
                        continueGame={handleContinueGame}
                        newGame={handleNewGame}
                        loadGame={handleLoadGame}
                        hero={hero}
                        saveGame={handleSaveGame}
                        settings={handleSettings}
                        exitGame={handleExitGame}
                    />
                )}
                {activeScreen === "NewGame" && (
                    <CreateCharacter
                        hero={hero}
                        back={() => setActiveScreen("MainMenu")}
                        onCreateEnd={handleOnCreateEnd}
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
                        addGameLog={addGameLog} shopSkillNode={handleSkillNode} shopCombatEncounter={handleCombat} shopConversation={handleDialogue} />
                )}
                {activeScreen === "SkillBook" && (
                    <SkillBook hero={hero} back={() => setActiveScreen("Game")} />
                )}
                {activeScreen === "SkillNode" && (
                    <SkillNode hero={hero} back={() => setActiveScreen(lastScreen)} skillNode={currentSkillNode} onUpdateHero={handleUpdateSingleHero}
                        addGameLog={addGameLog} />
                )}
                {activeScreen === "SpellBook" && (
                    <SpellBook hero={hero} back={() => setActiveScreen("Game")} addGameLog={addGameLog} />
                )}
            </div>
            <Log logEntries={gameLog} />
        </div>
    );
}

export default Game;
