import {item,weapon } from './ItemModel.ts';

export class Character {
    name: string = "";
    level: number = 1;
    currentXP: number = 0;
    maxXP: number = 50;
    currentHP: number = 10;
    maxHP: number = 10;
    gold: number = 0;
    inventory: item[] = []
    weapon: weapon = new weapon("Bare Hand", 1);
}
export class Hero extends Character {
    constructor(name: string) {
        super()
        this.name = name;
        this.gold = 50
    }
}
export class Monster extends Character {
    constructor(name: string) {
        super()
        this.name = name;
    }
}


