// Equipment.tsx
import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
import { BareChest, BareFist, Equipable } from "../Models/ItemModel"; // Import Item for addItemToInventory
import { useState, useEffect } from "react";
import { instantiateCharacterItems } from "../Utils/CharacterUtils"

// Import the helper function from ItemModel.ts or a separate utils file
import { addItemToInventory } from "../Utils/InventoryUtils"; // Assuming you put it there

interface EquipmentProps {
    hero: Character;
    back: () => void;
    onUpdateHero: (updatedHero: Character) => void;
    addGameLog: (message: string) => void;
}
function Equipment({ hero, back, onUpdateHero, addGameLog }: EquipmentProps) {
    const [currentHero, setCurrentHero] = useState(hero);

    useEffect(() => {
        setCurrentHero(instantiateCharacterItems(hero));
    }, [hero]);

    function handleUnEquipItem(itemToUnEquip: Equipable) {
        const updatedHero: Character = instantiateCharacterItems(JSON.parse(JSON.stringify(currentHero)));

        // Remove the item from its equipped slot
        if (itemToUnEquip.slot === "Chest") {
            updatedHero.chest = new BareChest();
        } else if (itemToUnEquip.slot === "Weapon") {
            updatedHero.weapon = new BareFist();
        }
        // Add more slots as needed

        // Use the common helper to add the unequipped item back to inventory
        addItemToInventory(updatedHero.inventory, itemToUnEquip);

        setCurrentHero(updatedHero);
        onUpdateHero(updatedHero);
        addGameLog(`${currentHero.name} unequipped ${itemToUnEquip.name}.`);
    }

    return (
        <div className="game-layout-grid" id="character-sheet">
            <div className="toolbar">
                <h2>{currentHero.name}'s Equipment</h2>
            </div>
            <div className="game-content-left">
                <h3>Placeholder</h3>
                <p>Placeholder</p>
            </div>
            <div className="game-content-main">
                <div className="stats-display-area">
                    <div className="stats-container">
                        <h3>Weapons</h3>
                        <div className="stats">
                            <p>Weapon: {currentHero.weapon.name} ({currentHero.weapon.power} DMG) {currentHero.weapon.name !== "Bare Fist" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.weapon)}>UnEquip</button> : <></>}</p>
                        </div>
                    </div>
                    <div className="stats-container">
                        <h3>Armor</h3>
                        <div className="stats">
                            <p>Chest: {currentHero.chest.name} ({currentHero.chest.protection}) {currentHero.chest.name !== "Bare Chest" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.chest)}>UnEquip</button> : <></>}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="area-options">
                <h3>Area Options</h3>
                <button className='area-button' onClick={() => back()}>Back</button>
            </div>
            <div className="game-content-bottom">
                <h3>Placeholder</h3>
                <p>Placeholder for Bottom Panel</p>
            </div>
        </div>
    );
}

export default Equipment;