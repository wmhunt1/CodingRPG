import './App.css';
import Game from "./Components/GameComponent";

function App() {

    return (
        <div>
            <header>
                <h1>Coding RPG</h1>
            </header>
            <main>
                <Game></Game>
            </main>
            <footer>Coding RPG - 2025</footer>
        </div>
    );

}

export default App;

//import React, { useState, useEffect, useCallback } from 'react';

//// --- Type Definitions ---

//// Represents an item in the game
//interface Item {
//    id: string;
//    name: string;
//    description: string;
//    type: 'healing' | 'weapon' | 'misc';
//    effectValue?: number; // e.g., health restored, attack bonus
//}

//// Represents an enemy
//interface Enemy {
//    id: string;
//    name: string;
//    health: number;
//    maxHealth: number;
//    attack: number;
//    description: string;
//    isDefeated: boolean;
//}

//// Represents the player character
//interface Player {
//    health: number;
//    maxHealth: number;
//    attack: number;
//    inventory: Item[];
//    locationId: string; // ID of the current location
//}

//// Represents a location on the map
//interface Location {
//    id: string;
//    name: string;
//    description: string;
//    exits: { [direction: string]: string }; // e.g., { 'north': 'forest', 'east': 'cave' }
//    enemyId?: string; // Optional enemy at this location
//    itemId?: string; // Optional item at this location
//    hasVisited: boolean;
//}

//// --- Game Data (Static) ---

//const items: { [key: string]: Item } = {
//    potion: { id: 'potion', name: 'Health Potion', description: 'Restores 20 health.', type: 'healing', effectValue: 20 },
//    sword: { id: 'sword', name: 'Rusty Sword', description: 'A basic sword. +5 attack.', type: 'weapon', effectValue: 5 },
//    key: { id: 'key', name: 'Old Key', description: 'Might open something.', type: 'misc' },
//};

//const enemies: { [key: string]: Enemy } = {
//    goblin: { id: 'goblin', name: 'Goblin', health: 30, maxHealth: 30, attack: 5, description: 'A small, green creature.', isDefeated: false },
//    orc: { id: 'orc', name: 'Orc', health: 50, maxHealth: 50, attack: 10, description: 'A large, brutish warrior.', isDefeated: false },
//};

//const locations: { [key: string]: Location } = {
//    town_square: {
//        id: 'town_square',
//        name: 'Town Square',
//        description: 'The bustling center of the town. People mill about, and the air smells of fresh bread.',
//        exits: { 'north': 'forest_path', 'east': 'market' },
//        hasVisited: false,
//    },
//    forest_path: {
//        id: 'forest_path',
//        name: 'Forest Path',
//        description: 'A winding path leading into a dense forest. Sunlight barely penetrates the canopy.',
//        exits: { 'south': 'town_square', 'east': 'goblin_den' },
//        enemyId: 'goblin',
//        hasVisited: false,
//    },
//    goblin_den: {
//        id: 'goblin_den',
//        name: 'Goblin Den',
//        description: 'A dark and damp cave, reeking of stale air and something unpleasant.',
//        exits: { 'west': 'forest_path' },
//        itemId: 'sword',
//        enemyId: 'goblin', // Goblin respawns if you leave and come back, for simplicity
//        hasVisited: false,
//    },
//    market: {
//        id: 'market',
//        name: 'Town Market',
//        description: 'Stalls are packed with goods. A merchant calls out for customers.',
//        exits: { 'west': 'town_square', 'north': 'old_ruins' },
//        itemId: 'potion',
//        hasVisited: false,
//    },
//    old_ruins: {
//        id: 'old_ruins',
//        name: 'Old Ruins',
//        description: 'Crumbling stone walls and overgrown vegetation. An eerie silence hangs in the air.',
//        exits: { 'south': 'market' },
//        enemyId: 'orc',
//        hasVisited: false,
//    },
//};

