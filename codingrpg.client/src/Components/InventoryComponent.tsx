import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
import { Item } from "../Models/ItemModel";
import { useState, useEffect } from "react";

interface InventoryProps {
    hero: Character;
    back: () => void;
    onUpdateHero: (updatedHero: Character) => void;
    addGameLog: (message: string) => void;
}

function Inventory({ hero, back, onUpdateHero, addGameLog }: InventoryProps) {
    const [currentHero, setCurrentHero] = useState(hero);
    const [inventory, setInventory] = useState(hero.inventory);

    useEffect(() => {
        setCurrentHero(hero);
        setInventory(hero.inventory);
    }, [hero]);

    function handleUseItem(itemToUse: Item) {
        const updatedHero: Character = JSON.parse(JSON.stringify(currentHero));

        itemToUse.use(updatedHero); 

        const itemIndex = updatedHero.inventory.findIndex((item: Item) => item.name === itemToUse.name);

        if (itemIndex > -1) {
            const newInventory = [...updatedHero.inventory];


            newInventory[itemIndex].quantity--;

            if (newInventory[itemIndex].quantity <= 0) {
                newInventory.splice(itemIndex, 1);
            }

            updatedHero.inventory = newInventory;
        }

        setCurrentHero(updatedHero);
        setInventory(updatedHero.inventory);
        onUpdateHero(updatedHero);
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
                <h3>Interaction / Status</h3>
                <p>Placeholder for Bottom Panel</p>
            </div>
        </div>
    );
}


export default Inventory;