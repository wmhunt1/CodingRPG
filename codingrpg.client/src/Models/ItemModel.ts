//Models/ItemModel.ts

import { Character } from "./CharacterModel";
import { addItemToInventory, removeItemFromInventory } from "..//Utils/InventoryUtils";

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
export const bucket = new Item("Bucket", "Misc", "Misc", 1, 5, "A bucket")
export const burntBread = new Item("Burnt Bread", "Junk", "Burnt Bread", 1, 0, "A burnt loaf of bread")
export const burntFish = new Item("Burnt Fish", "Junk", "Burnt Fish", 1, 0, "A burnt fish")

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
export const cookedMinnow = new Food("Cooked Minnow", "Food", "CookedFish", 1, 2, "A cooked minnow, not very filling", 0)

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
        user.currentHP += this.consumedValue;
        if (user.currentHP > user.maxHP) {
            user.currentHP = user.maxHP;
        }
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
                bareItem = bareFist;
                break;
            case "OffHand":
                oldEquippedItem = user.offHand;
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

        // If there was an old item, and it wasn't a "bare" item, add it back to the inventory.
        if (oldEquippedItem && bareItem && oldEquippedItem.name !== bareItem.name) {
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
export const cloak = new Back("Cloak", "Acessory", "Back", 1, 0, "A Simple Cloak", "Back")

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
export const tunic = new ChestArmor("Tunic", "Armor", "Chest", 1, 0, "A simple cloth tunic. Offers minimal protection.", "Chest", 1)

export class FootArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Foot", quantity: number, cost: number, description: string, slot: string = "Feet", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareFeet = new FootArmor("Bare Feet", "Armor", "Foot", 1, 0, "You're not wearing anything on your feet.", "Feet", 0)
export const boots = new FootArmor("Bare Feet", "Armor", "Foot", 1, 1, "Sturdy boots for walking and minor protection.", "Feet", 1)
export const shoes = new FootArmor("Shoes", "Armor", "Foot", 1, 1, "A pair of comfortable shoes.", "Feet", 0)

export class HandArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Hand", quantity: number, cost: number, description: string, slot: string = "Hands", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareHands = new HandArmor("Bare Hands", "Armor", "Hand", 1, 0, "You're not wearing anything on your hands.", "Hands", 0)
export const gloves = new HandArmor("Gloves", "Armor", "Hand", 1, 1, "A pair of simple gloves.", "Hands", 1)

export class HeadArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Head", quantity: number, cost: number, description: string, slot: string = "Head", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareHead = new HandArmor("Bare Head", "Armor", "Head", 1, 0, "Your head is bare.", "Head", 0)

export class LegArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Leg", quantity: number, cost: number, description: string, slot: string = "Legs", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareLegs = new LegArmor("Bare Legs", "Armor", "Leg", 1, 0, "Your legs are bare.", "Legs", 0)
export const pants = new LegArmor("Pants", "Armor", "Leg", 1, 1, "A simple pair of pants", "Legs", 1)

export class ShoulderArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Shoulder", quantity: number, cost: number, description: string, slot: string = "Shoulders", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareShoulders = new LegArmor("Bare Shoulders", "Armor", "Shoulder", 1, 0, "Your shoulders are bare.", "Shoulders", 0)

export class WaistArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Waist", quantity: number, cost: number, description: string, slot: string = "Waist", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareWaist = new WaistArmor("Bare Waist", "Armor", "Waist", 1, 0, "Your waist is bare.", "Waist", 0)

export class WristArmor extends Armor {
    constructor(name: string, type: string = "Armor", subType: string = "Wrist", quantity: number, cost: number, description: string, slot: string = "Wrists", protection: number) {
        super(name, type, subType, quantity, cost, description, slot, protection);
        this.protection = protection;
    }
}
export const bareWrists = new WristArmor("Bare Wrists", "Armor", "Wrist", 1, 0, "Your wrists are bare.", "Wrists", 0)

export class OffHand extends Equipable {
    constructor(name: string, type: string = "OffHand", subType: string = "N/A", quantity: number, cost: number, description: string, slot: string = "OffHand") {
        super(name, type, subType, quantity, cost, description, slot);
    }
}
export const emptyHand = new OffHand("Empty Hand", "OffHand", "N/A", 1, 0, "Your off-hand is empty", "OffHand")

export class OffHandWeapon extends OffHand {
    power: number
    constructor(name: string, type: string = "OffHand", subType: string = "OffHandWeapon", quantity: number, cost: number, description: string, slot: string, power: number) {
        super(name, type, subType, quantity, cost, description, slot);
        this.power = power;
    }
}
export class Shield extends OffHand {
    protection: number
    constructor(name: string, type: string = "OffHand", subType: string = "Shield", quantity: number, cost: number, description: string, slot: string = "OffHand", protection: number) {
        super(name, type, subType, quantity, cost, description, slot);
        this.protection = protection;
    }
}
export const woodenShield = new Shield("Wooden Shield", "OffHand", "Shield", 1, 1, "A little splintery", "OffHand", 1)
export class Weapon extends Equipable {
    power: number
    constructor(name: string, type: string = "Weapon", subType: string = "N/A", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot);
        this.power = power;
    }
}
export class BluntWeapon extends Weapon {
    constructor(name: string, type: string = "Weapon", subType: string = "Blunt", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const club = new BluntWeapon("Club", "Weapon", "Blunt", 1, 1, "A crude wooden club", "Weapon", 1)

export class NaturalWeapon extends Weapon {
    constructor(name: string, type: string = "Weapon", subType: string = "Natural", quantity: number, cost: number, description: string, slot: string = "Weapon", power: number) {
        super(name, type, subType, quantity, cost, description, slot, power);
    }
}
export const bareFist = new NaturalWeapon("Bare Fist", "Weapon", "Natural", 0, 1, "Your own two fists", "Weapon", 1)
export const ratBite = new NaturalWeapon("Rat Bite", "Weapon", "Natural", 0, 1, "A Rat's sharp teeth", "Weapon", 1)

export class Resource extends Item {
    constructor(name: string, type: string = "Resource", subType: string = "N/A", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export class RawFish extends Resource {
    constructor(name: string, type: string = "Resource", subType: string = "RawFish", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export const rawMinnow = new RawFish("Raw Minnow", "Resource", "RawFish", 1, 1, "A raw minnow")
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
export const wheat = new Produce("Wheat", "Resource", "Produce", 1, 1, "A sheaf of wheat")
export class Tool extends Item {
    constructor(name: string, type: string = "Tool", subType: string = "N/A", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export class FishingRod extends Tool {
    constructor(name: string, type: string = "Tool", subType: string = "Fishing Rod", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export const basicFishingRod = new FishingRod("Basic Fishing Rod", "Tool", "Fishing Rod", 1, 5, "A basic rod for fishing")
export class Hatchet extends Tool {
    constructor(name: string, type: string = "Tool", subType: string = "Hatchet", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export class Pickaxe extends Tool {
    constructor(name: string, type: string = "Tool", subType: string = "Pickaxe", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}
export class Sickle extends Tool {
    constructor(name: string, type: string = "Tool", subType: string = "Sickle", quantity: number, cost: number, description: string) {
        super(name, type, subType, quantity, cost, description);
    }
    override use(user: Character): Character {
        return super.use(user);
    }
}

export const basicSickle = new Sickle("Basic Sickle", "Tool", "Sickle", 1, 5, "A basic sickle for harvesting produce")