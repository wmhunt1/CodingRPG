import {
    Back, bareBack, bareChest, bareFeet, bareFinger, bareFist, bareHands, bareHead, bareLegs, bareNeck, bareShoulders, bareWaist, bareWrists,cheese, ChestArmor,
    emptyHand,
    FootArmor, HandArmor, HeadArmor, Item, LegArmor, Neck, OffHand, pants, ratBite, Ring, shoes, ShoulderArmor, tunic, WaistArmor, Weapon, WristArmor
} from './ItemModel.ts';
import { Quest } from "./QuestModel.ts"
import { cookingSkill, farmingSkill, fishingSkill, Skill } from "./SkillModel.ts"

export class Character {
    name: string = "";
    level: number = 1;
    currentXP: number = 0;
    maxXP: number = 50;
    //basestats
    currentHP: number = 10;
    maxHP: number = 10;
    currentMP: number = 10;
    maxMP: number = 10;
    currentSP: number = 10;
    maxSP: number = 10;

    //attributes
    //physical
    strength: number = 10;
    //agility,constitution,dexterity,endurance
    //mental
    //intelligence wisdom willpower charisma or personality perception
    //misc
    //beauty/attractiveness
    //luck

    //inventory
    gold: number = 0;
    inventory: Item[] = []
    //weapons
    mainHand: Weapon = bareFist;
    offHand: OffHand = emptyHand;
    //ammo:
    head: HeadArmor = bareHead;
    shoulders: ShoulderArmor = bareShoulders;
    chest: ChestArmor = bareChest;
    hands: HandArmor = bareHands;
    waist: WaistArmor = bareWaist;
    wrists: WristArmor = bareWrists;
    legs: LegArmor = bareLegs;
    feet: FootArmor = bareFeet;
    neck: Neck = bareNeck;
    back: Back = bareBack;
    finger: Ring = bareFinger;
    //other
    //spellbook:
    //abilities:
    //skills:
    party: Character[] = []
    journal: Quest[] = []
    skillBook: Skill[] = []
    constructor(
        name: string,
        maxHP: number,
        currentHP: number,
        maxMP: number,
        currentMP: number,
        maxSP: number,
        currentSP: number,
        level: number,
        currentXP: number, // Using 'experience' to map to plainCharacter.currentXP
        maxXP: number,
        strength: number,
        gold: number,
        // No need to pass weapon, chest, inventory to constructor if they are initialized after
    ) {
        this.name = name;
        this.maxHP = maxHP;
        this.currentHP = currentHP;
        this.maxMP = maxMP;
        this.currentMP = currentMP;
        this.maxSP = maxSP;
        this.currentSP = currentSP;
        this.level = level;
        this.currentXP = currentXP;
        this.maxXP = maxXP;
        this.gold = gold;
        this.strength = strength;
        // Do NOT initialize weapon, chest, inventory here if they're coming from plainCharacter,
        // as they will be overwritten anyway. Or initialize with minimal defaults.
    }
}

export class Humanoid extends Character {
    constructor(name: string, maxHP: number,
        currentHP: number,
        maxMP: number,
        currentMP: number,
        maxSP: number,
        currentSP: number,
        level: number,
        currentXP: number,
        maxXP: number, strength: number,
        gold: number) {
        super(name, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP, strength, gold)
        this.chest = tunic;
        this.legs = pants;
        this.feet = shoes;
    }
}
export class Hero extends Humanoid {
    constructor(name: string) {
        const maxHP = 100;
        const currentHP = 100;
        const maxMP = 10;
        const currentMP = 10;
        const maxSP = 10;
        const currentSP = 10;
        const level = 1;
        const currentXP = 0;
        const maxXP = 50;
        const strength = 10;
        const gold = 10;
        super(name, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP, strength, gold)
        this.inventory = []
        this.skillBook = [cookingSkill, farmingSkill, fishingSkill]
    }
}
export class Beast extends Character {
    constructor(name: string,
        maxHP: number, currentHP: number, maxMP: number, currentMP: number,
        maxSP: number,
        currentSP: number,
        level: number,
        currentXP: number, // Using 'experience' to map to plainCharacter.currentXP
        maxXP: number, strength: number,
        gold: number) {
        super(name, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP, strength, gold)
        this.name = name;
        this.currentMP = 0;
        this.maxMP = 0;
    }
}
export class Rat extends Beast {
    constructor() {
        const name = "Rat";
        const maxHP = 5;
        const currentHP = 5;
        const maxMP = 0;
        const currentMP = 0;
        const maxSP = 5;
        const currentSP = 5;
        const level = 1;
        const currentXP = 5;
        const maxXP = 50;
        const strength = 5;
        const gold = 5;
        super(name, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP, strength, gold)
        this.mainHand = ratBite;
        this.inventory = [cheese]
    }
}



