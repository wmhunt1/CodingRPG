import {beer,bread, club,Item, woodenShield } from "./ItemModel"
export class ShopModel {
    name: string;
    inventory: Item[];
    constructor(name: string, inventory: Item[]) {
        this.name = name
        this.inventory = inventory;
    }
}
export class GeneralShop extends ShopModel {
    constructor() {
        const name = "General Shop";
        const inventory = [club,woodenShield]
        super(name, inventory)
    }
}
export class InnShop extends ShopModel {
    innStay:number
    constructor(innStay:number) {
        const name = "Inn";
        const inventory = [beer, bread]
        super(name, inventory)
        this.innStay = innStay;
    }
}
