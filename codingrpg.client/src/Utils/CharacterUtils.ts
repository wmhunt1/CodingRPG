/* eslint-disable @typescript-eslint/no-explicit-any */
import { Character } from "../Models/CharacterModel";

import {
    Armor, Back, bareBack, bareChest, bareFeet, bareFinger, bareFist, bareHands, bareHead, bareLegs, bareNeck, bareShoulders, bareWaist, bareWrists,
    ChestArmor, Consumable, emptyHand, Equipable, FootArmor, HandArmor, HeadArmor, HealthPotion, Item, LegArmor, Neck, OffHandWeapon, Potion, Ring, Shield, ShoulderArmor, WaistArmor, Weapon, WristArmor,
    Food, Drink, AlcoholicDrink, ManaPotion, StaminaPotion, BluntWeapon, NaturalWeapon, Resource, RawFish,SpellTome
} from "../Models/ItemModel";

import { Quest } from "../Models/QuestModel"
import { Skill } from "../Models/SkillModel"
import { DamagingSpell, HealingSpell, Spell } from "../Models/SpellModel"

/**
 * Creates an instance of an Item subclass from a plain JavaScript object.
 * @param plainItem The plain object to instantiate.
 * @returns A new instance of the corresponding Item class.
 */
export function instantiateItem(plainItem: any): Item {
    if (!plainItem || !plainItem.name) {
        // Handle "bare" items which are predefined constants, not classes
        switch (plainItem?.name) {
            case "Bare Fist": return bareFist;
            case "Empty Hand": return emptyHand;
            case "Bare Head": return bareHead;
            case "Bare Shoulders": return bareShoulders;
            case "Bare Chest": return bareChest;
            case "Bare Hands": return bareHands;
            case "Bare Wrists": return bareWrists;
            case "Bare Waist": return bareWaist;
            case "Bare Legs": return bareLegs;
            case "Bare Feet": return bareFeet;
            case "Bare Back": return bareBack;
            case "Bare Neck": return bareNeck;
            case "Bare Finger": return bareFinger;
            default: return new Item("Unknown Item", "N/A", "N/A", 1, 0, "Unknown Item");
        }
    }

    // Use a switch statement on the item's `type` and `subType` for robust instantiation
    switch (plainItem.type) {
        case "Weapon":
            if (plainItem.subType === "Blunt") {
                return new BluntWeapon(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.power);
            }
            if (plainItem.subType === "Natural") {
                return new NaturalWeapon(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.power);
            }
            return new Weapon(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.power);

        case "OffHand":
            if (plainItem.subType === "Shield") {
                return new Shield(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.protection);
            }
            if (plainItem.subType === "OffHandWeapon") {
                return new OffHandWeapon(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.power);
            }
            return new OffHandWeapon(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.power);

        case "Armor":
            switch (plainItem.subType) {
                case "Head": return new HeadArmor(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.protection);
                case "Shoulder": return new ShoulderArmor(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.protection);
                case "Chest": return new ChestArmor(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.protection);
                case "Hand": return new HandArmor(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.protection);
                case "Wrist": return new WristArmor(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.protection);
                case "Waist": return new WaistArmor(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.protection);
                case "Leg": return new LegArmor(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.protection);
                case "Foot": return new FootArmor(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.protection);
                default: return new Armor(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot, plainItem.protection);
            }

        case "Accessory":
            switch (plainItem.subType) {
                case "Back": return new Back(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot);
                case "Neck": return new Neck(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot);
                case "Ring": return new Ring(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot);
                default: return new Equipable(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.slot);
            }

        case "Consumable":
            switch (plainItem.subType) {
                case "Food": return new Food(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.consumedValue);
                case "Drink": return new Drink(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.consumedValue);
                case "Alcohol": return new AlcoholicDrink(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.consumedValue);
                case "Health Potion": return new HealthPotion(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.consumedValue);
                case "Mana Potion": return new ManaPotion(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.consumedValue);
                case "Stamina Potion": return new StaminaPotion(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.consumedValue);
                case "SpellTome": return new SpellTome(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.spell)
                case "N/A": return new Potion(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.consumedValue);
                default: return new Consumable(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description, plainItem.consumedValue);
            }

        case "Resource":
            if (plainItem.subType === "RawFish") {
                return new RawFish(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description);
            }
            return new Resource(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description);

        default:
            return new Item(plainItem.name, plainItem.type, plainItem.subType, plainItem.quantity, plainItem.cost, plainItem.description);
    }
}
export function instantiateSpell(plainSpell: any): Spell {
    // Use a switch statement on the item's `type` and `subType` for robust instantiation
    switch (plainSpell.subType) {
        case "Damaging":
            return new DamagingSpell(plainSpell.name, plainSpell.description, plainSpell.school, plainSpell.level, plainSpell.type, plainSpell.subType, plainSpell.manaCost, plainSpell.spellValue, plainSpell.duration)
        case "Healing":
            return new HealingSpell(plainSpell.name, plainSpell.description, plainSpell.school, plainSpell.level, plainSpell.type, plainSpell.subType, plainSpell.manaCost, plainSpell.spellValue,plainSpell.duration)
        default:
            return new Spell(plainSpell.name, plainSpell.description, plainSpell.school, plainSpell.level, plainSpell.type, plainSpell.subType, plainSpell.manaCost, plainSpell.spellValue,plainSpell.duration)
    }
}

