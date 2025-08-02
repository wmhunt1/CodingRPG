import { Item,Stick } from "./ItemModel"
export class ShopModel {
    name: string;
    inventory: Item[];
    constructor(name: string, inventory: Item[]) {
        this.name = name
        this.inventory = inventory;
    }
}
export class TestShop extends ShopModel {
    constructor() {
        const name = "Test Shop";
        const inventory = [new Stick()]
        super(name,inventory)
    }
}