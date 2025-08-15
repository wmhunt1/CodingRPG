import '../StyleSheets/GameStyle.css';
import { Character,Hero } from "../Models/CharacterModel";
import { type DialogueNode} from "../Models/DialogueNodeModel"
import type { CombatEncounter } from '../Models/EncounterModel';
import { Item } from "../Models/ItemModel"
import { SkillNodeModel } from "../Models/SkillNodeModel"
import { addItemToInventory, removeItemFromInventory } from "../Utils/InventoryUtils"; // Assuming you put it there
import { InnShop, ShopModel } from "../Models/ShopModel"

import { useState, useEffect } from "react";
import { fullHeal } from '../Utils/GameUtil';
//import Inventory from './InventoryComponent';

interface ShopProps {
    hero: Character;
    back: () => void
    shop: ShopModel
    onUpdateHero: (updatedHero: Character) => void;
    addGameLog: (message: string) => void;
    shopSkillNode: (skillNode: SkillNodeModel) => void;
    shopCombatEncounter: (combatEncounter: CombatEncounter) => void;
    shopConversation: (dialogueGenerator: (hero: Hero, addGameLog: (message: string) => void) => DialogueNode[]) => void;
}
function Shop({ hero, back, shop, onUpdateHero, addGameLog, shopSkillNode, shopCombatEncounter,shopConversation }: ShopProps) {
    //const [activeScreen, setActiveScreen] = useState<ShopState>("Buy");
    const [currentHero, setCurrentHero] = useState(hero);
    const shopInventory = shop.inventory;
    useEffect(() => {
        setCurrentHero(hero);
    }, [hero]);


    function handleBuyItem(itemToBuy: Item) {
        // Create a deep copy of the hero to avoid direct mutation
        const updatedHero: Character = JSON.parse(JSON.stringify(currentHero));

        // Check if the hero can afford the item
        if (updatedHero.gold >= itemToBuy.cost) {
            addItemToInventory(updatedHero.inventory, itemToBuy, 1)
            // Deduct the cost
            updatedHero.gold -= itemToBuy.cost;
            setCurrentHero(updatedHero);
            onUpdateHero(updatedHero);
            addGameLog(`${hero.name} has bought ${itemToBuy.name} for ${itemToBuy.cost} GP.`);
        } else {
            // Log an error if the hero cannot afford the item
            addGameLog(`${hero.name} cannot afford ${itemToBuy.name}.`);
        }
    }
    function handleInnStay(cost: number) {
        const updatedHero: Character = JSON.parse(JSON.stringify(currentHero));
        if (updatedHero.gold >= cost) {
            updatedHero.gold -= cost;
            fullHeal(updatedHero)
            setCurrentHero(updatedHero);
            onUpdateHero(updatedHero);
            addGameLog(`${hero.name} stays the night for ${cost} GP.`);
        } else {
            // Log an error if the hero cannot afford the item
            addGameLog(`${hero.name} cannot afford a bed.`);
        }
    }
    function handleSellItem(itemToSell: Item) {
        const updatedHero: Character = JSON.parse(JSON.stringify(currentHero));
        updatedHero.gold += Math.floor(itemToSell.cost / 2);
        // Find the index of the item in the updated hero's inventory
        removeItemFromInventory(updatedHero.inventory, itemToSell, 1)
        setCurrentHero(updatedHero);
        onUpdateHero(updatedHero);
        addGameLog(`${hero.name} has sold ${itemToSell.name} for ${Math.floor(itemToSell.cost / 2)} GP.`);
        console.log(updatedHero.party)
    }
    return (
        <div id="shop" className="inventory-layout-grid">
            <div className="toolbar">
                <h2>{shop.name}</h2>
            </div>
            <div className="inventory-content-left">
                <h3>Player Gold</h3>
                <p>{currentHero.gold} GP</p>
                {/*or put skilling and talking options*/}
            </div>
            <div className="inventory-content-main">
                <div className="inventory-display-area">
                    <div id="shop-inventory" className="inventory-items-container">
                        <h3>Buy</h3>
                        <div className="shop-items">
                            {
                                shopInventory
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((item, index) => (
                                        <div key={index}>
                                            <p>{item.name}</p>
                                            <p>{item.description}</p>
                                            <button className="buy-sell-button" onClick={() => handleBuyItem(item)}>Buy ({item.cost} GP)</button>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                    <div id="player-inventory" className="inventory-items-container">
                        <h3>Sell</h3>
                        <div>
                            {currentHero.inventory.length > 0 ? (
                                <div className="shop-items">
                                    {
                                        currentHero.inventory
                                            .sort((a, b) => a.name.localeCompare(b.name)).
                                            map((item, index) => (
                                                <div key={index}>
                                                    <p>{item.name} x {item.quantity}</p>
                                                    <button className="buy-sell-button" onClick={() => handleSellItem(item)}>Sell ({Math.floor(item.cost / 2)} GP)</button>
                                                </div>
                                            ))
                                    }
                                </div>
                            ) : (
                                <div className="shop-items"><p>Your inventory is empty</p></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="inventory-options">
         {/*       <h3>Options</h3>*/}
                {shop instanceof InnShop ?<div><h3>Inn Price</h3> <button className='area-button' onClick={() => handleInnStay(shop.innStay)}>Rest ({shop.innStay} GP)</button></div> : <></>}
                <h3>Skills</h3>
                {
                    shop.skillNodes.map((item, index) => (
                        <div key={index}>
                            <button className="area-button" onClick={() => shopSkillNode(item)}>Use {item.name}</button>
                        </div>
                    ))
                }
                <div>
                    <h3>People</h3>
                    {shop.conversations.map((dialogueGenerator, index) => (
                        // Pass the dialogue function, not the result
                        <button key={index} className="area-button" onClick={() => shopConversation(dialogueGenerator)}>
                            Speak with {dialogueGenerator(hero, addGameLog)[0].character}
                        </button>
                    ))}
                </div>
                {shop.combatEncounter.name !== "None" &&
                <div>
                <h3>Combat Encounter</h3>
                        <button className='area-button' onClick={() => shopCombatEncounter(shop.combatEncounter)}>{shop.combatEncounter.name}</button>
                    </div>
                }
                <button className='area-button' onClick={() => back()}>Leave</button>
            </div>
            {/*<div className="game-content-bottom">*/}
            {/*    <h3>Interaction / Status</h3>*/}
            {/*    <p>Placeholder for Bottom Panel</p>*/}
            {/*    <p>Maybe put rest here or cooking etc</p>*/}
            {/*</div>*/}
        </div>
    );
}

export default Shop;