//// --- Initial Game State ---
//const initialPlayerState: Player = {
//    health: 100,
//    maxHealth: 100,
//    attack: 10,
//    inventory: [],
//    locationId: 'town_square',
//};

//function App() {
//    const [player, setPlayer] = useState<Player>(initialPlayerState);
//    const [currentLocation, setCurrentLocation] = useState<Location>(locations[initialPlayerState.locationId]);
//    const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
//    const [gameMessages, setGameMessages] = useState<string[]>([]);
//    const [isCombatActive, setIsCombatActive] = useState(false);
//    const [allLocations, setAllLocations] = useState<{ [key: string]: Location }>(locations);
//    const [allEnemies, setAllEnemies] = useState<{ [key: string]: Enemy }>(enemies);

//    // Function to add a message to the game log
//    const addMessage = useCallback((message: string) => {
//        setGameMessages((prevMessages) => {
//            const newMessages = [...prevMessages, message];
//            // Keep only the last 10 messages for readability
//            return newMessages.slice(Math.max(newMessages.length - 10, 0));
//        });
//    }, []);

//    // Effect to update current location and handle initial events
//    useEffect(() => {
//        const loc = allLocations[player.locationId];
//        if (loc) {
//            setCurrentLocation(loc);
//            addMessage(`You are in the ${loc.name}. ${loc.description}`);

//            // Mark location as visited
//            setAllLocations(prev => ({
//                ...prev,
//                [loc.id]: { ...prev[loc.id], hasVisited: true }
//            }));

//            // Check for enemy at location
//            if (loc.enemyId && !allEnemies[loc.enemyId]?.isDefeated) {
//                const enemy = { ...allEnemies[loc.enemyId] }; // Create a copy to avoid direct state mutation issues
//                setCurrentEnemy(enemy);
//                setIsCombatActive(true);
//                addMessage(`A ${enemy.name} stands before you! Prepare for combat!`);
//            } else {
//                setCurrentEnemy(null);
//                setIsCombatActive(false);
//                // Check for item at location if no active combat
//                if (loc.itemId) {
//                    const item = items[loc.itemId];
//                    if (item && !player.inventory.some(i => i.id === item.id)) { // Only if item not already picked up
//                        addMessage(`You found a ${item.name}! It has been added to your inventory.`);
//                        setPlayer(prev => ({
//                            ...prev,
//                            inventory: [...prev.inventory, item]
//                        }));
//                        // Remove item from location after picking up
//                        setAllLocations(prev => ({
//                            ...prev,
//                            [loc.id]: { ...prev[loc.id], itemId: undefined }
//                        }));
//                    }
//                }
//            }
//        }
//    }, [player.locationId, allLocations, allEnemies, addMessage, player.inventory]);

//    // Handle player movement
//    const handleMove = (direction: string) => {
//        if (isCombatActive) {
//            addMessage("You cannot move while in combat!");
//            return;
//        }
//        const nextLocationId = currentLocation.exits[direction];
//        if (nextLocationId && allLocations[nextLocationId]) {
//            setPlayer(prev => ({ ...prev, locationId: nextLocationId }));
//            addMessage(`You move ${direction}.`);
//        } else {
//            addMessage(`You cannot go ${direction}.`);
//        }
//    };

//    // Handle player attacking the enemy
//    const handleAttack = () => {
//        if (!currentEnemy || !isCombatActive) {
//            addMessage("There's no enemy to attack!");
//            return;
//        }

//        // Player attacks
//        let playerDamage = player.attack;
//        const equippedWeapon = player.inventory.find(item => item.type === 'weapon');
//        if (equippedWeapon && equippedWeapon.effectValue) {
//            playerDamage += equippedWeapon.effectValue;
//            addMessage(`You attack the ${currentEnemy.name} with your ${equippedWeapon.name} for ${playerDamage} damage!`);
//        } else {
//            addMessage(`You attack the ${currentEnemy.name} for ${playerDamage} damage!`);
//        }

