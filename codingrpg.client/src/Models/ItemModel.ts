// Models/ItemModel.ts

import { Character } from "./CharacterModel";
import { addItemToInventory, removeItemFromInventory } from "..//Utils/InventoryUtils";
export class Item {
    name: string;
    quantity: number;
    cost: number;
    description: string = "";

    constructor(name: string, quantity: number, cost: number) {
        this.name = name;
        this.quantity = quantity;
        this.cost = cost;
    }

    // The 'use' method now returns the updated Character to simplify component logic
    use(user: Character): Character {
        // By default, using an item removes one from inventory
        removeItemFromInventory(user.inventory, this);
        return user; // Return the modified character
    }
}

export class Consumable extends Item {
    consumedValue: number;
    constructor(name: string, quantity: number, consumedValue: number, cost: number) {
        super(name, quantity, cost);
        this.consumedValue = consumedValue;
    }
    override use(user: Character): Character {
        // Consumables typically just remove themselves from inventory
        return super.use(user); // Call parent to handle quantity decrement/removal
    }
}
export class Drink extends Consumable {
    constructor(name: string, quantity: number, consumedValue: number, cost: number) {
        super(name, quantity, consumedValue, cost);
    }
    override use(user: Character): Character {
        // Potions also just remove themselves from inventory
        return super.use(user);
    }
}
export class Beer extends Drink {
    constructor() {
        const name = "Beer";
        const quantity = 1;
        const consumedValue = 0;
        const cost = 5;
        super(name, quantity, consumedValue, cost);
        this.description = `A mug of ${this.name}`
    }
}
export class Food extends Consumable {
    constructor(name: string, quantity: number, consumedValue: number, cost: number) {
        super(name, quantity, consumedValue, cost);
    }
    override use(user: Character): Character {
        // Potions also just remove themselves from inventory
        return super.use(user);
    }
}
export class Bread extends Food {
    constructor() {
        const name = "Bread";
        const quantity = 1;
        const consumedValue = 0;
        const cost = 5;
        super(name, quantity, consumedValue, cost);
        this.description = `A loaf of ${this.name}`
    }
}
export class Potion extends Consumable {
    constructor(name: string, quantity: number, consumedValue: number, cost: number) {
        super(name, quantity, consumedValue, cost);
    }
    override use(user: Character): Character {
        // Potions also just remove themselves from inventory
        return super.use(user);
    }
}
export class HealthPotion extends Potion {
    constructor(name: string, quantity: number, consumedValue: number, cost: number) {
        super(name, quantity, consumedValue, cost);
        this.description = `A ${this.name} that provides ${this.consumedValue} points of healing`
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
export class BasicHealthPotion extends HealthPotion {
    constructor() {
        const name = "Basic Health Potion"
        const quantity = 1;
        const consumedValue = 5;
        const cost = 10;
        super(name, quantity, consumedValue, cost);
    }
}
//mana potion

export class Equipable extends Item {
    slot: string;
    constructor(name: string, quantity: number, cost: number, slot: string) { // Changed constructor order for consistency
        super(name, quantity, cost);
        this.slot = slot;
    }

    // The use method now handles equipping and returning the old item
    override use(user: Character): Character {
        let oldEquippedItem: Equipable | Item | null = null;
        let bareItem: Item; // The default "bare" item for the slot

        // Equip the new item and store the old one
        if (this.slot === "Weapon" && user.mainHand) {
            oldEquippedItem = user.mainHand;
            user.mainHand = this as unknown as Weapon;
            bareItem = new BareFist();
        } else if (this.slot === "OffHand" && user.offHand) {
            oldEquippedItem = user.offHand;
            user.offHand = this as unknown as OffHand;
            bareItem = new EmptyHand();
        } else if (this.slot === "Head" && user.head) {
            oldEquippedItem = user.head;
            user.head = this as unknown as HeadArmor;
            bareItem = new BareHead();
        } else if (this.slot === "Shoulders" && user.shoulders) {
            oldEquippedItem = user.shoulders;
            user.shoulders = this as unknown as ShoulderArmor;
            bareItem = new BareShoulders();
        } else if (this.slot === "Chest" && user.chest) {
            oldEquippedItem = user.chest;
            user.chest = this as unknown as ChestArmor;
            bareItem = new BareChest();
        } else if (this.slot === "Wrists" && user.wrists) {
            oldEquippedItem = user.wrists;
            user.wrists = this as unknown as WristArmor;
            bareItem = new BareWrists();
        } else if (this.slot === "Hands" && user.hands) {
            oldEquippedItem = user.hands;
            user.hands = this as unknown as HandArmor;
            bareItem = new BareHands();
        } else if (this.slot === "Waist" && user.waist) {
            oldEquippedItem = user.waist;
            user.waist = this as unknown as WaistArmor;
            bareItem = new BareWaist();
        } else if (this.slot === "Legs" && user.legs) {
            oldEquippedItem = user.legs;
            user.legs = this as unknown as LegArmor;
            bareItem = new BareLegs();
        } else if (this.slot === "Feet" && user.feet) {
            oldEquippedItem = user.feet;
            user.feet = this as unknown as FootArmor;
            bareItem = new BareFeet();
        } else if (this.slot === "Neck" && user.neck) {
            oldEquippedItem = user.neck;
            user.neck = this as unknown as Neck;
            bareItem = new BareNeck();
        } else if (this.slot === "Finger" && user.finger) {
            oldEquippedItem = user.finger;
            user.finger = this as unknown as Ring;
            bareItem = new BareFinger();
        } else if (this.slot === "Back" && user.back) {
            oldEquippedItem = user.back;
            user.back = this as unknown as Back;
            bareItem = new BareBack();
        } else {
            // Handle cases where the slot isn't recognized or the current slot is empty
            console.warn(`Attempted to equip item to unhandled slot: ${this.slot}`);
            // If the item doesn't replace anything, just remove it from inventory and return
            removeItemFromInventory(user.inventory, this);
            return user;
        }

        // If an item was actually unequipped (i.e., not a "Bare" item), add it back to inventory
        if (oldEquippedItem && oldEquippedItem.name !== bareItem.name) {
            addItemToInventory(user.inventory, oldEquippedItem);
            console.log(`${user.name} unequipped ${oldEquippedItem.name}.`);
        }

        // Remove the newly equipped item from the user's inventory
        removeItemFromInventory(user.inventory, this);
        console.log(`${user.name} equipped ${this.name}.`);

        return user; // Return the modified character
    }
}
export class Accessory extends Equipable {
    constructor(name: string, quantity: number, cost: number, slot: string) {
        super(name, quantity, cost, slot);
    }
}
export class Back extends Accessory {
    constructor(name: string, quantity: number, cost: number) {
        const slot = "Back"
        super(name, quantity, cost, slot);
    }
}
export class BareBack extends Back {
    constructor() {
        super("Bare Back", 1, 0);
    }
}
export class Cloak extends Back {
    constructor() {
        super("Cloak", 1, 1);
    }
}
export class Neck extends Accessory {
    constructor(name: string, quantity: number, cost: number) {
        const slot = "Neck"
        super(name, quantity, cost, slot);
    }
}
export class BareNeck extends Neck {
    constructor() {
        super("Bare Neck", 1, 0);
    }
}
export class Ring extends Accessory {
    constructor(name: string, quantity: number, cost: number) {
        const slot = "Finger"
        super(name, quantity, cost, slot);
    }
}
export class BareFinger extends Ring {
    constructor() {
        super("Bare Finger", 1, 0);
    }
}
export class Armor extends Equipable {
    protection: number;
    constructor(name: string, quantity: number, cost: number, slot: string, protection: number) {
        super(name, quantity, cost, slot);
        this.protection = protection;
        this.description = `A ${this.name} that provides ${this.protection} protection.`;
    }
}

export class ChestArmor extends Armor {
    constructor(name: string, quantity: number, cost: number, protection: number) {
        super(name, quantity, cost, "Chest", protection);
    }
}

export class BareChest extends ChestArmor {
    constructor() {
        super("Bare Chest", 1, 0, 0);
        this.description = "You're bare-chested. No protection.";
    }
}

export class Tunic extends ChestArmor {
    constructor() {
        super("Tunic", 1, 1, 1);
        this.description = "A simple cloth tunic. Offers minimal protection.";
    }
}
export class FootArmor extends Armor {
    constructor(name: string, quantity: number, cost: number, protection: number) {
        super(name, quantity, cost, "Feet", protection);
    }
}
export class BareFeet extends FootArmor {
    constructor() {
        super("Bare Feet", 1, 0, 0);
    }
}
export class Boots extends FootArmor {
    constructor() {
        super("Boots", 1, 1, 1);
    }
}
export class Shoes extends FootArmor {
    constructor() {
        super("Shoes", 1, 1, 1);
    }
}
export class HandArmor extends Armor {
    constructor(name: string, quantity: number, cost: number, protection: number) {
        super(name, quantity, cost, "Hands", protection);
    }
}
export class BareHands extends HandArmor {
    constructor() {
        super("Bare Hands", 1, 0, 0);
    }
}
export class Gloves extends HandArmor {
    constructor() {
        super("Gloves", 1, 1, 1);
    }
}
export class HeadArmor extends Armor {
    constructor(name: string, quantity: number, cost: number, protection: number) {
        super(name, quantity, cost, "Head", protection);
    }
}
export class BareHead extends HeadArmor {
    constructor() {
        super("Bare Head", 1, 0, 0);
    }
}
export class Hat extends HeadArmor {
    constructor() {
        super("Hat", 1, 1, 1);
    }
}
export class LegArmor extends Armor {
    constructor(name: string, quantity: number, cost: number, protection: number) {
        super(name, quantity, cost, "Legs", protection);
    }
}
export class BareLegs extends LegArmor {
    constructor() {
        super("Bare Legs", 1, 0, 0);
    }
}
export class Pants extends LegArmor {
    constructor() {
        super("Pants", 1, 1, 1);
        this.description = "A simple pair of pants";
    }
}
export class ShoulderArmor extends Armor {
    constructor(name: string, quantity: number, cost: number, protection: number) {
        super(name, quantity, cost, "Shoulders", protection);
    }
}
export class BareShoulders extends ShoulderArmor {
    constructor() {
        super("Bare Shoulders", 1, 0, 0);
    }
}
export class WaistArmor extends Armor {
    constructor(name: string, quantity: number, cost: number, protection: number) {
        super(name, quantity, cost, "Waist", protection);
    }
}
export class BareWaist extends WaistArmor {
    constructor() {
        super("Bare Waist", 1, 0, 0);
    }
}
export class WristArmor extends Armor {
    constructor(name: string, quantity: number, cost: number, protection: number) {
        super(name, quantity, cost, "Wrists", protection);
    }
}
export class BareWrists extends WristArmor {
    constructor() {
        super("Bare Wrists", 1, 0, 0);
    }
}
//weapons
export class OffHand extends Equipable {
    constructor(name: string, quantity: number, cost: number) {
        super(name, quantity, cost, "OffHand");
    }
}
export class EmptyHand extends OffHand {
    constructor() {
        const name = "Empty Hand";
        const quantity = 1;
        const cost = 0;
        super(name, quantity, cost);
    }
}
export class OffHandWeapon extends OffHand {
    power: number;
    constructor(name: string, quantity: number, cost: number, power: number) {
        super(name, quantity, cost);
        this.power = power;
        this.description = `${this.name}: ${this.power} DMG.`;
    }
}
export class Shield extends OffHand {
    protection: number;
    constructor(name: string, quantity: number, cost: number, protection: number) {
        super(name, quantity, cost);
        this.protection = protection;
        this.description = `${this.name}: ${this.protection} Protection.`;
    }
}
export class WoodenShield extends Shield {
    constructor() {
        super("Wooden Shield", 1, 1, 1);
    }
}
export class Weapon extends Equipable {
    power: number;
    constructor(name: string, quantity: number, cost: number, power: number) {
        super(name, quantity, cost, "Weapon");
        this.power = power;
        this.description = `A ${this.name} that deals ${this.power} DMG.`;
    }
}

export class BluntWeapon extends Weapon {
    constructor(name: string, quantity: number, cost: number, power: number) {
        super(name, quantity, cost, power);
        this.description = `${this.name}: ${this.power} DMG.`;
    }
}

export class Club extends BluntWeapon {
    constructor() {
        super("Club", 1, 2, 2);
        this.description = `A crude wooden club that deals ${this.power} DMG.`;
    }
}

export class Stick extends BluntWeapon {
    constructor() {
        super("Stick", 1, 1, 1);
        this.description = `A ${this.name} picked up off the ground. Deals ${this.power} DMG.`;
    }
}

export class NaturalWeapon extends Weapon {
    constructor(name: string, quantity: number, cost: number, power: number) {
        super(name, quantity, cost, power);
        this.description = `${this.name}: ${this.power} DMG.`;
    }
}

export class BareFist extends NaturalWeapon {
    constructor() {
        super("Bare Fist", 1, 0, 1); // Bare fists typically deal 1 damage
        this.description = `Your own two fists. Deals ${this.power} DMG.`;
    }
}

export class RatBite extends NaturalWeapon {
    constructor() {
        super("Rat Bite", 1, 0, 1);
        this.description = `${this.name}: Deals ${this.power} DMG.`;
    }
}