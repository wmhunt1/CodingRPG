/* eslint-disable @typescript-eslint/no-explicit-any */
// Models/CharacterModel.ts (or a new Utilities.ts file)

import { Character } from "../Models/CharacterModel"; // Assuming Character is defined here
import { Item, Equipable, Weapon, ChestArmor, Consumable, Potion, HealthPotion,BareFist, BareChest,} from "../Models/ItemModel";

// This function takes a plain JS object (likely from JSON.parse)
// and reinstantiates its item properties into proper class instances.
export function instantiateItem(plainItem: any): Item {
    if (!plainItem || !plainItem.name) {
        // Handle cases for BareFist/BareChest or genuinely empty slots
        // You might want to return new BareFist() or new BareChest() based on context
        // or just a generic new Item() if it's meant to be an empty slot placeholder.
        if (plainItem && plainItem.name === "Bare Fist") return new BareFist();
        if (plainItem && plainItem.name === "Bare Chest") return new BareChest();
        return new Item("Unknown Item", 0, 0); // Default or throw error
    }

    // Determine the specific class based on properties or a type field
    // It's often helpful to add a 'type' string property to your classes
    // (e.g., type: "Weapon", type: "HealthPotion") for easier deserialization.
    // For now, we'll rely on instanceof checks or property existence.

    // Equipables first, then consumables, then generic items
    if (plainItem.slot) { // It's an Equipable
        if (plainItem.power !== undefined) {
            return new Weapon(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.power);
        }
        if (plainItem.protection !== undefined) {
            // Need to differentiate ChestArmor from generic Armor if Armor can be equipped directly
            if (plainItem.slot === "Chest") {
                return new ChestArmor(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.protection);
            }
            // else if (plainItem.slot === "Head") { return new Helmet(...) }
            // return new Armor(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.slot, plainItem.protection);
        }
        // Fallback for generic Equipable if no specific subclass matches
        return new Equipable(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.slot);
    }

    if (plainItem.consumedValue !== undefined) { // It's a Consumable
        if (plainItem.name.toLowerCase().includes("potion")) {
            if (plainItem.name.toLowerCase().includes("health")) {
                return new HealthPotion(plainItem.name, plainItem.quantity, plainItem.consumedValue, plainItem.cost);
            }
            return new Potion(plainItem.name, plainItem.quantity, plainItem.consumedValue, plainItem.cost);
        }
        return new Consumable(plainItem.name, plainItem.quantity, plainItem.consumedValue, plainItem.cost);
    }

    // Default to a generic Item
    return new Item(plainItem.name, plainItem.quantity, plainItem.cost);
}


export function instantiateCharacterItems(plainCharacter: Character): Character {
    const newCharacter = new Character()
    newCharacter.name = plainCharacter.name;
    newCharacter.currentHP = plainCharacter.currentHP;
    newCharacter.maxHP = plainCharacter.maxHP;
    newCharacter.currentMP = plainCharacter.currentMP;
    newCharacter.maxMP = plainCharacter.maxMP;
    newCharacter.currentSP = plainCharacter.currentSP;
    newCharacter.maxSP = plainCharacter.maxSP;
    newCharacter.level = plainCharacter.level
    newCharacter.gold = plainCharacter.gold
    newCharacter.currentXP = plainCharacter.currentXP
    newCharacter.maxXP = plainCharacter.maxXP

  

        // ... copy other simple properties


    // Re-instantiate equipped items
    newCharacter.weapon = instantiateItem(plainCharacter.weapon) as Weapon;
    newCharacter.chest = instantiateItem(plainCharacter.chest) as ChestArmor;
    // ... do this for all other equipped slots

    // Re-instantiate inventory items
    newCharacter.inventory = plainCharacter.inventory.map((item: any) => instantiateItem(item));

    return newCharacter;
}