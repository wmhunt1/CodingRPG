import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
import { Item } from "../Models/ItemModel";
import { useState, useEffect } from "react";

interface InventoryProps {
    hero: Character;
    back: () => void;
    // Add the new prop to update the hero in the parent Game component
    onUpdateHero: (updatedHero: Character) => void;
    //gameLog: string[];
    addGameLog: (message: string) => void;
}

function Inventory({ hero, back, onUpdateHero, addGameLog }: InventoryProps) {
    const [currentHero, setCurrentHero] = useState(hero);
    const [inventory, setInventory] = useState(hero.inventory);

    // Use useEffect to synchronize inventory state if hero prop changes
    useEffect(() => {
        setCurrentHero(hero);
        setInventory(hero.inventory);
    }, [hero]);

    function handleUseItem(itemToUse: Item) {
        // Create a deep copy of the hero to avoid direct mutation of the prop's object
        // Ensure that updatedHero is of type Hero for better type safety if possible
        const updatedHero: Character = JSON.parse(JSON.stringify(currentHero));

        // Apply the item's effect to the hero
        itemToUse.use(updatedHero); // Assuming item.use modifies the passed hero object

        // Find the index of the item in the updated hero's inventory
        const itemIndex = updatedHero.inventory.findIndex((item: Item) => item.name === itemToUse.name);

        if (itemIndex > -1) {
            // Create a new array for the updated inventory to ensure immutability
            const newInventory = [...updatedHero.inventory];


            newInventory[itemIndex].quantity--;

            if (newInventory[itemIndex].quantity <= 0) {
                newInventory.splice(itemIndex, 1);
            }

            updatedHero.inventory = newInventory;
        }

        // Update the local state
        setCurrentHero(updatedHero);
        setInventory(updatedHero.inventory);

        // --- Crucial Step: Call the prop function to update the hero in the Game component ---
        onUpdateHero(updatedHero);
        // If you passed addGameLog:
        addGameLog(`${hero.name} ${"slot" in itemToUse ? "equiped" : "used"} ${itemToUse.name}.`);
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
                {inventory.length > 0 ? (
                    <div className="inventory-items">
                        {
                            inventory.map((item, index) => (
                                <p key={index}>
                                    {item.name} ({item.description}) 
                                    <button className="use-equip-button"onClick={() => handleUseItem(item)}>
                                        {"slot" in item ? "Equip" : "Use"} x {item.quantity}</button>
                                </p>
                            ))
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
                {/*Movement*/}
                <h3>Interaction / Status</h3>
                <p>Placeholder for Bottom Panel</p>
            </div>
        </div>
    );
}


export default Inventory;