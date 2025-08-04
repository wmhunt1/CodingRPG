// Models/ItemModel.ts

import { Character } from "./CharacterModel";

// Helper function to add/increment an item in an inventory
// This can be a standalone function or a static method on Character/Item
export function addItemToInventory(inventory: Item[], itemToAdd: Item): void {
    const existingItem = inventory.find(item => item.name === itemToAdd.name);

    if (existingItem) {
        existingItem.quantity++;
        // If an item already exists, and we're just incrementing quantity,
        // its description should already be correct.
    } else {
        // Re-instantiate the item to ensure proper class methods are maintained
        let newItemInstance: Item;

        if (itemToAdd instanceof Weapon) {
            newItemInstance = new Weapon(itemToAdd.name, 1, itemToAdd.cost, itemToAdd.power);
        } else if (itemToAdd instanceof ChestArmor) {
            newItemInstance = new ChestArmor(itemToAdd.name, 1, itemToAdd.cost, itemToAdd.protection);
        } else if (itemToAdd instanceof Equipable) {
            newItemInstance = new Equipable(itemToAdd.name, 1, itemToAdd.cost, itemToAdd.slot);
        } else if (itemToAdd instanceof Potion) {
            newItemInstance = new Potion(itemToAdd.name, 1, itemToAdd.consumedValue, itemToAdd.cost);
        } else if (itemToAdd instanceof Consumable) { // General consumable
            newItemInstance = new Consumable(itemToAdd.name, 1, itemToAdd.consumedValue, itemToAdd.cost);
        }
        // Add more specific types here as needed.
        // Make sure to order them from most specific to least specific.
        else {
            newItemInstance = new Item(itemToAdd.name, 1, itemToAdd.cost);
        }

        // CRITICAL FIX: Copy the description *after* the instance is created
        // This ensures the original description from 'itemToAdd' is preserved,
        // overriding any default set by the constructor.
        console.log(itemToAdd.description)
        newItemInstance.description = itemToAdd.description;
        console.log(newItemInstance.description)

        inventory.push(newItemInstance);
    }
}

// Helper function to remove/decrement an item from an inventory
// This can also be a standalone function or a static method
function removeItemFromInventory(inventory: Item[], itemToRemove: Item): void {
    const itemIndex = inventory.findIndex(item => item.name === itemToRemove.name);

    if (itemIndex > -1) {
        inventory[itemIndex].quantity--;
        if (inventory[itemIndex].quantity <= 0) {
            inventory.splice(itemIndex, 1);
        }
    }
}

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
        console.log(`${user.name} uses ${this.name}.`);
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
        console.log(`${user.name} consumes ${this.name}`);
        // Consumables typically just remove themselves from inventory
        return super.use(user); // Call parent to handle quantity decrement/removal
    }
}

export class Potion extends Consumable {
    constructor(name: string, quantity: number, consumedValue: number, cost: number) {
        super(name, quantity, consumedValue, cost);
    }
    override use(user: Character): Character {
        console.log(`${user.name} drinks ${this.name}`);
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

export class Equipable extends Item {
    slot: string;
    constructor(name: string, quantity: number, cost: number, slot: string) { // Changed constructor order for consistency
        super(name, quantity, cost);
        this.slot = slot;
    }

    // The use method now handles equipping and returning the old item
    override use(user: Character): Character {
        console.log(`${user.name} attempts to equip ${this.name}.`);

        let oldEquippedItem: Equipable | Item | null = null;
        let bareItem: Item; // The default "bare" item for the slot

        // Equip the new item and store the old one
        if (this.slot === "Weapon" && user.weapon) {
            oldEquippedItem = user.weapon;
            user.weapon = this as unknown as Weapon;
            bareItem = new BareFist();
        } else if (this.slot === "Chest" && user.chest) {
            oldEquippedItem = user.chest;
            user.chest = this as unknown as ChestArmor;
            bareItem = new BareChest();
        }
        // Add more 'else if' blocks for other equipable slots (Head, Legs, etc.)
        else {
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

export class Weapon extends Equipable {
    power: number;
    constructor(name: string, quantity: number, cost: number, power: number) {
        super(name, quantity, cost, "Weapon"); // Weapons always go into the "Weapon" slot
        this.power = power;
        this.description = `A ${this.name} that deals ${this.power} DMG.`;
    }
    // No need to override 'use' unless there's *unique* weapon-specific use logic beyond equipping
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