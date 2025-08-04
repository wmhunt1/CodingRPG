/* eslint-disable @typescript-eslint/no-explicit-any */
import { Character } from "../Models/CharacterModel"; // Assuming Character is defined here

import {
    Armor, Back, BareBack, BareChest, BareFeet, BareFinger, BareFist, BareHands, BareHead, BareLegs, BareNeck, BareShoulders, BareWaist, BareWrists,
    ChestArmor, Consumable, Equipable, FootArmor, HandArmor, HeadArmor, HealthPotion, Item, LegArmor, Neck, Potion, Ring, ShoulderArmor, WaistArmor, Weapon, WristArmor
} from "../Models/ItemModel";

export function instantiateItem(plainItem: any): Item {
    let newItemInstance: Item;

    if (!plainItem || !plainItem.name) {
        if (plainItem && plainItem.name === "Bare Fist") {
            newItemInstance = new BareFist();
        } else if (plainItem && plainItem.name === "Bare Head") {
            newItemInstance = new BareHead();
        } else if (plainItem && plainItem.name === "Bare Shoulders") {
            newItemInstance = new BareShoulders();
        } else if (plainItem && plainItem.name === "Bare Chest") {
            newItemInstance = new BareChest();
        } else if (plainItem && plainItem.name === "Bare Hands") {
            newItemInstance = new BareHands();
        } else if (plainItem && plainItem.name === "Bare Wrists") {
            newItemInstance = new BareWrists();
        } else if (plainItem && plainItem.name === "Bare Waist") {
            newItemInstance = new BareWaist();
        } else if (plainItem && plainItem.name === "Bare Legs") {
            newItemInstance = new BareLegs();
        } else if (plainItem && plainItem.name === "Bare Feet") {
            newItemInstance = new BareFeet();
        } else if (plainItem && plainItem.name === "Bare Back") {
            newItemInstance = new BareBack();
        } else if (plainItem && plainItem.name === "Bare Neck") {
            newItemInstance = new BareNeck();
        } else if (plainItem && plainItem.name === "Bare Finger") {
            newItemInstance = new BareFinger();
        } else {
            newItemInstance = new Item("Unknown Item", 0, 0);
        }
    } else if (plainItem.slot) { // It's an Equipable
        if (plainItem.power !== undefined) {
            newItemInstance = new Weapon(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.power);
        } else if (plainItem.protection !== undefined) {
            if (plainItem.slot === "Head") {
                newItemInstance = new HeadArmor(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.protection);
            } else if (plainItem.slot === "Shoulders") {
                newItemInstance = new ShoulderArmor(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.protection);
            } else if (plainItem.slot === "Chest") {
                newItemInstance = new ChestArmor(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.protection);
            } else if (plainItem.slot === "Hands") {
                newItemInstance = new HandArmor(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.protection);
            } else if (plainItem.slot === "Wrists") {
                newItemInstance = new WristArmor(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.protection);
            } else if (plainItem.slot === "Waist") {
                newItemInstance = new WaistArmor(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.protection);
            } else if (plainItem.slot === "Legs") {
                newItemInstance = new LegArmor(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.protection);
            } else if (plainItem.slot === "Feet") {
                newItemInstance = new FootArmor(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.protection);
            } else {
                newItemInstance = new Armor(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.slot, plainItem.protection);
            }
        } else { // This is the new else block for Equipables without power or protection
            // Handle specific Equipable types that might not have power or protection but still have a slot
            if (plainItem.slot === "Back") {
                newItemInstance = new Back(plainItem.name, plainItem.quantity, plainItem.cost); // Assuming 0 protection if not defined
            } else if (plainItem.slot === "Neck") {
                newItemInstance = new Neck(plainItem.name, plainItem.quantity, plainItem.cost); // Assuming 0 protection if not defined
            } else if (plainItem.slot === "Finger") {
                newItemInstance = new Ring(plainItem.name, plainItem.quantity, plainItem.cost); // Assuming 0 protection if not defined
            } else {
                // Fallback for generic Equipable if no specific subclass matches and no power/protection
                newItemInstance = new Equipable(plainItem.name, plainItem.quantity, plainItem.cost, plainItem.slot);
            }
        }
    } else if (plainItem.consumedValue !== undefined) { // It's a Consumable
        if (plainItem.name.toLowerCase().includes("potion")) {
            if (plainItem.name.toLowerCase().includes("health")) {
                newItemInstance = new HealthPotion(plainItem.name, plainItem.quantity, plainItem.consumedValue, plainItem.cost);
            } else {
                newItemInstance = new Potion(plainItem.name, plainItem.quantity, plainItem.consumedValue, plainItem.cost);
            }
        } else {
            newItemInstance = new Consumable(plainItem.name, plainItem.quantity, plainItem.consumedValue, plainItem.cost);
        }
    } else {
        newItemInstance = new Item(plainItem.name, plainItem.quantity, plainItem.cost);
    }

    if (plainItem.description !== undefined) {
        newItemInstance.description = plainItem.description;
    }

    return newItemInstance;
}

export function instantiateCharacterItems(plainCharacter: any): Character {
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
    );

    newCharacter.mainHand = plainCharacter.mainHand ? instantiateItem(plainCharacter.mainHand) as Weapon : new BareFist();
    newCharacter.head = plainCharacter.head ? instantiateItem(plainCharacter.head) as HeadArmor : new BareHead();
    newCharacter.shoulders = plainCharacter.shoulders ? instantiateItem(plainCharacter.shoulders) as ShoulderArmor : new BareShoulders();
    newCharacter.chest = plainCharacter.chest ? instantiateItem(plainCharacter.chest) as ChestArmor : new BareChest();
    newCharacter.hands = plainCharacter.hands ? instantiateItem(plainCharacter.hands) as HandArmor : new BareHands();
    newCharacter.wrists = plainCharacter.wrists ? instantiateItem(plainCharacter.wrists) as WristArmor : new BareWrists();
    newCharacter.waist = plainCharacter.waist ? instantiateItem(plainCharacter.waist) as WaistArmor : new BareWaist();
    newCharacter.legs = plainCharacter.legs ? instantiateItem(plainCharacter.legs) as LegArmor : new BareLegs();
    newCharacter.feet = plainCharacter.feet ? instantiateItem(plainCharacter.feet) as FootArmor : new BareFeet();
    newCharacter.back = plainCharacter.back ? instantiateItem(plainCharacter.back) as Back : new BareBack();
    newCharacter.neck = plainCharacter.neck ? instantiateItem(plainCharacter.neck) as Neck : new BareNeck();
    newCharacter.finger = plainCharacter.finger ? instantiateItem(plainCharacter.finger) as Ring : new BareFinger();

    newCharacter.inventory = plainCharacter.inventory && Array.isArray(plainCharacter.inventory)
        ? plainCharacter.inventory.map((item: any) => instantiateItem(item))
        : [];

    return newCharacter;
}