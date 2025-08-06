import { beer, bread, club, Item, woodenShield } from "./ItemModel"
import { CookingRange, SkillNodeModel } from "./SkillNodeModel.ts"
export class ShopModel {
    name: string;
    inventory: Item[];
    skillNodes: SkillNodeModel[];
    //add encounter/dungeon to
    constructor(name: string, inventory: Item[], skillNodes: SkillNodeModel[]) {
        this.name = name
        this.inventory = inventory;
        this.skillNodes = skillNodes;
    }
}
export class GeneralShop extends ShopModel {
    constructor() {
        const name = "General Shop";
        const inventory = [club, woodenShield]
        const skillNodes: SkillNodeModel[] = []
        super(name, inventory,skillNodes)
    }
}
export class InnShop extends ShopModel {
    innStay:number
    constructor(innStay:number) {
        const name = "Inn";
        const inventory = [beer, bread]
        const skillNodes: SkillNodeModel[] = [new CookingRange()];
        super(name, inventory,skillNodes)
        this.innStay = innStay;
    }
}
