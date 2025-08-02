import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
import {Item } from "../Models/ItemModel"
import { ShopModel } from "../Models/ShopModel"

import { useState, useEffect } from "react";

interface ShopProps {
    hero: Character;
    back: () => void
    shop: ShopModel
    onUpdateHero: (updatedHero: Character) => void;
    addGameLog: (message: string) => void;
}
type ShopState =
    | "Buy"
    | "Sell";
function Shop({ hero, back, shop, onUpdateHero, addGameLog }: ShopProps) {
    const [activeScreen, setActiveScreen] = useState<ShopState>("Buy");
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
            // Find if the item already exists in the hero's inventory
            const existingItemIndex = updatedHero.inventory.findIndex(
                (item) => item.name === itemToBuy.name
            );

            if (existingItemIndex > -1) {
                // If the item exists, increase its quantity
                updatedHero.inventory[existingItemIndex].quantity += 1;
            } else {
                // If the item is new, add it to the inventory with a quantity of 1
                updatedHero.inventory.push(itemToBuy);
                console.log(updatedHero.inventory)
            }

            // Deduct the cost
            updatedHero.gold -= itemToBuy.cost;

            // Update the state and inform the parent component
            setCurrentHero(updatedHero);
            onUpdateHero(updatedHero);
            addGameLog(`${hero.name} has bought ${itemToBuy.name} for ${itemToBuy.cost} GP.`);
        } else {
            // Log an error if the hero cannot afford the item
            addGameLog(`${hero.name} cannot afford ${itemToBuy.name}.`);
        }
    }
    function handleSellItem(itemToSell: Item) {
        const updatedHero: Character = JSON.parse(JSON.stringify(currentHero));
        updatedHero.gold += itemToSell.cost / 2;
        // Find the index of the item in the updated hero's inventory
        const itemIndex = updatedHero.inventory.findIndex((item: Item) => item.name === itemToSell.name);

        if (itemIndex > -1) {
            // Create a new array for the updated inventory to ensure immutability
            const newInventory = [...updatedHero.inventory];


            newInventory[itemIndex].quantity--;

            if (newInventory[itemIndex].quantity <= 0) {
                newInventory.splice(itemIndex, 1);
            }

            updatedHero.inventory = newInventory;
        }
        setCurrentHero(updatedHero);
        onUpdateHero(updatedHero);
        addGameLog(`${hero.name} has sold ${itemToSell.name} for ${itemToSell.cost/2}.`);
    }
    return (
        <div id="shop">
            <h2>{shop.name}</h2>
            <h3>{currentHero.name}: {currentHero.gold} GP</h3>
            <div id="inventory" className="inventory-wrapper">
                {activeScreen == "Buy" && (<div id="shop-inventory" className="inventory-items-container">
                        <div>
                            {
                                shopInventory.map((item, index) => (
                                    <p key={index}>
                                        {item.name} x {item.quantity}{' '}
                                        <button onClick={() => handleBuyItem(item)}>Buy({item.cost} GP)</button>
                                    </p>
                                ))
                            }
                        </div>
                </div>)}
                {activeScreen == "Sell" && (<div id="player-inventory" className="inventory-items-container">
                    {currentHero.inventory.length > 0 ? (
                        <div>
                            {
                                currentHero.inventory.map((item, index) => (
                                    <p key={index}>
                                        {item.name} x {item.quantity}{' '} 
                                        <button onClick={() => handleSellItem(item)}>Sell({item.cost/2} GP)</button>
                                    </p>
                                ))
                            }
                        </div>
                    ) : (
                        <div><p>Your inventory is empty</p></div>
                    )}
                </div>)}
            </div>
            <div className="controls">
                <button className='menu-button' onClick={() => setActiveScreen("Buy")}>Buy</button>
                <button className='menu-button' onClick={() => setActiveScreen("Sell")}>Sell</button>
                <button className='menu-button' onClick={() => back()}>Back</button>
            </div>
        </div>
    );
}

export default Shop;