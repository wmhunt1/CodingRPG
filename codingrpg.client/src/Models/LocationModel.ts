
import { Character } from "./CharacterModel.ts"
import { type DialogueNode } from "./DialogueNodeModel.ts"
import { BasicSkeletonCombatEncounter, BasicZombieCombatEncounter, CombatEncounter, CowCombatEncounter, RatCellarCombatEncounter } from "./EncounterModel.ts"
import { FarmShop, GeneralShop, InnShop, MagicShop, PotionShop, ShopModel, SmithShop, TempleShop } from "./ShopModel.ts"
import { ButterChurn, CookingRange, DairyCow, FlaxField, Loom, Mill, MinnowFishingSpot, RiverWater, SalmonFishingSpot, SkillNodeModel, SpinningWheel, TroutFishingSpot, Well, WheatField, WoodTree } from "./SkillNodeModel.ts"
export class Location {
    name: string;
    //add conversations
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
export class BasicSkeletonCombatEncounterLocation extends CombatLocation {
    constructor() {
        const name = "A Clatter of Basic Skeletons (Crypt)"
        const combatEncounter: CombatEncounter = new BasicSkeletonCombatEncounter()
        super(name, combatEncounter)
    }
}
export class BasicZombieCombatEncounterLocation extends CombatLocation {
    constructor() {
        const name = "A Horde of Basic Zombies (Graveyard)"
        const combatEncounter: CombatEncounter = new BasicZombieCombatEncounter()
        super(name, combatEncounter)
    }
}
export class CowCombatLocation extends CombatLocation {
    constructor() {
        const name = "Kill Cows"
        const combatEncounter: CombatEncounter = new CowCombatEncounter()
        super(name, combatEncounter)
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
    conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]
    constructor(name: string, shop: ShopModel, conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        super(name)
        this.shop = shop;
        this.conversations = conversations;
    }
}
export class FarmShopLocation extends ShopLocation {
    constructor(name: string, conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        const shop = new FarmShop(conversations)
        super(name, shop, conversations)
    }
}
export class GeneralStoreLocation extends ShopLocation {
    constructor(name: string, conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        const shop = new GeneralShop(conversations)
        super(name, shop, conversations)
    }
}
export class InnLocation extends ShopLocation {
    innStay: number;
    constructor(name: string, innStay: number, conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        const shop = new InnShop(innStay, conversations);
        super(name, shop, conversations)
        this.shop = shop;
        this.innStay = innStay;
    }
}
export class MagicShopLocation extends ShopLocation {
    constructor(name: string, conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        const shop = new MagicShop(conversations)
        super(name, shop, conversations)
    }
}
export class PotionShopLocation extends ShopLocation {
    constructor(name: string, conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        const shop = new PotionShop(conversations)
        super(name, shop, conversations)
    }
}
export class SmithShopLocation extends ShopLocation {
    constructor(name: string, conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        const shop = new SmithShop(conversations)
        super(name, shop, conversations)
    }
}
export class TempleShopLocation extends ShopLocation {
    constructor(name: string, conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        const shop = new TempleShop(conversations)
        super(name, shop, conversations)
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
        const name = "Cooking Range";
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
    constructor(name: string) {
        const skillNode = new Well()
        super(name, skillNode)
    }
}
export class TailoringSKillLocation extends CraftingSkillLocation {
    constructor(name: string, skilLNode: SkillNodeModel) {
        super(name, skilLNode)
    }
}
export class LoomLocation extends TailoringSKillLocation {
    constructor() {
        const name = "Loom";
        const skillNode = new Loom()
        super(name, skillNode)
    }
}
export class SpinningWheelLocation extends TailoringSKillLocation {
    constructor() {
        const name = "Spinning Wheel"
        const skillNode = new SpinningWheel()
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
export class FlaxFieldLocation extends FarmingSkillLocation {
    constructor() {
        const name = "Flax Field";
        const skillNode = new FlaxField()
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
export class WoodcuttingSkillLocation extends GatheringSKillLocation {
    constructor(name: string, skilLNode: SkillNodeModel) {
        super(name, skilLNode)
    }
}
export class TreeLocation extends WoodcuttingSkillLocation {
    constructor(name: string, skilLNode: SkillNodeModel) {
        super(name, skilLNode)
    }
}
export class WoodTreeLocation extends TreeLocation {
    constructor() {
        const name = "Tree";
        const skillNode = new WoodTree()
        super(name, skillNode)
    }
}