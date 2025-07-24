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

export class Beast extends Character {
    constructor(name: string) {
        super()
        this.name = name;
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
        this.gold = 50
    }
} export class Rat extends Beast {
    constructor(name: string = "Rat") {
        super(name)
        this.name = name;
        this.currentHP = 5;
        this.maxHP = 5;
        this.weapon = new weapon("Bite", 1);

    }
}



