import { Item} from './ItemModel.ts';

export class Shop {
    name: string;
    shopInventory: Item[];
    constructor(name: string, shopInventory: Item[]) {
        this.name = name;
        this.shopInventory = shopInventory;
    }
}