import {Beer,Bread, Club,Item,Tunic, WoodenShield } from "./ItemModel"
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
        const inventory = [new Club(),new Tunic(),new WoodenShield()]
        super(name, inventory)
    }
}
export class InnShop extends ShopModel {
    innStay:number
    constructor(innStay:number) {
        const name = "Inn";
        const inventory = [new Beer(), new Bread()]
        super(name, inventory)
        this.innStay = innStay;
    }
}