//        const newEnemyHealth = currentEnemy.health - playerDamage;
//        setCurrentEnemy(prev => prev ? { ...prev, health: newEnemyHealth } : null);

//        if (newEnemyHealth <= 0) {
//            addMessage(`You defeated the ${currentEnemy.name}!`);
//            setAllEnemies(prev => ({
//                ...prev,
//                [currentEnemy.id]: { ...prev[currentEnemy.id], isDefeated: true }
//            }));
//            setCurrentEnemy(null);
//            setIsCombatActive(false);
//            return; // Combat ends, no enemy counter-attack
//        }

//        // Enemy attacks back
//        const enemyDamage = currentEnemy.attack;
//        const newPlayerHealth = player.health - enemyDamage;
//        setPlayer(prev => ({ ...prev, health: newPlayerHealth }));
//        addMessage(`The ${currentEnemy.name} retaliates for ${enemyDamage} damage!`);

//        if (newPlayerHealth <= 0) {
//            addMessage("You have been defeated! Game Over.");
//            setIsCombatActive(false);
//            // Reset game or show game over screen
//            setPlayer(initialPlayerState);
//            setAllLocations(locations); // Reset locations to initial state
//            setAllEnemies(enemies); // Reset enemies to initial state
//            setGameMessages(["Game Over! Starting a new game..."]);
//        }
//    };

//    // Handle using an item from inventory
//    const handleUseItem = (item: Item) => {
//        if (item.type === 'healing' && item.effectValue) {
//            const restoredHealth = Math.min(player.maxHealth - player.health, item.effectValue);
//            if (restoredHealth > 0) {
//                setPlayer(prev => ({
//                    ...prev,
//                    health: prev.health + restoredHealth,
//                    inventory: prev.inventory.filter(i => i.id !== item.id) // Remove consumed item
//                }));
//                addMessage(`You used a ${item.name} and restored ${restoredHealth} health.`);
//            } else {
//                addMessage("You are already at full health!");
//            }
//        } else if (item.type === 'weapon') {
//            addMessage(`You equip the ${item.name}. Your attack power is now ${player.attack + (item.effectValue || 0)}.`);
//            // For simplicity, we just add the weapon to inventory and it's implicitly 'equipped' if it's the only weapon.
//            // A more complex system would have an 'equipped' slot.
//        } else {
//            addMessage(`You used the ${item.name}. Nothing happened.`);
//        }
//    };

//    return (
//        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white font-inter p-4 sm:p-8 flex items-center justify-center">
//            <div className="bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-4xl border border-gray-700 flex flex-col lg:flex-row gap-6">
//                {/* Left Column: Player Stats & Inventory */}
//                <div className="lg:w-1/3 flex flex-col gap-6">
//                    {/* Player Stats */}
//                    <div className="bg-gray-700 p-4 rounded-lg shadow-inner border border-gray-600">
//                        <h2 className="text-xl font-bold mb-3 text-yellow-400">Player Stats</h2>
//                        <p className="text-lg">Health: <span className="font-semibold text-green-400">{player.health}/{player.maxHealth}</span></p>
//                        <p className="text-lg">Attack: <span className="font-semibold text-red-400">{player.attack + (player.inventory.find(item => item.type === 'weapon')?.effectValue || 0)}</span></p>
//                    </div>

//                    {/* Inventory */}
//                    <div className="bg-gray-700 p-4 rounded-lg shadow-inner border border-gray-600 flex-grow">
//                        <h2 className="text-xl font-bold mb-3 text-yellow-400">Inventory</h2>
//                        {player.inventory.length === 0 ? (
//                            <p className="text-gray-400 italic">Your inventory is empty.</p>
//                        ) : (
//                            <ul className="space-y-2">
//                                {player.inventory.map(item => (
//                                    <li key={item.id} className="flex justify-between items-center bg-gray-600 p-2 rounded-md shadow-sm">
//                                        <div>
//                                            <span className="font-semibold text-blue-300">{item.name}</span>
//                                            <p className="text-sm text-gray-300">{item.description}</p>
//                                        </div>
//                                        <button
//                                            onClick={() => handleUseItem(item)}
//                                            className="ml-4 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 shadow-md transform hover:scale-105"
//                                        >
//                                            Use
//                                        </button>
//                                    </li>
//                                ))}
//                            </ul>
//                        )}
//                    </div>
//                </div>

