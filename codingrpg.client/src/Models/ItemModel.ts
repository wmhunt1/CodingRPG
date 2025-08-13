//Models/ItemModel.ts

import { Character } from "./CharacterModel";
import { basicHealSpell, magicBoltSpell, Spell } from "./SpellModel"
import { addItemToInventory, removeItemFromInventory } from "..//Utils/InventoryUtils";
import { healCharacter } from "../Utils/GameUtil";
import { addSpellToSpellBook } from "../Utils/SpellUtil";

export class Item {
    name: string;
    type: string;
    subType: string;
    quantity: number;
    cost: number;
    description: string;

    constructor(name: string, type: string, subType: string, quantity: number, cost: number, description: string) {
        this.name = name;
        this.type = type;
        this.subType = subType;
        this.quantity = quantity;
        this.cost = cost;
        this.description = description;

    }

    use(user: Character): Character {
        removeItemFromInventory(user.inventory, this, 1);
        return user;
    }
}
export const ashes = new Item("Ashes", "Misc", "Misc", 1, 5, "A pile of ash")
export const bucket = new Item("Bucket", "Misc", "Misc", 1, 5, "A bucket")
export const burntBeef = new Item("Burnt Beef", "Junk", "BurntBeef", 1, 0, "A bit too well done")
export const burntBread = new Item("Burnt Bread", "Junk", "BurntBread", 1, 0, "A burnt loaf of bread")
export const burntFish = new Item("Burnt Fish", "Junk", "BurntFish", 1, 0, "A burnt fish")

