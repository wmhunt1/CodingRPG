import '../StyleSheets/GameStyle.css';
import { Character, Hero } from "../Models/CharacterModel";
import { type DialogueNode } from "../Models/DialogueNodeModel";
import type { CombatEncounter } from '../Models/EncounterModel';
//import { Item } from "../Models/ItemModel";
import { SkillNodeModel } from "../Models/SkillNodeModel";
import { InnShop, ShopModel } from "../Models/ShopModel";

import { useState, useEffect } from "react";
// Import the new transaction logic from a separate file
import {
    buyItem,
    sellItem,
    stayInn,
    calculateBuyPrice,
    calculateSellPrice
} from "../Utils/ShopUtils";

interface ShopProps {
    hero: Character;
    back: () => void;
    shop: ShopModel;
    onUpdateHero: (updatedHero: Character) => void;
    addGameLog: (message: string) => void;
    shopSkillNode: (skillNode: SkillNodeModel) => void;
    shopCombatEncounter: (combatEncounter: CombatEncounter) => void;
    shopConversation: (dialogueGenerator: (hero: Hero, addGameLog: (message: string) => void) => DialogueNode[]) => void;
}

function Shop({ hero, back, shop, onUpdateHero, addGameLog, shopSkillNode, shopCombatEncounter, shopConversation }: ShopProps) {
    const [currentHero, setCurrentHero] = useState(hero);
    const shopInventory = shop.inventory;

    // Use useEffect to keep the local state in sync with the prop
    useEffect(() => {
        setCurrentHero(hero);
    }, [hero]);

    return (
        <div id="shop" className="inventory-layout-grid">
            <div className="toolbar">
                <h2>{shop.name}</h2>
            </div>
            <div className="inventory-content-left">
                <h3>Player Gold</h3>
                <p>{currentHero.gold} GP</p>
            </div>
            <div className="inventory-content-main">
                <div className="inventory-display-area">
                    <div id="shop-inventory" className="inventory-items-container">
                        <h3>Buy</h3>
                        <div className="shop-items">
                            {shopInventory
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((item, index) => (
                                    <div key={index}>
                                        <p>{item.name}</p>
                                        <p>{item.description}</p>
                                        <button
                                            className="buy-sell-button"
                                            onClick={() => {
                                                try {
                                                    const updatedHero = buyItem(currentHero, item);
                                                    setCurrentHero(updatedHero);
                                                    onUpdateHero(updatedHero);
                                                    addGameLog(`${hero.name} has bought ${item.name} for ${calculateBuyPrice(item)} GP.`);
                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                } catch (error: any) {
                                                    addGameLog(error.message);
                                                }
                                            }}
                                        >
                                            Buy ({calculateBuyPrice(item)} GP)
                                        </button>
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
                                    {currentHero.inventory
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map((item, index) => (
                                            <div key={index}>
                                                <p>{item.name} x {item.quantity}</p>
                                                <button
                                                    className="buy-sell-button"
                                                    onClick={() => {
                                                        const updatedHero = sellItem(currentHero, item);
                                                        setCurrentHero(updatedHero);
                                                        onUpdateHero(updatedHero);
                                                        addGameLog(`${hero.name} has sold ${item.name} for ${calculateSellPrice(item)} GP.`);
                                                    }}
                                                >
                                                    Sell ({calculateSellPrice(item)} GP)
                                                </button>
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
                {shop instanceof InnShop &&
                    <div>
                        <h3>Inn Price</h3>
                        <button
                            className='area-button'
                            onClick={() => {
                                try {
                                    const updatedHero = stayInn(currentHero, shop.innStay);
                                    setCurrentHero(updatedHero);
                                    onUpdateHero(updatedHero);
                                    addGameLog(`${hero.name} stays the night for ${shop.innStay} GP.`);
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                } catch (error: any) {
                                    addGameLog(error.message);
                                }
                            }}
                        >
                            Rest ({shop.innStay} GP)
                        </button>
                    </div>
                }
                <h3>Skills</h3>
                {shop.skillNodes.map((item, index) => (
                    <div key={index}>
                        <button className="area-button" onClick={() => shopSkillNode(item)}>Use {item.name}</button>
                    </div>
                ))}
                <div>
                    <h3>People</h3>
                    {shop.conversations.map((dialogueGenerator, index) => (
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
        </div>
    );
}

export default Shop;