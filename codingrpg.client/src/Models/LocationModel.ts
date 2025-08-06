import { Character, Rat } from './CharacterModel.ts';
import {GeneralShop, InnShop,ShopModel } from "./ShopModel.ts"
import { CookingRange, MinnowFishingSpot, SkillNodeModel } from "./SkillNodeModel.ts"
export class Location {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
export class CombatLocation extends Location {
    combatants: Character[];
    constructor(name: string, combatants: Character[]) {
        super(name)
        this.combatants = combatants;
    }
}
export class RatCellar extends CombatLocation {
    constructor() {
        const name = "Rat Cellar"
        const combatants: Character[] = [new Rat()]
        super(name, combatants)
    }
}
export class ShopLocation extends Location {
    shop: ShopModel;
    constructor(name: string, shop: ShopModel) {
        super(name)
        this.shop = shop;
    }
}
export class GeneralStoreLocation extends ShopLocation {
    constructor(name: string) {
        const shop = new GeneralShop()
        super(name,shop)
    }
}
export class InnLocation extends ShopLocation {
    innStay: number;
    constructor(name: string, innStay: number) {
        const shop = new InnShop(innStay);
        super(name, shop)
        this.shop = shop;
        this.innStay = innStay;
    }
}
export class SkillLocation extends Location {
    skillNode: SkillNodeModel;
    constructor(name: string, skilLNode: SkillNodeModel) {
        super(name)
        this.skillNode = skilLNode;
    }
}
export class CraftingSkillLocation extends SkillLocation {
    constructor(name: string, skilLNode: SkillNodeModel) {
        super(name, skilLNode)
    }
}
export class CookingSKillLocation extends CraftingSkillLocation {
    constructor(name: string, skilLNode: SkillNodeModel) {
        super(name, skilLNode)
    }
}
export class CookingRangeLocation extends CookingSKillLocation {
    constructor() {
        const name = "Range";
        const skillNode = new CookingRange()
        super(name, skillNode)
    }
}
export class GatheringSKillLocation extends SkillLocation {
    constructor(name: string, skilLNode: SkillNodeModel) {
        super(name, skilLNode)
    }
}
export class FishingSpotLocation extends GatheringSKillLocation {
    constructor(name: string, skilLNode: SkillNodeModel) {
        super(name, skilLNode)
    }
}
export class MinnowFishingSpotLocation extends FishingSpotLocation {
    constructor() {
        const name = "Fishing Spot";
        const skillNode = new MinnowFishingSpot()
        super(name, skillNode)
    }
}