/* eslint-disable @typescript-eslint/no-explicit-any */
// Models/CharacterModel.ts (or a new Utilities.ts file)

import { Character } from "../Models/CharacterModel"; // Assuming Character is defined here
import { Armor, Item, Equipable, Weapon, ChestArmor, Consumable, Potion, HealthPotion, BareFist, BareChest } from "../Models/ItemModel";

export function instantiateItem(plainItem: any): Item {
    let newItemInstance: Item; // Declare once to be assigned in the blocks below

    if (!plainItem || !plainItem.name) {
        if (plainItem && plainItem.name === "Bare Fist") {
            newItemInstance = new BareFist();
        } else if (plainItem && plainItem.name === "Bare Chest") {
            newItemInstance = new BareChest();
        } else {
            newItemInstance = new Item("Unknown Item", 0, 0);
        }
    } else if (plainItem.slot) { // It's an Equipable
        if (plainItem.power !== undefined) {
            // Ensure constructor arguments match your Weapon class: name, quantity, cost, power
            newItemInstance = new Weapon(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.power);
        } else if (plainItem.protection !== undefined) {
            if (plainItem.slot === "Chest") {
                // Ensure constructor arguments match your ChestArmor class: name, quantity, cost, protection
                newItemInstance = new ChestArmor(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.protection);
            } else {
                // Generic Armor (if you have other armor slots beyond chest)
                // Ensure constructor arguments match your Armor class: name, quantity, cost, slot, protection
                newItemInstance = new Armor(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.slot, plainItem.protection);
            }
        } else {
            // Fallback for generic Equipable if no specific subclass matches
            // Ensure constructor arguments match your Equipable class: name, quantity, cost, slot
            newItemInstance = new Equipable(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.slot);
        }
    } else if (plainItem.consumedValue !== undefined) { // It's a Consumable
        if (plainItem.name.toLowerCase().includes("potion")) {
            if (plainItem.name.toLowerCase().includes("health")) {
                // Ensure constructor arguments match your HealthPotion class: name, quantity, consumedValue, cost
                newItemInstance = new HealthPotion(plainItem.name, plainItem.quantity, plainItem.consumedValue, plainItem.cost);
            } else {
                // Generic Potion
                // Ensure constructor arguments match your Potion class: name, quantity, consumedValue, cost
                newItemInstance = new Potion(plainItem.name, plainItem.quantity, plainItem.consumedValue, plainItem.cost);
            }
        } else {
            // Generic Consumable
            // Ensure constructor arguments match your Consumable class: name, quantity, consumedValue, cost
            newItemInstance = new Consumable(plainItem.name, plainItem.quantity, plainItem.consumedValue, plainItem.cost);
        }
    } else {
        // Default to a generic Item if no other type matches
        // Ensure constructor arguments match your Item class: name, quantity, cost
        newItemInstance = new Item(plainItem.name, plainItem.quantity, plainItem.cost);
    }

    // CRITICAL: Copy the description *after* the specific instance has been created
    // This ensures that even if a constructor sets a default description,
    // it's immediately overridden by the original description from plainItem.
    if (plainItem.description !== undefined) {
        newItemInstance.description = plainItem.description;
    }

    return newItemInstance; // Return the fully constructed and described item instance
}

// Your instantiateCharacterItems function remains correct as you provided it:
export function instantiateCharacterItems(plainCharacter: any): Character { // Changed to any for flexibility
    const newCharacter = new Character(
        plainCharacter.name,
        plainCharacter.maxHP,
        plainCharacter.currentHP,
        plainCharacter.maxMP,
        plainCharacter.currentMP,
        plainCharacter.maxSP,
        plainCharacter.currentSP,
        plainCharacter.level,
        plainCharacter.currentXP,
        plainCharacter.maxXP,
        plainCharacter.gold
        // ... copy other simple properties
    );

    newCharacter.weapon = plainCharacter.weapon ? instantiateItem(plainCharacter.weapon) as Weapon : new BareFist();
    newCharacter.chest = plainCharacter.chest ? instantiateItem(plainCharacter.chest) as ChestArmor : new BareChest();
    // ... do this for all other equipped slots

    newCharacter.inventory = plainCharacter.inventory && Array.isArray(plainCharacter.inventory)
        ? plainCharacter.inventory.map((item: any) => instantiateItem(item))
        : [];

    return newCharacter;
}