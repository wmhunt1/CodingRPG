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
function Shop({ hero, back, shop, onUpdateHero, addGameLog }: ShopProps) {
    const [currentHero, setCurrentHero] = useState(hero);
    const shopInventory = shop.inventory;
    useEffect(() => {
        setCurrentHero(hero);
    }, [hero]);

    function handleBuyItem(itemToBuy: Item) {
        // Create a deep copy of the hero to avoid direct mutation of the prop's object
        // Ensure that updatedHero is of type Hero for better type safety if possible
        const updatedHero: Character = JSON.parse(JSON.stringify(currentHero));

        if (updatedHero.gold >= itemToBuy.cost) {
            updatedHero.gold -= itemToBuy.cost;
            updatedHero.inventory.push(itemToBuy)
            setCurrentHero(updatedHero);
            onUpdateHero(updatedHero);
            addGameLog(`${hero.name} has bought ${itemToBuy.name} for ${itemToBuy.cost}.`);
        }
        else {
            addGameLog(`${hero.name} cannot afford ${itemToBuy.name}.`);        }
        

      
    }
    return (
        <div id="shop">
            <h2>{shop.name}</h2>
            <h3>{currentHero.name}: {currentHero.gold} GP</h3>
            <div id="inventory" className="inventory-wrapper">
                <h2>{currentHero.name}'s Inventory</h2>
                <div className="inventory-items-container">
                    {shopInventory.length > 0 ? (
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
                    ) : (
                        <div><p>Your inventory is empty</p></div>
                    )}
                </div>
            </div>
            <div className="menu">
                <button className='menu-button' onClick={() => back()}>Back</button>
            </div>
        </div>
    );
}

export default Shop;