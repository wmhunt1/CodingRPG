import { ChestArmor,Consumable,Equipable,Item,Potion,Weapon } from "../Models/ItemModel";
export function addItemToInventory(inventory: Item[], itemToAdd: Item): void {
    const existingItem = inventory.find(item => item.name === itemToAdd.name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        let newItemInstance: Item;

        if (itemToAdd instanceof Weapon) {
            newItemInstance = new Weapon(itemToAdd.name, 1, itemToAdd.cost, itemToAdd.power);
        } else if (itemToAdd instanceof ChestArmor) {
            newItemInstance = new ChestArmor(itemToAdd.name, 1, itemToAdd.cost, itemToAdd.protection);
        } else if (itemToAdd instanceof Equipable) {
            newItemInstance = new Equipable(itemToAdd.name, 1, itemToAdd.cost, itemToAdd.slot);
        } else if (itemToAdd instanceof Potion) {
            newItemInstance = new Potion(itemToAdd.name, 1, itemToAdd.consumedValue, itemToAdd.cost);
        } else if (itemToAdd instanceof Consumable) { // General consumable
            newItemInstance = new Consumable(itemToAdd.name, 1, itemToAdd.consumedValue, itemToAdd.cost);
        }
        else {
            newItemInstance = new Item(itemToAdd.name, 1, itemToAdd.cost);
        }

        newItemInstance.description = itemToAdd.description;

        inventory.push(newItemInstance);
    }
}

export function removeItemFromInventory(inventory: Item[], itemToRemove: Item): void {
    const itemIndex = inventory.findIndex(item => item.name === itemToRemove.name);

    if (itemIndex > -1) {
        inventory[itemIndex].quantity--;
        if (inventory[itemIndex].quantity <= 0) {
            inventory.splice(itemIndex, 1);
        }
    }
}