import {BareFist, Item,RatBite,Stick,Weapon } from './ItemModel.ts';

export class Character {
    name: string = "";
    level: number = 1;
    currentXP: number = 0;
    maxXP: number = 50;
    currentHP: number = 10;
    maxHP: number = 10;
    currentMP: number = 10;
    maxMP: number = 10;
    currentSP: number = 10;
    maxSP: number = 10;
    gold: number = 0;
    inventory: Item[] = []
    weapon: Weapon = new BareFist();
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