export class Consumable extends Item {
    consumedValue: number;
    constructor(name: string, type: string = "Consumable", subType: string = "N/A", quantity: number, cost: number, description: string, consumedValue: number) {
        super(name, type, subType, quantity, cost, description);
        this.consumedValue = consumedValue;
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}

export class Drink extends Consumable {
    constructor(name: string, type: string = "Drink", subType: string = "N/A", quantity: number, cost: number, description: string, consumedValue: number) {
        super(name, type, subType, quantity, cost, description, consumedValue);
    }
    override use(user: Character): Character {
        //later increase somethign else?
        return super.use(user);
    }
}
export const milk = new Drink("Milk", "Drink", "Dairy", 1, 5, "Moo moo milk", 0)
export const water = new Drink("Water", "Drink", "Water", 1, 0, "H20", 0)
export class AlcoholicDrink extends Drink {
    constructor(name: string, type: string = "Drink", subType: string = "Alcohol", quantity: number, cost: number, description: string, consumedValue: number) {
        super(name, type, subType, quantity, cost, description, consumedValue);
    }
    override use(user: Character): Character {
        //later increase somethign else?
        return super.use(user);
    }
}
export const beer = new AlcoholicDrink("Beer", "Consumable", "Drink", 1, 5, "A mug of beer", 0)
export class Food extends Consumable {
    constructor(name: string, type: string = "Consumable", subType: string = "Food", quantity: number, cost: number, description: string, consumedValue: number) {
        super(name, type, subType, quantity, cost, description, consumedValue);
    }
    override use(user: Character): Character {
        //later increase stamina
        return super.use(user);
    }
}

export const bread = new Food("Bread", "Food", "Bread", 1, 5, "A loaf of bread", 0)
export const butter = new Food("Butter", "Food", "Dairy", 1, 5, "A stick of butter", 0)
export const cheese = new Food("Cheese", "Food", "Dairy", 1, 5, "Cheesy", 0)
export const cookedBeef = new Food("Cooked Beef", "Food", "CookedMeat", 1, 2, "Beef", 0)
export const cookedMinnow = new Food("Cooked Minnow", "Food", "CookedFish", 1, 2, "A cooked minnow, not very filling", 0)
export const cookedSalmon = new Food("Cooked Salmon", "Food", "CookedFish", 1, 10, "A cooked salmon", 0)
export const cookedTrout = new Food("Cooked Trout", "Food", "CookedFish", 1, 5, "A cooked trout", 0)

export class Potion extends Consumable {
    constructor(name: string, type: string = "Potion", subType: string = "N/A", quantity: number, cost: number, description: string, consumedValue: number) {
        super(name, type, subType, quantity, cost, description, consumedValue);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export class HealthPotion extends Potion {
    constructor(name: string, type: string = "Potion", subType: string = "Health Potion", quantity: number, cost: number, description: string, consumedValue: number) {
        super(name, type, subType, quantity, cost, description, consumedValue);
    }
    override use(user: Character): Character {

        healCharacter(user, this.consumedValue)
        // After affecting HP, remove from inventory
        return super.use(user);
    }
}

export const basicHealthPotion = new HealthPotion("Basic Health Potion", "Potion", "Health Potion", 1, 10, "A Basic Health Potion", 5)

export class ManaPotion extends Potion {
    constructor(name: string, type: string = "Potion", subType: string = "Mana Potion", quantity: number, cost: number, description: string, consumedValue: number) {
        super(name, type, subType, quantity, cost, description, consumedValue);
    }
    override use(user: Character): Character {
        user.currentMP += this.consumedValue;
        if (user.currentMP > user.maxMP) {
            user.currentMP = user.maxMP;
        }
        // After affecting HP, remove from inventory
        return super.use(user);
    }
}

export const basicManaPotion = new ManaPotion("Basic Mana Potion", "Potion", "Mana Potion", 1, 10, "A Basic Mana Potion", 5)
export class StaminaPotion extends Potion {
    constructor(name: string, type: string = "Potion", subType: string = "Stamina Potion", quantity: number, cost: number, description: string, consumedValue: number) {
        super(name, type, subType, quantity, cost, description, consumedValue);
    }
    override use(user: Character): Character {
        user.currentSP += this.consumedValue;
        if (user.currentSP > user.maxSP) {
            user.currentSP = user.maxSP;
        }
        // After affecting HP, remove from inventory
        return super.use(user);
    }
}

export const basicStaminaPotion = new HealthPotion("Basic Stamina Potion", "Potion", "Stamina Potion", 1, 10, "A Basic Stamina Potion", 5)

export class SpellTome extends Item {
    spell: Spell;
    constructor(name: string, type: string = "Consumable", subType: string = "SpellTome", quantity: number, cost: number, description: string, spell: Spell) {
        super(name, type, subType, quantity, cost, description);
        this.spell = spell;
    }
    override use(user: Character): Character {
        addSpellToSpellBook(user.spellBook, this.spell)
        removeItemFromInventory(user.inventory, this, 1)
        return user;
    }
}
export const basicHealSpellTome = new SpellTome("Tome: Basic Heal", "Consumable", "SpellTome", 1, 10, "Teaches Basic Heal", basicHealSpell)
export const magicBoltSpellTome = new SpellTome("Tome: Magic Bolt", "Consumable", "SpellTome", 1, 10, "Teaches Magic Bolt", magicBoltSpell)
export class Equipable extends Item {
    slot: string;
    constructor(name: string, type: string = "Equipable", subType: string = "N/A", quantity: number, cost: number, description: string, slot: string) {
        super(name, type, subType, quantity, cost, description);
        this.slot = slot;
    }

    override use(user: Character): Character {
        let oldEquippedItem: Equipable | Item | null = null;
        let bareItem: Item | null = null;

        // This is a much cleaner way to handle the equipping logic.
        switch (this.slot) {
            case "Weapon":
                oldEquippedItem = user.mainHand;
                user.mainHand = this as unknown as Weapon;
                if (user.mainHand.type === "2H Weapon") {
                    addItemToInventory(user.inventory, user.offHand, 1)
                    user.offHand = fullHand;
                }
                if (user.subType === "Dog") {
                    bareItem = dogBite;
                }
                else {
                    bareItem = bareFist;
                }
                break;
            case "OffHand":
                oldEquippedItem = user.offHand;
                if (user.mainHand.type === "2H Weapon") {
                    addItemToInventory(user.inventory, user.mainHand, 1)
                    user.mainHand = bareFist;
                }
                user.offHand = this as OffHand;
                bareItem = emptyHand;
                break;
            case "Head":
                oldEquippedItem = user.head;
                user.head = this as unknown as HeadArmor;
                bareItem = bareHead;
                break;
            case "Shoulders":
                oldEquippedItem = user.shoulders;
                user.shoulders = this as unknown as ShoulderArmor;
                bareItem = bareShoulders;
                break;
            case "Chest":
                oldEquippedItem = user.chest;
                user.chest = this as unknown as ChestArmor;
                bareItem = bareChest;
                break;
            case "Wrists":
                oldEquippedItem = user.wrists;
                user.wrists = this as unknown as WristArmor;
                bareItem = bareWrists;
                break;
            case "Hands":
                oldEquippedItem = user.hands;
                user.hands = this as unknown as HandArmor;
                bareItem = bareHands;
                break;
            case "Waist":
                oldEquippedItem = user.waist;
                user.waist = this as unknown as WaistArmor;
                bareItem = bareWaist;
                break;
            case "Legs":
                oldEquippedItem = user.legs;
                user.legs = this as unknown as LegArmor;
                bareItem = bareLegs;
                break;
            case "Feet":
                oldEquippedItem = user.feet;
                user.feet = this as unknown as FootArmor;
                bareItem = bareFeet;
                break;
            case "Neck":
                oldEquippedItem = user.neck;
                user.neck = this as Neck;
                bareItem = bareNeck;
                break;
            case "Finger":
                oldEquippedItem = user.finger;
                user.finger = this as Ring;
                bareItem = bareFinger;
                break;
            case "Back":
                oldEquippedItem = user.back;
                user.back = this as Back;
                bareItem = bareBack;
                break;
            default:
                console.warn(`Attempted to equip item to unhandled slot: ${this.slot}`);
                return user;
        }

        // Remove the newly equipped item from the inventory.
        removeItemFromInventory(user.inventory, this, 1);
        console.log(`${user.name} equipped ${this.name}.`);
        console.log(user.offHand.name)

        // If there was an old item, and it wasn't a "bare" item, add it back to the inventory.
        if (oldEquippedItem && bareItem && oldEquippedItem.name !== bareItem.name && oldEquippedItem.name !== "Full Hand") {
            addItemToInventory(user.inventory, oldEquippedItem, 1);
            console.log(`${user.name} unequipped ${oldEquippedItem.name} and it was added to the inventory.`);
        } else if (oldEquippedItem && !bareItem) {
            // This case handles when an old item exists but no bare item was defined
            addItemToInventory(user.inventory, oldEquippedItem, 1);
            console.log(`${user.name} unequipped ${oldEquippedItem.name} and it was added to the inventory.`);
        }

        return user;
    }
}
export class Accessory extends Equipable {
    constructor(name: string, type: string = "Accessory", subType: string = "N/A", quantity: number, cost: number, description: string, slot: string) {
        super(name, type, subType, quantity, cost, description, slot);
        this.slot = slot;
    }
}
export class Back extends Accessory {
    constructor(name: string, type: string = "Accessory", subType: string = "Back", quantity: number, cost: number, description: string, slot: string) {
        super(name, type, subType, quantity, cost, description, slot);
        this.slot = slot;
    }
}
export const bareBack = new Back("Bare Back", "Acessory", "Back", 1, 0, "You're not wearing anything on your back", "Back")
export const cloak = new Back("Linen Cloak", "Acessory", "Back", 1, 0, "A Simple Cloak", "Back")

export class Neck extends Accessory {
    constructor(name: string, type: string = "Accessory", subType: string = "Neck", quantity: number, cost: number, description: string, slot: string) {
        super(name, type, subType, quantity, cost, description, slot);
        this.slot = slot;
    }
}
export const bareNeck = new Neck("Bare Neck", "Acessory", "Neck", 1, 0, "You're not wearing anything around your neck", "Neck")

export class Ring extends Accessory {
    constructor(name: string, type: string = "Accessory", subType: string = "Ring", quantity: number, cost: number, description: string, slot: string) {
        super(name, type, subType, quantity, cost, description, slot);
        this.slot = slot;
    }
}
export const bareFinger = new Neck("Bare Finger", "Acessory", "Ring", 1, 0, "You're not wearing anything on your finger", "Ring")

export class Armor extends Equipable {
    protection: number
    constructor(name: string, type: string = "Armor", subType: string = "N/A", quantity: number, cost: number, description: string, slot: string, protection: number) {
        super(name, type, subType, quantity, cost, description, slot);
        this.protection = protection;
    }
}
export class ChestArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Chest", quantity: number, cost: number, description: string, slot: string = "Chest", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareChest = new ChestArmor("Bare Chest", "Armor", "Chest", 1, 0, "You're bare-chested. No protection", "Chest", 0)
export const bronzeChest = new ChestArmor("Bronze Chestplate", "Armor", "Chest", 1, 10, "A sturdy bronze chestplate", "Chest", 2)
export const ironChest = new ChestArmor("Iron Chestplate", "Armor", "Chest", 1, 20, "A sturdy iron chestplate", "Chest", 3)
export const leatherChest = new ChestArmor("Leather Jacket", "Armor", "Chest", 1, 20, "A leather jacket", "Chest", 2)
export const tunic = new ChestArmor("Linen Tunic", "Armor", "Chest", 1, 0, "A simple cloth tunic. Offers minimal protection.", "Chest", 1)

export class FootArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Foot", quantity: number, cost: number, description: string, slot: string = "Feet", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareFeet = new FootArmor("Bare Feet", "Armor", "Foot", 1, 0, "You're not wearing anything on your feet.", "Feet", 0)
export const boots = new FootArmor("Bare Feet", "Armor", "Foot", 1, 1, "Sturdy boots for walking and minor protection.", "Feet", 1)
export const bronzeBoots = new FootArmor("Bronze Boots", "Armor", "Foot", 1, 10, "A pair of bronze boots", "Feet", 2)
export const ironBoots = new FootArmor("Iron Boots", "Armor", "Foot", 1, 20, "A pair of sturdy iron boots", "Feet", 3)
export const leatherBoots = new FootArmor("Leather Boots", "Armor", "Foot", 1, 5, "A pair of leather boots", "Feet", 2)
export const shoes = new FootArmor("Shoes", "Armor", "Foot", 1, 1, "A pair of comfortable shoes.", "Feet", 0)

export class HandArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Hand", quantity: number, cost: number, description: string, slot: string = "Hands", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareHands = new HandArmor("Bare Hands", "Armor", "Hand", 1, 0, "You're not wearing anything on your hands.", "Hands", 0)
export const bronzeGauntlets = new HandArmor("Bronze Gauntlets", "Armor", "Hand", 1, 10, "A pair of bronze gauntlets", "Hands", 2)
export const gloves = new HandArmor("Gloves", "Armor", "Hand", 1, 1, "A pair of simple gloves.", "Hands", 1)
export const ironGauntlets = new HandArmor("Iron Gauntlets", "Armor", "Hand", 1, 20, "A pair of sturdy iron gauntlets", "Hands", 3)
export const leatherGauntlets = new HandArmor("Leather Gauntlets", "Armor", "Hand", 1, 5, "A pair of leather gauntlets.", "Hands", 2)

export class HeadArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Head", quantity: number, cost: number, description: string, slot: string = "Head", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareHead = new HandArmor("Bare Head", "Armor", "Head", 1, 0, "Your head is bare.", "Head", 0)
export const bronzeHelmet = new HandArmor("Bronze Helmet", "Armor", "Head", 1, 10, "A sturdy bronze helm", "Head", 2)
export const ironHelmet = new HandArmor("Iron Helmet", "Armor", "Head", 1, 20, "A sturdy iron helm", "Head", 3)
export const leatherCowl = new HandArmor("Leather Cowl", "Armor", "Head", 1, 5, "A leather cowl", "Head", 2)

export class LegArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Leg", quantity: number, cost: number, description: string, slot: string = "Legs", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareLegs = new LegArmor("Bare Legs", "Armor", "Leg", 1, 0, "Your legs are bare.", "Legs", 0)
export const bronzeLegs = new LegArmor("Bronze Greaves", "Armor", "Leg", 1, 10, "A pair of bronze greaves", "Legs", 2)
export const ironLegs = new LegArmor("Iron Greaves", "Armor", "Leg", 1, 20, "A pair of sturdy iron greaves", "Legs", 3)
export const leatherLegs = new LegArmor("Leather Greaves", "Armor", "Leg", 1, 10, "A pair of leather greaves", "Legs", 2)
export const pants = new LegArmor("Linen Pants", "Armor", "Leg", 1, 1, "A simple pair of pants", "Legs", 1)
export const skirt = new LegArmor("Linen Skirt", "Armor", "Leg", 1, 1, "A simple skirt", "Legs", 1)

export class ShoulderArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Shoulder", quantity: number, cost: number, description: string, slot: string = "Shoulders", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareShoulders = new ShoulderArmor("Bare Shoulders", "Armor", "Shoulder", 1, 0, "Your shoulders are bare.", "Shoulders", 0)
export const bronzePauldrons = new ShoulderArmor("Bronze Pauldrons", "Armor", "Shoulder", 1, 10, "A pair of bronze pauldrons", "Shoulders", 2)
export const ironPauldrons = new ShoulderArmor("Iron Pauldrons", "Armor", "Shoulder", 1, 20, "A pair of sturdy iron pauldrons", "Shoulders", 3)
export const leatherPauldrons = new ShoulderArmor("Leather Pauldrons", "Armor", "Shoulder", 1, 5, "A pair of leather pauldrons", "Shoulders", 2)

export class WaistArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Waist", quantity: number, cost: number, description: string, slot: string = "Waist", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareWaist = new WaistArmor("Bare Waist", "Armor", "Waist", 1, 0, "Your waist is bare.", "Waist", 0)
export const bronzeBelt = new WaistArmor("Bronze Belt", "Armor", "Waist", 1, 10, "A sturdy bronze belt", "Waist", 2)
export const ironBelt = new WaistArmor("Iron Belt", "Armor", "Waist", 1, 20, "A sturdy iron belt", "Waist", 3)
export const leatherBelt = new WaistArmor("Leather Belt", "Armor", "Waist", 1, 5, "A leather belt", "Waist", 2)

export class WristArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Wrist", quantity: number, cost: number, description: string, slot: string = "Wrists", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareWrists = new WristArmor("Bare Wrists", "Armor", "Wrist", 1, 0, "Your wrists are bare.", "Wrists", 0)
export const bronzeBracers = new WristArmor("Bronze Bracers", "Armor", "Wrist", 1, 10, "A pair of bronze bracers.", "Wrists", 2)
export const ironBracers = new WristArmor("Iron Bracers", "Armor", "Wrist", 1, 20, "A pair of sturdy iron bracers.", "Wrists", 3)
export const leatherBracers = new WristArmor("Leather Bracers", "Armor", "Wrist", 1, 5, "A pair of leather bracers.", "Wrists", 2)

export class OffHand extends Equipable {
    constructor(name: string, type: string = "OffHand", subType: string = "N/A", quantity: number, cost: number, description: string, slot: string = "OffHand") {
        super(name, type, subType, quantity, cost, description, slot);
    }
}
export const emptyHand = new OffHand("Empty Hand", "OffHand", "N/A", 1, 0, "Your off-hand is empty", "OffHand")
export const fullHand = new OffHand("Full Hand", "OffHand", "N/A", 1, 0, "Your off-hand is occupied by a Two-Handed Weapon", "OffHand")

export class OffHandWeapon extends OffHand {
    power: number
    constructor(name: string, type: string = "OffHand", subType: string = "OffHandWeapon", quantity: number, cost: number, description: string, slot: string, power: number) {
        super(name, type, subType, quantity, cost, description, slot);
        this.power = power;
    }
}
export class OffHandAxe extends OffHandWeapon {
    constructor(name: string, type: string = "OffHand", subType: string = "OffHandWeapon", quantity: number, cost: number, description: string, slot: string, power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const bronzeAxeOffHand = new OffHandAxe("Bronze Axe", "OffHand", "OffHandWeapon", 1, 5, "A sturdy bronze axe", "OffHand", 2)
export const ironAxeOffHand = new OffHandAxe("Iron Axe", "OffHand", "OffHandAxe", 1, 10, "A sturdy iron axe", "OffHand", 3)
export class OffHandDagger extends OffHandWeapon {
    constructor(name: string, type: string = "OffHand", subType: string = "OffHandWeapon", quantity: number, cost: number, description: string, slot: string, power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const bronzeDaggerOffHand = new OffHandDagger("Bronze Dagger (OffHand)", "OffHand", "OffHandWeapon", 1, 5, "A sharp bronze dagger", "OffHand", 2)
export const ironDaggerOffHand = new OffHandDagger("Iron Dagger (OffHand)", "OffHand", "OffHandWeapon", 1, 10, "A sharp iron dagger", "OffHand", 3)
export class OffHandClub extends OffHandWeapon {
    constructor(name: string, type: string = "OffHand", subType: string = "OffHandWeapon", quantity: number, cost: number, description: string, slot: string, power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const clubOffHand = new OffHandClub("Wooden Club (OffHand)", "OffHand", "OffHandWeapon", 1, 1, "A crude wooden club", "OffHand", 1)
export class OffHandHammer extends OffHandWeapon {
    constructor(name: string, type: string = "OffHand", subType: string = "OffHandWeapon", quantity: number, cost: number, description: string, slot: string, power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const bronzeHammerOffHand = new OffHandHammer("Bronze Hammer (OffHand)", "OffHand", "OffHandWeapon", 1, 5, "A sturdy bronze hammer", "OffHand", 2)
export const ironHammerOffHand = new OffHandHammer("Iron Hammer (OffHand)", "OffHand", "OffHandWeapon", 1, 10, "A sturdy iron hammer", "OffHand", 3)

export class OffHandMace extends OffHandWeapon {
    constructor(name: string, type: string = "OffHand", subType: string = "OffHandWeapon", quantity: number, cost: number, description: string, slot: string, power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const bronzeMaceOffHand = new OffHandMace("Bronze Mace (OffHand)", "OffHand", "OffHandWeapon", 1, 5, "A sturdy bronze mace", "OffHand", 2)
export const ironMaceOffHand = new OffHandMace("Iron Mace (OffHand)", "OffHand", "OffHandWeapon", 1, 10, "A sturdy iron mace", "OffHand", 3)
export class OffHandSpear extends OffHandWeapon {
    constructor(name: string, type: string = "OffHand", subType: string = "OffHandWeapon", quantity: number, cost: number, description: string, slot: string, power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const bronzeSpearOffHand = new OffHandSpear("Bronze Spear (OffHand)", "OffHand", "OffHandWeapon", 1, 5, "A sturdy bronze spear", "OffHand", 2)
export const ironSpearOffHand = new OffHandSpear("Iron Spear (OffHand)", "OffHand", "OffHandWeapon", 1, 10, "A sturdy iron spear", "OffHand", 3)
export class OffHandSword extends OffHandWeapon {
    constructor(name: string, type: string = "OffHand", subType: string = "OffHandWeapon", quantity: number, cost: number, description: string, slot: string, power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const bronzeSwordOffHand = new OffHandSword("Bronze Sword (OffHand)", "OffHand", "OffHandWeapon", 1, 5, "A sturdy bronze sword", "OffHand", 2)
export const ironSwordOffHand = new OffHandSword("Iron Sword (OffHand)", "OffHand", "OffHandWeapon", 1, 10, "A sturdy iron sword", "OffHand", 3)

export class Shield extends OffHand {
    protection: number
    constructor(name: string, type: string = "OffHand", subType: string = "Shield", quantity: number, cost: number, description: string, slot: string = "OffHand", protection: number) {
        super(name, type, subType, quantity, cost, description, slot);
        this.protection = protection;
    }
}
export const bronzeShield = new Shield("Bronze Shield", "OffHand", "Shield", 1, 5, "A sturdy bronze shield", "OffHand", 2)
export const ironShield = new Shield("Iron Shield", "OffHand", "Shield", 1, 10, "A sturdy iron shield", "OffHand", 3)
export const woodenShield = new Shield("Wooden Shield", "OffHand", "Shield", 1, 1, "A little splintery", "OffHand", 1)
export class Weapon extends Equipable {
    power: number
    constructor(name: string, type: string = "Weapon", subType: string = "N/A", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot);
        this.power = power;
    }
}
export class NaturalWeapon extends Weapon {
    constructor(name: string, type: string = "Weapon", subType: string = "Natural", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const bareFist = new NaturalWeapon("Bare Fist", "Weapon", "Natural", 0, 1, "Your own two fists", "Weapon", 1)
export const charge = new NaturalWeapon("Charge", "Weapon", "Natural", 0, 1, "A powerful charge", "Weapon", 1)
export const dogBite = new NaturalWeapon("Dog Bite", "Weapon", "Natural", 0, 1, "A Dog's powerful jaws", "Weapon", 5)
export const ratBite = new NaturalWeapon("Rat Bite", "Weapon", "Natural", 0, 1, "A Rat's sharp teeth", "Weapon", 1)
export class OneHandedWeapon extends Weapon {
    constructor(name: string, type: string = "1H Weapon", subType: string = "N/A", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
        this.power = power;
    }
}
export class OneHandedAxeWeapon extends OneHandedWeapon {
    constructor(name: string, type: string = "1H Weapon", subType: string = "1H Axe", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const bronzeAxe = new OneHandedAxeWeapon("Bronze Axe", "1H Weapon", "1H Axe", 1, 5, "A sturdy bronze axe", "Weapon", 2)
export const ironAxe = new OneHandedAxeWeapon("Iron Axe", "1H Weapon", "1H Axe", 1, 10, "A sturdy iron axe", "Weapon", 3)
export class OneHandedClubWeapon extends OneHandedWeapon {
    constructor(name: string, type: string = "1H Weapon", subType: string = "1H Club", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const club = new OneHandedClubWeapon("Wooden Club", "1H Weapon", "1H Club", 1, 1, "A crude wooden club", "Weapon", 1)
export class DaggerWeapon extends OneHandedWeapon {
    constructor(name: string, type: string = "1H Weapon", subType: string = "Dagger", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const bronzeDagger = new DaggerWeapon("Bronze Dagger", "1H Weapon", "Dagger", 1, 5, "A sharp bronze dagger", "Weapon", 2)
export const ironDagger = new DaggerWeapon("Iron Dagger", "1H Weapon", "Dagger", 1, 10, "A sharp iron dagger", "Weapon", 3)
export class OneHandedHammerWeapon extends OneHandedWeapon {
    constructor(name: string, type: string = "1H Weapon", subType: string = "1H Hammer", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const bronzeHammer = new OneHandedHammerWeapon("Bronze Hammer", "1H Weapon", "1H Hammer", 1, 5, "A sturdy bronze hammer", "Weapon", 2)
export const ironHammer = new OneHandedHammerWeapon("Iron Hammer", "1H Weapon", "1H Hammer", 1, 10, "A sturdy iron hammer", "Weapon", 3)
export class OneHandedMaceWeapon extends OneHandedWeapon {
    constructor(name: string, type: string = "1H Weapon", subType: string = "1H Mace", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const bronzeMace = new OneHandedMaceWeapon("Bronze Mace", "1H Weapon", "1H Mace", 1, 5, "A sturdy bronze mace", "Weapon", 2)
export const ironMace = new OneHandedMaceWeapon("Iron Mace", "1H Weapon", "1H Mace", 1, 10, "A sturdy iron mace", "Weapon", 3)
export class OneHandedSpearWeapon extends OneHandedWeapon {
    constructor(name: string, type: string = "1H Weapon", subType: string = "1H Spear", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const bronzeSpear = new OneHandedSpearWeapon("Bronze Spear", "1H Weapon", "1H Spear", 1, 5, "A sturdy bronze spear", "Weapon", 2)
export const ironSpear = new OneHandedSpearWeapon("Iron Spear", "1H Weapon", "1H Spear", 1, 10, "A sturdy iron spear", "Weapon", 3)
export class OneHandedSwordWeapon extends OneHandedWeapon {
    constructor(name: string, type: string = "1H Weapon", subType: string = "1H Sword", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const bronzeSword = new OneHandedSwordWeapon("Bronze Sword", "1H Weapon", "1H Sword", 1, 5, "A sturdy bronze sword", "Weapon", 2)
export const ironSword = new OneHandedSwordWeapon("Iron Sword", "1H Weapon", "1H Sword", 1, 10, "A sturdy iron sword", "Weapon", 3)
export class TwoHandedWeapon extends Weapon {
    constructor(name: string, type: string = "2H Weapon", subType: string = "N/A", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
        this.power = power;
    }
}
export class TwoHandedAxeWeapon extends TwoHandedWeapon {
    constructor(name: string, type: string = "2H Weapon", subType: string = "2H Axe", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
        this.power = power;
    }
}
export const bronzeTwoHandedAxe = new TwoHandedAxeWeapon("Bronze Two-Handed Axe", "2H Weapon", "2H Axe", 1, 10, "A sturdy bronze two-handed axe", "Weapon", 4)
export const ironTwoHandedAxe = new TwoHandedAxeWeapon("Iron Two-Handed Axe", "2H Weapon", "2H Axe", 1, 20, "A sturdy iron two-handed axe", "Weapon", 6)
export class TwoHandedClubWeapon extends TwoHandedWeapon {
    constructor(name: string, type: string = "2H Weapon", subType: string = "2H Club", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
        this.power = power;
    }
}
export class TwoHandedHammerWeapon extends TwoHandedWeapon {
    constructor(name: string, type: string = "2H Weapon", subType: string = "2H Hammer", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
        this.power = power;
    }
}
export const bronzeTwoHandedHammer = new TwoHandedHammerWeapon("Bronze Two-Handed Hammer", "2H Weapon", "2H Hammer", 1, 10, "A sturdy bronze two-handed hammer", "Weapon", 4)
export const ironTwoHandedHammer = new TwoHandedHammerWeapon("Iron Two-Handed Hammer", "2H Weapon", "2H Hammer", 1, 20, "A sturdy iron two-handed hammer", "Weapon", 6)
export class TwoHandedMaceWeapon extends TwoHandedWeapon {
    constructor(name: string, type: string = "2H Weapon", subType: string = "2H Mace", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
        this.power = power;
    }
}
export const bronzeTwoHandedMace = new TwoHandedMaceWeapon("Bronze Two-Handed Mace", "2H Weapon", "2H Mace", 1, 10, "A sturdy bronze two-handed mace", "Weapon", 4)
export const ironTwoHandedMace = new TwoHandedMaceWeapon("Iron Two-Handed Mace", "2H Weapon", "2H Mace", 1, 20, "A sturdy iron two-handed mace", "Weapon", 6)
export class TwoHandedSpearWeapon extends TwoHandedWeapon {
    constructor(name: string, type: string = "2H Weapon", subType: string = "2H Spear", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
        this.power = power;
    }
}
export const bronzeTwoHandedSpear = new TwoHandedSpearWeapon("Bronze Two-Handed Spear", "2H Weapon", "2H Spear", 1, 10, "A sturdy bronze two-handed spear", "Weapon", 4)
export const ironTwoHandedSpear = new TwoHandedSpearWeapon("Iron Two-Handed Spear", "2H Weapon", "2H Spear", 1, 20, "A sturdy iron two-handed spear", "Weapon", 6)
export class TwoHandedSwordWeapon extends TwoHandedWeapon {
    constructor(name: string, type: string = "2H Weapon", subType: string = "2H Sword", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
        this.power = power;
    }
}
export const bronzeTwoHandedSword = new TwoHandedSwordWeapon("Bronze Two-Handed Sword", "2H Weapon", "2H Sword", 1, 10, "A sturdy bronze two-handed sword", "Weapon", 4)
export const ironTwoHandedSword = new TwoHandedSwordWeapon("Iron Two-Handed Sword", "2H Weapon", "2H Sword", 1, 20, "A sturdy iron two-handed sword", "Weapon", 6)
export class StaffWeapon extends TwoHandedWeapon {
    constructor(name: string, type: string = "2H Weapon", subType: string = "2H Staff", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
        this.power = power;
    }
}
export const bronzeStaff = new StaffWeapon("Bronze Staff", "2H Weapon", "2H Staff", 1, 10, "A sturdy bronze staff", "Weapon", 4)
export const ironStaff = new StaffWeapon("Iron Staff", "2H Weapon", "2H Staff", 1, 20, "A sturdy iron staff", "Weapon", 6)
export const woodenStaff = new StaffWeapon("Wooden Staff", "2H Weapon", "2H Staff", 1, 1, "A simple wooden staff", "Weapon", 2)

export const leatherArmor = [
    leatherChest,
    leatherBoots,
    leatherGauntlets,
    leatherCowl,
    leatherLegs,
    leatherPauldrons,
    leatherBelt,
    leatherBracers
];

export const bronzeArmor = [
    bronzeChest,
    bronzeBoots,
    bronzeGauntlets,
    bronzeHelmet,
    bronzeLegs,
    bronzePauldrons,
    bronzeBelt,
    bronzeBracers,
    bronzeShield
];

export const bronzeWeapons = [
    bronzeAxe,
    bronzeDagger,
    bronzeHammer,
    bronzeMace,
    bronzeSpear,
    bronzeSword,
    bronzeTwoHandedAxe,
    bronzeTwoHandedHammer,
    bronzeTwoHandedMace,
    bronzeTwoHandedSpear,
    bronzeStaff,
    bronzeTwoHandedSword
];

export const ironArmor = [
    ironChest,
    ironBoots,
    ironGauntlets,
    ironHelmet,
    ironLegs,
    ironPauldrons,
    ironBelt,
    ironBracers,
    ironShield
];

export const ironWeapons = [
    ironAxe,
    ironDagger,
    ironHammer,
    ironMace,
    ironSpear,
    ironSword,
    ironTwoHandedAxe,
    ironTwoHandedHammer,
    ironTwoHandedMace,
    ironTwoHandedSpear,
    ironStaff,
    ironTwoHandedSword
];
export class Resource extends Item {
    constructor(name: string, type: string = "Resource", subType: string = "N/A", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export class Bar extends Resource {
    constructor(name: string, type: string = "Resource", subType: string = "Bar", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export const bronzeBar = new Bar("Bronze Bar", "Resource", "Bar", 1, 1, "A smelted Bronze Bar")
export const ironBar = new Bar("Iron Bar", "Resource", "Bar", 1, 5, "A smelted Iron Bar")
export class Cloth extends Resource {
    constructor(name: string, type: string = "Resource", subType: string = "Cloth", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export const linenCloth = new Cloth("Linen Cloth", "Resource", "Cloth", 1, 1, "Some spun linen cloth")
export class Leather extends Resource {
    constructor(name: string, type: string = "Resource", subType: string = "Leather", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export const cowLeather = new Leather("Leather", "Resource", "Leather", 1, 1, "Leather from a cow")
export const wool = new Leather("Wool", "Resource", "Leather", 1, 1, "Some soft woll")
export class Logs extends Resource {
    constructor(name: string, type: string = "Resource", subType: string = "Logs", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export const woodLogs = new Logs("Logs", "Resource", "Logs", 1, 1, "Logs from a generic tree")
export class Ore extends Resource {
    constructor(name: string, type: string = "Resource", subType: string = "Ore", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export const copperOre = new Ore("Copper Ore", "Resource", "Ore", 1, 1, "A chunk of Copper ore")
export const ironOre = new Ore("Iron Ore", "Resource", "Ore", 1, 5, "A chunk of Iron ore")
export const tinOre = new Ore("Tin Ore", "Resource", "Ore", 1, 1, "A chunk of Tin ore")
export class Processed extends Resource {
    constructor(name: string, type: string = "Resource", subType: string = "Processed", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export const wheatFlour = new Processed("Wheat Flour", "Resource", "Processed", 1, 1, "A bag of flour")
export class Produce extends Resource {
    constructor(name: string, type: string = "Resource", subType: string = "Produce", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export const flax = new Produce("Flax", "Resource", "Produce", 1, 1, "A bundle of flax")
export const wheat = new Produce("Wheat", "Resource", "Produce", 1, 1, "A sheaf of wheat")
export class RawFish extends Resource {
    constructor(name: string, type: string = "Resource", subType: string = "RawFish", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export const rawMinnow = new RawFish("Raw Minnow", "Resource", "RawFish", 1, 1, "A raw minnow")
export const rawSalmon = new RawFish("Raw Salmon", "Resource", "RawFish", 1, 1, "A raw salmon")
export const rawTrout = new RawFish("Raw Trout", "Resource", "RawFish", 1, 1, "A raw trout")
export class RawMeat extends Resource {
    constructor(name: string, type: string = "Resource", subType: string = "RawMeat", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export const rawBeef = new RawFish("Raw Beef", "Resource", "RawMeat", 1, 1, "A slab of raw beef")
export class Tool extends Item {
    constructor(name: string, type: string = "Tool", subType: string = "N/A", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        //return super.use(user);
        return user;
    }
}
export class FletchingKnife extends Tool {
    constructor(name: string, type: string = "Tool", subType: string = "Fletching Knife", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    //override use(user: Character): Character {
    //    return super.use(user);
    //}
}
export class FishingRod extends Tool {
    constructor(name: string, type: string = "Tool", subType: string = "Fishing Rod", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    //override use(user: Character): Character {
    //    return super.use(user);
    //}
}
export const basicFishingRod = new FishingRod("Basic Fishing Rod", "Tool", "Fishing Rod", 1, 5, "A basic rod for fishing")
export class Hatchet extends Tool {
    constructor(name: string, type: string = "Tool", subType: string = "Hatchet", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    //override use(user: Character): Character {
    //    return super.use(user);
    //}
}
export const basicHatchet = new Hatchet("Basic Hatchet", "Tool", "Hatchet", 1, 5, "A basic hatchet for felling trees")
export class Pickaxe extends Tool {
    constructor(name: string, type: string = "Tool", subType: string = "Pickaxe", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    //override use(user: Character): Character {
    //    return super.use(user);
    //}
}
export const basicPickaxe = new Pickaxe("Basic Pickaxe", "Tool", "Pickaxe", 1, 5, "A basic pickaxe for mining ore")
export class NeedleAndThread extends Tool {
    constructor(name: string, type: string = "Tool", subType: string = "Needle and Thread", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    //maybe change the use to open a skill node
    //override use(user: Character): Character {
    //    return super.use(user);
    //}
}
export const basicNeedleAndThread = new NeedleAndThread("Basic Needle and Thread", "Tool", "Needl and Thread", 1, 5, "A basic needle and thread")
export class Shears extends Tool {
    constructor(name: string, type: string = "Tool", subType: string = "Shears", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    //override use(user: Character): Character {
    //    return super.use(user);
    //}
}
export const basicShears = new Shears("Basic Shears", "Tool", "Shears", 1, 5, "A pair of shears for shearing sheep")
export class Sickle extends Tool {
    constructor(name: string, type: string = "Tool", subType: string = "Sickle", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    //override use(user: Character): Character {
    //    return super.use(user);
    //}
}

export const basicSickle = new Sickle("Basic Sickle", "Tool", "Sickle", 1, 5, "A basic sickle for harvesting produce")