//                {/* Right Column: Game Area */}
//                <div className="lg:w-2/3 flex flex-col gap-6">
//                    {/* Location & Enemy Display */}
//                    <div className="bg-gray-700 p-4 rounded-lg shadow-inner border border-gray-600">
//                        <h2 className="text-xl font-bold mb-3 text-yellow-400">Current Location: {currentLocation.name}</h2>
//                        <p className="text-lg text-gray-200 mb-4">{currentLocation.description}</p>

//                        {currentEnemy && (
//                            <div className="bg-red-800 bg-opacity-40 p-3 rounded-lg border border-red-700 mb-4">
//                                <h3 className="text-xl font-bold text-red-300 mb-2">Enemy: {currentEnemy.name}</h3>
//                                <p className="text-lg">Health: <span className="font-semibold text-red-400">{currentEnemy.health}/{currentEnemy.maxHealth}</span></p>
//                                <p className="text-lg">Attack: <span className="font-semibold text-red-400">{currentEnemy.attack}</span></p>
//                                <p className="text-gray-300 italic">{currentEnemy.description}</p>
//                                {isCombatActive && (
//                                    <button
//                                        onClick={handleAttack}
//                                        className="mt-4 w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors duration-200 shadow-lg transform hover:scale-105"
//                                    >
//                                        Attack {currentEnemy.name}
//                                    </button>
//                                )}
//                            </div>
//                        )}
//                    </div>

//                    {/* Movement Controls */}
//                    <div className="bg-gray-700 p-4 rounded-lg shadow-inner border border-gray-600">
//                        <h2 className="text-xl font-bold mb-3 text-yellow-400">Explore</h2>
//                        <div className="grid grid-cols-3 gap-2">
//                            <div className="col-span-1"></div> {/* Empty for alignment */}
//                            <button
//                                onClick={() => handleMove('north')}
//                                disabled={!currentLocation.exits.north || isCombatActive}
//                                className="py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//                            >
//                                North
//                            </button>
//                            <div className="col-span-1"></div> {/* Empty for alignment */}

//                            <button
//                                onClick={() => handleMove('west')}
//                                disabled={!currentLocation.exits.west || isCombatActive}
//                                className="py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//                            >
//                                West
//                            </button>
//                            <div className="col-span-1"></div> {/* Empty for alignment */}
//                            <button
//                                onClick={() => handleMove('east')}
//                                disabled={!currentLocation.exits.east || isCombatActive}
//                                className="py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//                            >
//                                East
//                            </button>

//                            <div className="col-span-1"></div> {/* Empty for alignment */}
//                            <button
//                                onClick={() => handleMove('south')}
//                                disabled={!currentLocation.exits.south || isCombatActive}
//                                className="py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//                            >
//                                South
//                            </button>
//                            <div className="col-span-1"></div> {/* Empty for alignment */}
//                        </div>
//                    </div>

//                    {/* Game Messages/Log */}
//                    <div className="bg-gray-700 p-4 rounded-lg shadow-inner border border-gray-600 flex-grow overflow-y-auto max-h-48">
//                        <h2 className="text-xl font-bold mb-3 text-yellow-400">Game Log</h2>
//                        <div className="space-y-1 text-sm text-gray-300">
//                            {gameMessages.map((msg, index) => (
//                                <p key={index} className="leading-tight">{msg}</p>
//                            ))}
//                        </div>
//                    </div>
//                </div>
//            </div>
//        </div>
//    );
//}

//export default App;