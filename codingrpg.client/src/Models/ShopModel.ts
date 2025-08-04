import { BasicHealthPotion, Club,Item,Tunic } from "./ItemModel"
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
        const inventory = [new Club(),new Tunic(),new BasicHealthPotion()]
        super(name, inventory)
    }
}