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
}

export class Beast extends Character {
    constructor(name: string) {
        super()
        this.name = name;
        this.currentMP = 0;
        this.maxMP = 0;
    }
}
export class Humanoid extends Character {
    constructor(name: string) {
        super()
        this.name = name;
    }
}
export class Hero extends Humanoid {
    constructor(name: string) {
        super(name)
        this.name = name;
        this.gold = 50;
        this.weapon = new Stick();
        this.chest = new Tunic();
        this.inventory = []
    }
} export class Rat extends Beast {
    constructor() {
        const name = "Rat";
        super(name)
        this.currentXP = 5;
        this.currentHP = 5;
        this.maxHP = 5;
        this.weapon = new RatBite();

    }
}



