import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
import { Item } from "../Models/ItemModel"; // Import Equipable
import { useState, useEffect } from "react";
import { instantiateCharacterItems } from "../Utils/CharacterUtils"
import { removeItemFromInventory } from '../Utils/InventoryUtils';

interface InventoryProps {
    hero: Character;
    back: () => void;
    onUpdateHero: (updatedHero: Character) => void;
    addGameLog: (message: string) => void;
}

function Inventory({ hero, back, onUpdateHero, addGameLog }: InventoryProps) {
    const [currentHero, setCurrentHero] = useState(hero);
    // setInventory state is redundant if currentHero's inventory is always used
    // const [inventory, setInventory] = useState(hero.inventory);

    useEffect(() => {
        setCurrentHero(instantiateCharacterItems(hero));
    }, [hero]);

    function handleDropItem(itemToDrop: Item) {
        // Create a deep copy of currentHero to maintain immutability
        const updatedHero: Character = instantiateCharacterItems(JSON.parse(JSON.stringify(currentHero)));


        removeItemFromInventory(updatedHero.inventory, itemToDrop)
        setCurrentHero(updatedHero);
        // setInventory(newHeroState.inventory); // No longer needed
        onUpdateHero(updatedHero); // Notify parent of the updated hero state
        addGameLog(`${currentHero.name} dropped ${itemToDrop.name}.`);
    }

    function handleUseItem(itemToUse: Item) {
        // Create a deep copy of currentHero to maintain immutability
        const updatedHero: Character = instantiateCharacterItems(JSON.parse(JSON.stringify(currentHero)));

        // Let the item's use method handle its effect and inventory changes
        // The use method returns the modified character
        const newHeroState = itemToUse.use(updatedHero);

        setCurrentHero(newHeroState);
        // setInventory(newHeroState.inventory); // No longer needed
        onUpdateHero(newHeroState); // Notify parent of the updated hero state
        let verb = ""
        if (itemToUse.type === "Drink" || itemToUse.type === "Potion") {
            verb = "drank"
        }
        else if (itemToUse.type === "Armor" || itemToUse.type === "Weapon" || itemToUse.type === "Accessory" || itemToUse.type === "OffHand") {
            verb = "equipped"
        }
        else if (itemToUse.type === "Food") {
            verb = "ate"
        }
        else {
            verb = "used"
        }
        addGameLog(`${currentHero.name} ${verb} ${itemToUse.name}.`);
    }

    return (
        <div className="game-layout-grid inventory-wrapper" id="inventory">
            <div className="toolbar">
                <h2>{currentHero.name}'s Inventory</h2>
            </div>
            <div className="game-content-left">
                <h3>Placeholder</h3>
            </div>
            <div className="game-content-main inventory-items-container">
                <div className="inventory-display-area">
                    {currentHero.inventory.length > 0 ? ( // Use currentHero.inventory directly
                        <div className="inventory-items">
                            {
                                currentHero.inventory.map((item, index) => {
                                    // Determine the button text based on the item type
                                    let buttonText = "Use";
                                    if (item.type === "Food") {
                                        buttonText = "Eat";
                                    } else if (item.type === "Drink" || item.type === "Potion") {
                                        buttonText = "Drink";
                                    } else if (item.type === "Armor" || item.type === "Weapon" || item.type === "Accessory" || item.type === "OffHand") {
                                        buttonText = "Equip";
                                    }

                                    return (
                                        <div key={index}>
                                            <p>{item.name}</p>
                                            <p>{item.description}</p>
                                            <button className="use-equip-button" onClick={() => handleUseItem(item)}>
                                                {buttonText} x {item.quantity}
                                            </button>
                                            <button className="use-equip-button" onClick={() => handleDropItem(item)} >Drop</button>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ) : (
                        <div><p>Your inventory is empty</p></div>
                    )}
                </div>
            </div>
            <div className="area-options">
                <h3>Area Options</h3>
                <button className='area-button' onClick={() => back()}>Back</button>
            </div>
            <div className="game-content-bottom">
                <h3>Interaction / Status</h3>
                <p>Placeholder for Bottom Panel</p>
            </div>
        </div>
    );
}

export default Inventory;