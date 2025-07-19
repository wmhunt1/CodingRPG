class character {
    name: string = "";
    level: number = 1;
    currentXP: number = 0;
    maxXP: number = 50;
    currentHP: number = 10;
    maxHP: number = 10;
    gold: number = 0;
}
export class hero extends character {
    constructor(name: string) {
        super()
        this.name = name;
        this.gold = 50
    }
}
export class monster extends character {
    constructor(name: string) {
        super()
        this.name = name;
    }
}


