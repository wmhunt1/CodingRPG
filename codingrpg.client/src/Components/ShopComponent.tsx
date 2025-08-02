import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
import { Item } from "../Models/ItemModel"
import { ShopModel } from "../Models/ShopModel"

import { useState, useEffect } from "react";

interface ShopProps {
    hero: Character;
    back: () => void
    shop: ShopModel
    onUpdateHero: (updatedHero: Character) => void;
    addGameLog: (message: string) => void;
}
//type ShopState =
//    | "Buy"
//    | "Sell";
function Shop({ hero, back, shop, onUpdateHero, addGameLog }: ShopProps) {
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
        updatedHero.gold += Math.floor(itemToSell.cost / 2);
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
        addGameLog(`${hero.name} has sold ${itemToSell.name} for ${Math.floor(itemToSell.cost / 2)}.`);
    }
    return (
        <div id="shop" className="game-layout-grid">
            <div className="toolbar">
                <h2>{shop.name}</h2>
            </div>
            <div className="game-content-left">
                <h3>Player Gold</h3>
                <p>{currentHero.gold} GP</p>
            </div>
            <div className="game-content-main">
            <div className="inventory-display-area">
           <div id="shop-inventory" className="inventory-items-container">
           <h3>Buy</h3>
                    <div className="shop-items">
                        {
                            shopInventory.map((item, index) => (
                                <p key={index}>
                                    <button className="buy-sell-button" onClick={() => handleBuyItem(item)}>Buy {item.name} ({item.description}) ({item.cost} GP)</button>
                                </p>
                            ))
                        }
                    </div>
                </div>
                    <div id="player-inventory" className="inventory-items-container">
                <h3>Sell</h3>
                <div>
                    {currentHero.inventory.length > 0 ? (
                        <div className = "shop-items">
                            {
                                currentHero.inventory.map((item, index) => (
                                    <p key={index}>
                                        <button className="buy-sell-button" onClick={() => handleSellItem(item)}>Sell {item.name} x {item.quantity}{' '} ({Math.floor(item.cost / 2)} GP)</button>
                                    </p>
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
            <div className="area-options">
                <h3>Options</h3>
                {/*<button className='area-button' onClick={() => setActiveScreen("Buy")}>Buy</button>*/}
                {/*<button className='area-button' onClick={() => setActiveScreen("Sell")}>Sell</button>*/}
                <button className='area-button' onClick={() => back()}>Leave</button>
            </div>
            <div className="game-content-bottom">
                {/*Movement*/}
                <h3>Interaction / Status</h3>
                <p>Placeholder for Bottom Panel</p>
            </div>
        </div>
    );
}

export default Shop;