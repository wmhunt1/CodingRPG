import {Character  } from "./CharacterModel"
export class Item {
    name: string;
    quantity: number;
    constructor(name: string, quantity: number) {
        this.name = name
        this.quantity = quantity;
    }
    use(user:Character): void {console.log(user.name) };
}
export class Consumable extends Item {
    consumedValue: number;
    constructor(name: string, quantity: number,consumedValue: number) {
        super(name,quantity)
        this.consumedValue = consumedValue
    }
    override use(user: Character): void {
        console.log(`${user.name} consumes ${this.name}`)
    }
}
export class Potion extends Consumable {
    constructor(name: string, quantity: number, consumedValue: number) {
        super(name,quantity,consumedValue)

    }
    override use(user: Character): void { // Method returns void (nothing)
        console.log(`${user.name} drinks ${this.name}`)
    }
}
export class HealthPotion extends Potion {
    constructor(name: string, quantity: number, consumedValue: number) {
        super(name, quantity, consumedValue)
    }
    override use(user: Character): void { // Method returns void (nothing)
        console.log(`${user.name} drinks ${this.name}`)
        user.currentHP += this.consumedValue;
        if (user.currentHP > user.maxHP) {
            user.currentHP = user.maxHP
        }
    }
}
export class Equipable extends Item {
    slot:string
    constructor(name: string, quantity: number,slot:string) {
        super(name,quantity)
        this.name = name;
        this.quantity = quantity;
        this.slot = slot;
    }
    override use(user: Character): void {
        console.log(`${user.name} equips ${this.name}`)
    }
}
export class Weapon extends Equipable {
    power: number;
    constructor(name: string, quantity: number, power: number, slot: string) {
        super(name,quantity,slot)
        this.power = power;
    }
    override use(user: Character): void {
        // Store a reference to the old weapon
        const oldWeapon = user.weapon;

        // Equip the new weapon by setting it to 'this'
        user.weapon = this;

        // If there was an old weapon and its name is not "Bare Fist", add it back to the user's inventory.
        if (oldWeapon && oldWeapon.name !== "Bare Fist") {
            // Check if a weapon with the same name already exists in the inventory
            const existingItem = user.inventory.find(item => item.name === oldWeapon.name);

            if (existingItem) {
                // If it exists, just increase the quantity
                existingItem.quantity++;
            } else {
                // If not, add the old weapon to the inventory as a new item
                // We create a new instance with quantity 1 for the inventory.
                const oldWeaponForInventory = new Weapon(oldWeapon.name, 1, oldWeapon.power, oldWeapon.slot);
                user.inventory.push(oldWeaponForInventory);
            }
        }
    }
}
export class BluntWeapon extends Weapon {
    constructor(name: string, quantity: number, power: number, slot: string) {
        super(name, quantity, power, slot)
    }
}
export class Club extends BluntWeapon {
    constructor() {
        const name = "Club";
        const quantity = 1;
        const power = 2;
        const slot = "Weapon"
        super(name, quantity, power, slot)

    }
}
export class Stick extends BluntWeapon {
    constructor() {
        const name = "Stick";
        const quantity = 1;
        const power = 1;
        const slot = "Weapon"
        super(name, quantity, power, slot)

    }
}
export class NaturalWeapon extends Weapon {
    constructor(name: string, quantity: number, power: number, slot: string) {
        super(name, quantity, power,slot)
    }
}
export class BareFist extends NaturalWeapon {
    constructor() {
        const name = "Bare Fist";
        const quantity = 1;
        const power = 1;
        const slot = "Weapon"
        super(name, quantity, power,slot)

    }
}
export class RatBite extends NaturalWeapon {
    constructor() {
        const name = "Rat Bite";
        const quantity = 1;
        const power = 1;
        const slot = "Weapon"
        super(name, quantity, power,slot)
    }
}
