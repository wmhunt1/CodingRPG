import { Character } from "./CharacterModel.ts"
import {type DialogueNode } from  "./DialogueNodeModel.ts"
import { CombatEncounter, NoCombatEncounter, RatCellarCombatEncounter } from "./EncounterModel.ts";
import {
    basicFishingRod, basicHatchet, basicHealSpellTome, basicHealthPotion, basicManaPotion, basicNeedleAndThread, basicSickle, basicStaminaPotion,
    beer, bread, bronzeArmor, bronzeWeapons, bucket, butter, club, ironArmor, ironWeapons, Item,
    leatherArmor,
    magicBoltSpellTome, milk, woodenShield
} from "./ItemModel"
import { CookingRange, SkillNodeModel } from "./SkillNodeModel.ts"
export class ShopModel {
    name: string;
    inventory: Item[];
    skillNodes: SkillNodeModel[];
    combatEncounter: CombatEncounter;
    conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]
    constructor(name: string, inventory: Item[], skillNodes: SkillNodeModel[], combatEncounter: CombatEncounter, conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        this.name = name
        this.inventory = inventory;
        this.skillNodes = skillNodes;
        this.combatEncounter = combatEncounter;
        this.conversations = conversations
    }
}
export class FarmShop extends ShopModel {
    constructor(conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        const name = "Farm Shop";
        const inventory: Item[] = [butter, milk]
        const skillNodes: SkillNodeModel[] = []
        const combatEncounter = new NoCombatEncounter()
        super(name, inventory, skillNodes, combatEncounter,conversations)
    }
}
export class GeneralShop extends ShopModel {
    constructor(conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        const name = "General Shop";
        const inventory: Item[] = [basicFishingRod, basicHatchet, basicNeedleAndThread, basicSickle, bucket]
        const skillNodes: SkillNodeModel[] = []
        const combatEncounter = new NoCombatEncounter()
        super(name, inventory, skillNodes, combatEncounter,conversations)
    }
}
export class InnShop extends ShopModel {
    innStay: number
    constructor(innStay: number, conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        const name = "Inn";
        const inventory = [beer, bread]
        const skillNodes: SkillNodeModel[] = [new CookingRange()];
        const combatEncounter = new RatCellarCombatEncounter();
        super(name, inventory, skillNodes, combatEncounter,conversations)
        this.innStay = innStay;
    }
}
export class MagicShop extends ShopModel {
    constructor(conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        const name = "Magic Shop";
        const inventory: Item[] = [magicBoltSpellTome]
        const skillNodes: SkillNodeModel[] = [];
        const combatEncounter = new NoCombatEncounter();
        super(name, inventory, skillNodes, combatEncounter,conversations)
    }
}
export class PotionShop extends ShopModel {
    constructor(conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        const name = "Potion Shop";
        const inventory: Item[] = [basicHealthPotion, basicManaPotion, basicStaminaPotion]
        const skillNodes: SkillNodeModel[] = [];
        const combatEncounter = new NoCombatEncounter();
        super(name, inventory, skillNodes, combatEncounter,conversations)
    }
}
export class TempleShop extends ShopModel {
    constructor(conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        const name = "Temple Shop";
        const inventory: Item[] = [basicHealSpellTome]
        const skillNodes: SkillNodeModel[] = [];
        const combatEncounter = new NoCombatEncounter();
        super(name, inventory, skillNodes, combatEncounter,conversations)
    }
}
export class SmithShop extends ShopModel {
    constructor(conversations: ((hero: Character, addGameLog: (message: string) => void) => DialogueNode[])[]) {
        const name = "Smithy";
        const inventory: Item[] = [club, ...bronzeArmor, ...bronzeWeapons, ...ironArmor, ...ironWeapons, ...leatherArmor, woodenShield]
        const skillNodes: SkillNodeModel[] = [];
        const combatEncounter = new NoCombatEncounter();
        super(name, inventory, skillNodes, combatEncounter,conversations)
    }
}