export function instantiateCharacterItems(plainCharacter: any): Character {
    const newCharacter = new Character(
        plainCharacter.name,
        plainCharacter.type,
        plainCharacter.subType,
        plainCharacter.maxHP,
        plainCharacter.currentHP,
        plainCharacter.maxMP,
        plainCharacter.currentMP,
        plainCharacter.maxSP,
        plainCharacter.currentSP,
        plainCharacter.level,
        plainCharacter.currentXP,
        plainCharacter.maxXP,
        plainCharacter.strength,
        plainCharacter.gold
    );

    newCharacter.mainHand = plainCharacter.mainHand ? instantiateItem(plainCharacter.mainHand) as Weapon : bareFist;
    if (plainCharacter.offHand) {
        const offHandItem = instantiateItem(plainCharacter.offHand);
        if (offHandItem.subType === "Shield") {
            newCharacter.offHand = offHandItem as Shield;
        } else if (offHandItem.subType === "OffHandWeapon") {
            newCharacter.offHand = offHandItem as OffHandWeapon;
        } else {
            newCharacter.offHand = emptyHand; // or some other default
        }
    } else {
        newCharacter.offHand = emptyHand;
    }
    newCharacter.head = plainCharacter.head ? instantiateItem(plainCharacter.head) as HeadArmor : bareHead;
    newCharacter.shoulders = plainCharacter.shoulders ? instantiateItem(plainCharacter.shoulders) as ShoulderArmor : bareShoulders;
    newCharacter.chest = plainCharacter.chest ? instantiateItem(plainCharacter.chest) as ChestArmor : bareChest;
    newCharacter.hands = plainCharacter.hands ? instantiateItem(plainCharacter.hands) as HandArmor : bareHands;
    newCharacter.wrists = plainCharacter.wrists ? instantiateItem(plainCharacter.wrists) as WristArmor : bareWrists;
    newCharacter.waist = plainCharacter.waist ? instantiateItem(plainCharacter.waist) as WaistArmor : bareWaist;
    newCharacter.legs = plainCharacter.legs ? instantiateItem(plainCharacter.legs) as LegArmor : bareLegs;
    newCharacter.feet = plainCharacter.feet ? instantiateItem(plainCharacter.feet) as FootArmor : bareFeet;
    newCharacter.back = plainCharacter.back ? instantiateItem(plainCharacter.back) as Back : bareBack;
    newCharacter.neck = plainCharacter.neck ? instantiateItem(plainCharacter.neck) as Neck : bareNeck;
    newCharacter.finger = plainCharacter.finger ? instantiateItem(plainCharacter.finger) as Ring : bareFinger;

    newCharacter.inventory = plainCharacter.inventory && Array.isArray(plainCharacter.inventory)
        ? plainCharacter.inventory.map((item: any) => instantiateItem(item))
        : [];
    newCharacter.journal = plainCharacter.journal && Array.isArray(plainCharacter.journal)
        ? plainCharacter.journal.map((quest: any) => new Quest(quest.id, quest.name, quest.status, quest.type, quest.description, quest.objective, quest.target, quest.targetProgress, quest.xpReward, quest.goldReward, quest.itemReward))
        : [];
    newCharacter.skillBook = plainCharacter.skillBook && Array.isArray(plainCharacter.skillBook)
        ? plainCharacter.skillBook.map((skill: any) => new Skill(skill.name, skill.level, skill.currentXP, skill.maxXP))
        : [];
    newCharacter.spellBook = plainCharacter.spellBook && Array.isArray(plainCharacter.spellBook)
        //might need an instantiateSpell
        ? plainCharacter.spellBook.map((spell: any) => instantiateSpell(spell))
        : [];
    newCharacter.party = plainCharacter.party && Array.isArray(plainCharacter.party)
        ? plainCharacter.party.map((character: any) => instantiateCharacterItems(character))
        : [];
    return newCharacter;
}