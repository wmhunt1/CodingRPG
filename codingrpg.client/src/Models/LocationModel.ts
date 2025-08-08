import { CombatEncounter, RatCellarCombatEncounter } from "./EncounterModel.ts"
import {FarmShop, GeneralShop, InnShop, ShopModel, SmithShop } from "./ShopModel.ts"
import { ButterChurn, CookingRange, DairyCow,Mill, MinnowFishingSpot,RiverWater, SalmonFishingSpot, SkillNodeModel,TroutFishingSpot,Well,WheatField } from "./SkillNodeModel.ts"
export class Location {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
export class CombatLocation extends Location {
    combatEncounter: CombatEncounter;
    constructor(name: string, combatEncounter: CombatEncounter) {
        super(name)
        this.combatEncounter = combatEncounter;
    }
}
export class RatCellar extends CombatLocation {
    constructor() {
        const name = "Cellar full of rats"
        const combatEncounter: CombatEncounter = new RatCellarCombatEncounter();
        super(name, combatEncounter)
    }
}
export class ShopLocation extends Location {
    shop: ShopModel;
    constructor(name: string, shop: ShopModel) {
        super(name)
        this.shop = shop;
    }
}
export class FarmShopLocation extends ShopLocation {
    constructor(name: string) {
        const shop = new FarmShop()
        super(name, shop)
    }
}
export class GeneralStoreLocation extends ShopLocation {
    constructor(name: string) {
        const shop = new GeneralShop()
        super(name, shop)
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
export class SmithShopLocation extends ShopLocation {
    constructor(name: string) {
        const shop = new SmithShop()
        super(name, shop)
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
export class ButterChurnLocation extends CookingSKillLocation {
    constructor() {
        const name = "Butter Churn";
        const skillNode = new ButterChurn()
        super(name, skillNode)
    }
}
export class CookingRangeLocation extends CookingSKillLocation {
    constructor() {
        const name = "Range";
        const skillNode = new CookingRange()
        super(name, skillNode)
    }
}
export class MillLocation extends CookingSKillLocation {
    constructor() {
        const name = "Mill"
        const skillNode = new Mill()
        super(name, skillNode)
    }
}
export class RiverWaterLocation extends CookingSKillLocation {
    constructor() {
        const name = "River Water";
        const skillNode = new RiverWater()
        super(name, skillNode)
    }
}
export class WellLocation extends CookingSKillLocation {
    constructor() {
        const name = "Well";
        const skillNode = new Well()
        super(name, skillNode)
    }
}
export class GatheringSKillLocation extends SkillLocation {
    constructor(name: string, skilLNode: SkillNodeModel) {
        super(name, skilLNode)
    }
}
export class FarmingSkillLocation extends GatheringSKillLocation {
    constructor(name: string, skilLNode: SkillNodeModel) {
        super(name, skilLNode)
    }
}
export class DairyCowLocation extends FarmingSkillLocation {
    constructor() {
        const name = "Dairy Cow";
        const skillNode = new DairyCow()
        super(name, skillNode)
    }
}
export class WheatFieldLocation extends FarmingSkillLocation {
    constructor() {
        const name = "Wheat Field";
        const skillNode = new WheatField()
        super(name, skillNode)
    }
}
export class FishingSpotLocation extends GatheringSKillLocation {
    constructor(name: string, skilLNode: SkillNodeModel) {
        super(name, skilLNode)
    }
}
export class MinnowFishingSpotLocation extends FishingSpotLocation {
    constructor() {
        const name = "Minnow Fishing Spot";
        const skillNode = new MinnowFishingSpot()
        super(name, skillNode)
    }
}
export class SalmonFishingSpotLocation extends FishingSpotLocation {
    constructor() {
        const name = "Salmon Fishing Spot";
        const skillNode = new SalmonFishingSpot()
        super(name, skillNode)
    }
}
export class TroutFishingSpotLocation extends FishingSpotLocation {
    constructor() {
        const name = "Trout Fishing Spot";
        const skillNode = new TroutFishingSpot()
        super(name, skillNode)
    }
}
export class MiningSkillLocation extends GatheringSKillLocation {
    constructor(name: string, skilLNode: SkillNodeModel) {
        super(name, skilLNode)
    }
}
export class MineLocation extends MiningSkillLocation {
    constructor(name: string, skilLNode: SkillNodeModel) {
        super(name, skilLNode)
    }
}