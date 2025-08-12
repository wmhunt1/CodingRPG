import { CombatEncounter, NoCombatEncounter, RatCellarCombatEncounter } from "./EncounterModel.ts";
import {
    basicFishingRod, basicHatchet, basicHealSpellTome, basicHealthPotion, basicManaPotion, basicNeedleAndThread, basicSickle, basicStaminaPotion,
    beer, bread, bucket, butter, club, Item,
    leatherBelt, leatherBoots, leatherBracers, leatherChest, leatherCowl, leatherGauntlets, leatherLegs, leatherPauldrons,
    magicBoltSpellTome, milk, woodenShield
} from "./ItemModel"
import { CookingRange, SkillNodeModel } from "./SkillNodeModel.ts"
export class ShopModel {
    name: string;
    inventory: Item[];
    skillNodes: SkillNodeModel[];
    combatEncounter: CombatEncounter;
    constructor(name: string, inventory: Item[], skillNodes: SkillNodeModel[], combatEncounter: CombatEncounter) {
        this.name = name
        this.inventory = inventory;
        this.skillNodes = skillNodes;
        this.combatEncounter = combatEncounter;
    }
}
export class FarmShop extends ShopModel {
    constructor() {
        const name = "Farm Shop";
        const inventory: Item[] = [butter, milk]
        const skillNodes: SkillNodeModel[] = []
        const combatEncounter = new NoCombatEncounter()
        super(name, inventory, skillNodes, combatEncounter)
    }
}
export class GeneralShop extends ShopModel {
    constructor() {
        const name = "General Shop";
        const inventory: Item[] = [basicFishingRod, basicHatchet, basicNeedleAndThread, basicSickle, bucket]
        const skillNodes: SkillNodeModel[] = []
        const combatEncounter = new NoCombatEncounter()
        super(name, inventory, skillNodes, combatEncounter)
    }
}
export class InnShop extends ShopModel {
    innStay: number
    constructor(innStay: number) {
        const name = "Inn";
        const inventory = [beer, bread]
        const skillNodes: SkillNodeModel[] = [new CookingRange()];
        const combatEncounter = new RatCellarCombatEncounter();
        super(name, inventory, skillNodes, combatEncounter)
        this.innStay = innStay;
    }
}
export class MagicShop extends ShopModel {
    constructor() {
        const name = "Magic Shop";
        const inventory: Item[] = [magicBoltSpellTome]
        const skillNodes: SkillNodeModel[] = [];
        const combatEncounter = new NoCombatEncounter();
        super(name, inventory, skillNodes, combatEncounter)
    }
}
export class PotionShop extends ShopModel {
    constructor() {
        const name = "Potion Shop";
        const inventory: Item[] = [basicHealthPotion, basicManaPotion, basicStaminaPotion]
        const skillNodes: SkillNodeModel[] = [];
        const combatEncounter = new NoCombatEncounter();
        super(name, inventory, skillNodes, combatEncounter)
    }
}
export class TempleShop extends ShopModel {
    constructor() {
        const name = "Temple Shop";
        const inventory: Item[] = [basicHealSpellTome]
        const skillNodes: SkillNodeModel[] = [];
        const combatEncounter = new NoCombatEncounter();
        super(name, inventory, skillNodes, combatEncounter)
    }
}
export class SmithShop extends ShopModel {
    constructor() {
        const name = "Smithy";
        const inventory: Item[] = [club, leatherBelt, leatherBoots, leatherBracers, leatherChest, leatherCowl, leatherGauntlets, leatherLegs, leatherPauldrons, woodenShield]
        const skillNodes: SkillNodeModel[] = [];
        const combatEncounter = new NoCombatEncounter();
        super(name, inventory, skillNodes, combatEncounter)
    }
}

