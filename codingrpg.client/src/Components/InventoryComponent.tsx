import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
import { Item, Equipable } from "../Models/ItemModel";
import { useState, useEffect } from "react";
import { instantiateCharacterItems } from "../Utils/CharacterUtils"
import { removeItemFromInventory } from '../Utils/InventoryUtils';
import { Potion, Food } from "../Models/ItemModel";
import {LeatherworkingSKillNode, SkillNodeModel } from "../Models/SkillNodeModel"

interface InventoryProps {
    hero: Character;
    back: () => void;
    onUpdateHero: (updatedHero: Character) => void;
    addGameLog: (message: string) => void;
    inventorySkillNode: (skillNode: SkillNodeModel) => void;
}

function Inventory({ hero, back, onUpdateHero, addGameLog,inventorySkillNode }: InventoryProps) {
    // The currentHero state tracks which character is selected to receive the item's effects.
    // We initialize it with the main hero from the props.
    const [currentHero, setCurrentHero] = useState(hero);

    // This effect ensures that if the main hero prop changes from the parent,
    // we reset the selected character to the main hero.
    useEffect(() => {
        setCurrentHero(instantiateCharacterItems(hero));
    }, [hero]);

    function handleDropItem(itemToDrop: Item) {
        // Create a deep copy of the main hero to maintain immutability.
        // All changes to the inventory should happen on this object.
        const updatedHero: Character = instantiateCharacterItems(JSON.parse(JSON.stringify(hero)));

        // Remove the item from the main hero's inventory.
        removeItemFromInventory(updatedHero.inventory, itemToDrop, 1);

        // Notify the parent component of the updated hero state.
        onUpdateHero(updatedHero);
        addGameLog(`${hero.name} dropped ${itemToDrop.name}.`);
    }

    function handleUseItem(itemToUse: Item) {
        // Create a deep copy of the main hero to maintain immutability.
        // This is the hero whose inventory we will be modifying.
        const updatedHero: Character = instantiateCharacterItems(JSON.parse(JSON.stringify(hero)));

        // Create a copy of the target character (the one selected from the party list)
        // to apply the item's effects to them specifically.
        const updatedTargetCharacter: Character = instantiateCharacterItems(JSON.parse(JSON.stringify(currentHero)));

        // Let the item's use method handle its effect and inventory changes on the target character.
        // We do this first to make sure the item's logic is applied correctly.
        const newTargetState = itemToUse.use(updatedTargetCharacter);

        // Find the index of the selected character in the updated hero's party.
        // This allows us to update the correct character in the party array.
        const partyMemberIndex = updatedHero.party.findIndex(
            (member) => member.name === currentHero.name
        );

        // Update the character in the party if they are not the main hero.
        if (partyMemberIndex !== -1) {
            updatedHero.party[partyMemberIndex] = newTargetState;
        } else {
            // If the selected character is the main hero, update the main hero directly.
            Object.assign(updatedHero, newTargetState);
        }

        // Now, remove the item from the main hero's inventory.
        removeItemFromInventory(updatedHero.inventory, itemToUse, 1);

        // Update the current hero state to reflect the item's effects on the selected character.
        setCurrentHero(newTargetState);

        // Notify the parent component of the updated hero state.
        onUpdateHero(updatedHero);

        let verb = "";
        if (itemToUse instanceof Potion || itemToUse instanceof Food) {
            verb = (itemToUse instanceof Potion) ? "drank" : "ate";
        } else if (itemToUse instanceof Equipable) {
            verb = "equipped";
        }
        else
        {
            verb = "used";
        }
        addGameLog(`${currentHero.name} ${verb} ${itemToUse.name}.`);
    }

    return (
        <div className="game-layout-grid inventory-wrapper" id="inventory">
            <div className="toolbar">
                {/* The title now reflects the main hero whose inventory is being displayed */}
                <h2>{hero.name}'s Inventory</h2>
            </div>
            <div className="game-content-left">
                <h3>Party</h3>
                <p>{hero.name}</p>
                {/* A button to select the main hero */}
                <button className="action-button" onClick={() => setCurrentHero(hero)}>Select</button>
                {hero.party.map((partyMember, index) => (
                    <div key={index}>
                        <p>{partyMember.name}</p>
                        {/* A button to select a party member */}
                        <button className="action-button" style={{ width: "100%" }} onClick={() => setCurrentHero(partyMember)}>Select</button>
                    </div>
                ))}
            </div>
            <div className="game-content-main inventory-items-container">
                <div className="inventory-display-area">
                    {hero.inventory.length > 0 ? (
                        <div className="inventory-items">
                            {
                                hero.inventory
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((item, index) => {
                                        let buttonText = "Use";
                                        if (item.type === "Food") {
                                            buttonText = "Eat";
                                        } else if (item.type === "Drink" || item.type === "Potion") {
                                            buttonText = "Drink";
                                        } else if (item.type === "Armor" || item.type === "Weapon" || item.type === "Accessory" || item.type === "OffHand" || item.type === "2H Weapon") {
                                            buttonText = "Equip";
                                        }

                                        return (
                                            <div key={index}>
                                                <p>{item.name}</p>
                                                <p>{item.description}</p>
                                                {/* The use button calls handleUseItem, which will use the item on currentHero */}
                                                <button className="use-equip-button" onClick={() => handleUseItem(item)}>
                                                    {buttonText} x {item.quantity}
                                                </button>
                                                {/* The drop button always drops from the main hero's inventory */}
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
                <button className="area-button" onClick={() => inventorySkillNode(new LeatherworkingSKillNode)}>Leatherworking</button>
                <button className='area-button' onClick={() => back()}>Back</button>
            </div>
            <div className="game-content-bottom">
                <h3>Interaction / Status</h3>
                <p>Selected Character: {currentHero.name}</p>
            </div>
        </div>
    );
}

export default Inventory;
