import {BareChest,BareFist, ChestArmor,Item,RatBite,Stick,Tunic,Weapon } from './ItemModel.ts';

export class Character {
    name: string = "";
    level: number = 1;
    currentXP: number = 0;
    maxXP: number = 50;
    //basestats
    currentHP: number = 10;
    maxHP: number = 10;
    currentMP: number = 10;
    maxMP: number = 10;
    currentSP: number = 10;
    maxSP: number = 10;
    gold: number = 0;
    attractiveness: number = 10;
    charisma: number = 10;
    constitution: number = 10;
    dexterity: number = 10;
    intelligence: number = 10;
    luck: number = 10;
    perception: number = 10;
    speed: number = 10;
    strength: number = 10;
    willPower: number = 10;
    wisdom: number = 10;
    inventory: Item[] = []
    weapon: Weapon = new BareFist();
    chest: ChestArmor = new BareChest();
    party: Character[] = []
    constructor(
        name: string,
        maxHP: number,
        currentHP: number,
        maxMP: number,
        currentMP: number,
        maxSP: number ,
        currentSP: number,
        level: number,
        currentXP: number, // Using 'experience' to map to plainCharacter.currentXP
        maxXP: number,
        gold: number
        // No need to pass weapon, chest, inventory to constructor if they are initialized after
    ) {
        this.name = name;
        this.maxHP = maxHP;
        this.currentHP = currentHP;
        this.maxMP = maxMP;
        this.currentMP = currentMP;
        this.maxSP = maxSP;
        this.currentSP = currentSP;
        this.level = level;
        this.currentXP = currentXP;
        this.maxXP = maxXP;
        this.gold = gold;
        // Do NOT initialize weapon, chest, inventory here if they're coming from plainCharacter,
        // as they will be overwritten anyway. Or initialize with minimal defaults.
    }
}

export class Humanoid extends Character {
    constructor(name: string, maxHP: number,
        currentHP: number,
        maxMP: number,
        currentMP: number,
        maxSP: number,
        currentSP: number,
        level: number,
        currentXP: number, // Using 'experience' to map to plainCharacter.currentXP
        maxXP: number,
        gold: number) {
        super(name, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP, gold)
    }
}
export class Hero extends Humanoid {
    constructor(name: string) {
        const maxHP = 10;
        const currentHP = 10;
        const maxMP = 10;
        const currentMP = 10;
        const maxSP = 10;
        const currentSP = 10;
        const level = 1;
        const currentXP = 0;
        const maxXP = 50;
        const gold = 10;
        super(name, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP, gold)
        this.weapon = new Stick();
        this.chest = new Tunic();
        this.inventory = []
        }
}
export class Beast extends Character {
    constructor(name: string,
        maxHP: number, currentHP: number, maxMP: number, currentMP: number,
        maxSP: number,
        currentSP: number,
        level: number,
        currentXP: number, // Using 'experience' to map to plainCharacter.currentXP
        maxXP: number,
        gold: number) {
        super(name, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP, gold)
        this.name = name;
        this.currentMP = 0;
        this.maxMP = 0;
    }
}
export class Rat extends Beast {
    constructor() {
        const name = "Rat";
        const maxHP = 5;
        const currentHP = 5;
        const maxMP = 0;
        const currentMP = 0;
        const maxSP = 5;
        const currentSP = 5;
        const level = 1;
        const currentXP = 5;
        const maxXP = 50;
        const gold = 5;
        super(name, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP, gold)
        this.weapon = new RatBite();
    }
}



