import { Back, ChestArmor, Consumable, Drink, Equipable, Food, FootArmor, HandArmor, HeadArmor, Item, LegArmor, Neck, OffHandWeapon, Potion, Ring, Shield, ShoulderArmor, WaistArmor, Weapon, WristArmor } from "../Models/ItemModel";

export function addItemToInventory(inventory: Item[], itemToAdd: Item,quantity:number): void {
    const existingItem = inventory.find(item => item.name === itemToAdd.name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        // Since we are creating a new item, we should use the full constructor
        // from the class that itemToAdd is an instance of.
        let newItemInstance: Item;

        if (itemToAdd instanceof Weapon) {
            newItemInstance = new Weapon(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, itemToAdd.slot, (itemToAdd as Weapon).power);
        }
        else if (itemToAdd instanceof OffHandWeapon) {
            newItemInstance = new OffHandWeapon(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description,itemToAdd.slot, (itemToAdd as OffHandWeapon).power);
        } else if (itemToAdd instanceof Shield) {
            newItemInstance = new Shield(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, itemToAdd.slot, (itemToAdd as Shield).protection);
        } else if (itemToAdd instanceof HeadArmor) {
            newItemInstance = new HeadArmor(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, itemToAdd.slot, (itemToAdd as HeadArmor).protection);
        } else if (itemToAdd instanceof ShoulderArmor) {
            newItemInstance = new ShoulderArmor(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, itemToAdd.slot, (itemToAdd as ShoulderArmor).protection);
        } else if (itemToAdd instanceof ChestArmor) {
            newItemInstance = new ChestArmor(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, itemToAdd.slot, (itemToAdd as ChestArmor).protection);
        } else if (itemToAdd instanceof HandArmor) {
            newItemInstance = new HandArmor(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, itemToAdd.slot, (itemToAdd as HandArmor).protection);
        } else if (itemToAdd instanceof WristArmor) {
            newItemInstance = new WristArmor(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, itemToAdd.slot, (itemToAdd as WristArmor).protection);
        } else if (itemToAdd instanceof WaistArmor) {
            newItemInstance = new WaistArmor(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, itemToAdd.slot, (itemToAdd as WaistArmor).protection);
        } else if (itemToAdd instanceof LegArmor) {
            newItemInstance = new LegArmor(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, itemToAdd.slot, (itemToAdd as LegArmor).protection);
        } else if (itemToAdd instanceof FootArmor) {
            newItemInstance = new FootArmor(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, itemToAdd.slot, (itemToAdd as FootArmor).protection);
        } else if (itemToAdd instanceof Neck) {
            newItemInstance = new Neck(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, itemToAdd.slot);
        } else if (itemToAdd instanceof Back) {
            newItemInstance = new Back(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, itemToAdd.slot);
        } else if (itemToAdd instanceof Ring) {
            newItemInstance = new Ring(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, itemToAdd.slot);
        } else if (itemToAdd instanceof Equipable) {
            newItemInstance = new Equipable(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, itemToAdd.slot);
        } else if (itemToAdd instanceof Food) {
            newItemInstance = new Food(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, (itemToAdd as Food).consumedValue);
        } else if (itemToAdd instanceof Drink) {
            newItemInstance = new Drink(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, (itemToAdd as Drink).consumedValue);
        } else if (itemToAdd instanceof Potion) {
            newItemInstance = new Potion(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, (itemToAdd as Potion).consumedValue);
        } else if (itemToAdd instanceof Consumable) { // General consumable
            newItemInstance = new Consumable(itemToAdd.name, itemToAdd.type, itemToAdd.subType, 1, itemToAdd.cost, itemToAdd.description, (itemToAdd as Consumable).consumedValue);
        }
        else {
            newItemInstance = new Item(itemToAdd.name, itemToAdd.type, itemToAdd.subType, quantity, itemToAdd.cost, itemToAdd.description);
        }

        inventory.push(newItemInstance);
    }
}

export function removeItemFromInventory(inventory: Item[], itemToRemove: Item,quantity:number): void {
    const itemIndex = inventory.findIndex(item => item.name === itemToRemove.name);

    if (itemIndex > -1) {
        inventory[itemIndex].quantity -= quantity;
        if (inventory[itemIndex].quantity <= 0) {
            inventory.splice(itemIndex, 1);
        }
    }
}