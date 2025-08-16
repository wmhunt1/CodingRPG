import { Character } from "../Models/CharacterModel"
import { Item } from "../Models/ItemModel";
import {fullHeal } from "./GameUtil"
import { addItemToInventory, removeItemFromInventory } from "./InventoryUtils";

export const calculateBuyPrice = (item: Item): number => {
    return Math.floor(item.cost);
};

export const calculateSellPrice = (item: Item): number => {
    return Math.floor(item.cost / 2);
};

export const canAfford = (hero: Character, cost: number): boolean => {
    return hero.gold >= cost;
};

export const buyItem = (hero: Character, item: Item,): Character => {
    if (!canAfford(hero, calculateBuyPrice(item))) {
        throw new Error("Cannot afford item.");
    }
    const newHero = { ...hero, gold: hero.gold - calculateBuyPrice(item) };
    // Logic to add item to inventory here
    addItemToInventory(hero.inventory, item, 1)
    return newHero;
};

export const sellItem = (hero: Character, item: Item): Character => {
    // Logic to remove item from inventory here
    removeItemFromInventory(hero.inventory, item, 1)
    const newHero = { ...hero, gold: hero.gold + calculateSellPrice(item) };
    return newHero;
};
export const stayInn = (hero: Character, cost: number): Character => {
    // Create a deep copy to ensure immutability
    const updatedHero: Character = JSON.parse(JSON.stringify(hero));

    // Check if the hero can afford the stay
    if (updatedHero.gold < cost) {
        throw new Error(`${updatedHero.name} cannot afford a bed.`);
    }

    // Deduct gold and heal
    updatedHero.gold -= cost;
    fullHeal(updatedHero);

    return updatedHero;
};