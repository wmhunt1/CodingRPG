import { Ability } from "./AbilityModel.ts"
import {
    Back, bareBack, bareChest, bareFeet, bareFinger, bareFist, bareHands, bareHead, bareLegs, bareNeck, bareShoulders, bareWaist, bareWrists,
    bronzeSpear, bronzeShield,
    charge, cheese, ChestArmor, club, cowLeather,
    dogBite, dogCollar, emptyHand, FootArmor,
    HandArmor, HeadArmor, Item,
    LegArmor,
    Neck, OffHand, pants,
    ratBite, rawBeef, Ring, shoes, ShoulderArmor,
    tunic,
    WaistArmor, Weapon, wolfBite, wolfFur, woodenShield, WristArmor,
} from './ItemModel.ts';
import { Quest } from "./QuestModel.ts"
import { cookingSkill, farmingSkill, fishingSkill, leatherWorkingSkill, miningSkill, Skill, smithingSkill, tailoringSkill, woodcuttingSkill } from "./SkillModel.ts"
import { magicBoltSpell, Spell } from "./SpellModel.ts"

export class Character {
    name: string = "";
    type: string;
    subType: string;
    level: number = 1;
    currentXP: number = 0;
    maxXP: number = 50;
    //basestats
    currentHP: number = 10;
    maxHP: number = 10;
    hpBonus: number = 0;
    hpPenalty: number = 0;
    hpTempBonus: number = 0;
    hpTempPenalty: number = 0;
    currentMP: number = 10;
    maxMP: number = 10;
    mpBonus: number = 0;
    mpPenalty: number = 0;
    mpTempBonus: number = 0;
    mpTempPenalty: number = 0;
    currentSP: number = 10;
    maxSP: number = 10;
    spBonus: number = 0;
    spPenalty: number = 0;
    spTempBonus: number = 0;
    spTempPenalty: number = 0;


    //attributes
    //physical
    agility: number = 10;
    agilityBonus: number = 0;
    agilityPenalty: number = 0;
    agilityTempBonus: number = 0;
    agilityTempPenalty: number = 0;
    constitution: number = 10;
    constitutionBonus: number = 0;
    constitutionPenalty: number = 0;
    constitutionTempBonus: number = 0;
    constitutionTempPenalty: number = 0;
    dexterity: number = 10;
    dexterityBonus: number = 0;
    dexterityPenalty: number = 0;
    dexterityTempBonus: number = 0;
    dexterityTempPenalty: number = 0;
    endurance: number = 10;
    enduranceBonus: number = 0;
    endurancePenalty: number = 0;
    enduranceTempBonus: number = 0;
    enduranceTempPenalty: number = 0;
    strength: number = 10;
    strengthBonus: number = 0;
    strengthPenalty: number = 0;
    strengthTempBonus: number = 0;
    strengthTempPenalty: number = 0;
    //mental
    intelligence: number = 10;
    intelligenceBonus: number = 0;
    intelligencePenalty: number = 0;
    intelligenceTempBonus: number = 0;
    intelligenceTempPenalty: number = 0;
    perception: number = 10;
    perceptionBonus: number = 0;
    perceptionPenalty: number = 0;
    perceptionTempBonus: number = 0;
    perceptionTempPenalty: number = 0;
    willpower: number = 10;
    willpowerBonus: number = 0;
    willpowerPenalty: number = 0;
    willpowerTempBonus: number = 0;
    willpowerTempPenalty: number = 0;
    wisdom: number = 10;
    wisdomBonus: number = 0;
    wisdomPenalty: number = 0;
    wisdomTempBonus: number = 0;
    wisdomTempPenalty: number = 0;
    // charisma or personality perception
    //social
    attractiveness: number = 10;
    attractivenessBonus: number = 0;
    attractivenessPenalty: number = 0;
    attractivenessTempBonus: number = 0;
    attractivenessTempPenalty: number = 0;
    charisma: number = 10;
    charismaBonus: number = 0;
    charismaPenalty: number = 0;
    charismaTempBonus: number = 0;
    charismaTempPenalty: number = 0;
    personality: number = 10;
    personalityBonus: number = 0;
    personalityPenalty: number = 0;
    personalityTempBonus: number = 0;
    personalityTempPenalty: number = 0;
    //misc
    luck: number = 10;
    luckBonus: number = 0;
    luckPenalty: number = 0;
    luckTempBonus: number = 0;
    luckTempPenalty: number = 0;

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
    party: Character[] = []
    //to store party member progress if they leave the party
    inactiveParty: Character[] = []
    journal: Quest[] = []
    skillBook: Skill[] = []
    spellBook: Spell[] = []
    abilities: Ability[] = []
    constructor(
        name: string,
        type: string,
        subType: string,
        maxHP: number,
        currentHP: number,
        maxMP: number,
        currentMP: number,
        maxSP: number,
        currentSP: number,
        level: number,
        currentXP: number, // Using 'experience' to map to plainCharacter.currentXP
        maxXP: number,
        agility: number,
        constitution: number,
        dexterity: number,
        endurance: number,
        strength: number,
        intelligence: number,
        perception: number,
        willpower: number,
        wisdom: number,
        attractiveness: number,
        charisma: number,
        personality: number,
        luck: number,
        gold: number,
    ) {
        this.name = name;
        this.type = type;
        this.subType = subType;
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
        this.agility = agility;
        this.constitution = constitution;
        this.dexterity = dexterity;
        this.endurance = endurance;
        this.strength = strength;
        this.intelligence = intelligence;
        this.perception = perception;
        this.willpower = willpower;
        this.wisdom = wisdom;
        this.attractiveness = attractiveness;
        this.charisma = charisma;
        this.personality = personality;
        this.luck = luck;
    }
}
export class Construct extends Character {
    constructor(name: string, maxHP: number,
        currentHP: number,
        maxMP: number,
        currentMP: number,
        maxSP: number,
        currentSP: number,
        level: number,
        currentXP: number,
        maxXP: number,
        agility: number,
        constitution: number,
        dexterity: number,
        endurance: number,
        strength: number,
        intelligence: number,
        perception: number,
        willpower: number,
        wisdom: number,
        attractiveness: number,
        charisma: number,
        personality: number,
        luck: number,
        gold: number) {
        const type = "Construct"
        const subType = "";
        super(name, type, subType, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP
            , agility, constitution, dexterity, endurance, strength, intelligence, perception, willpower, wisdom, attractiveness, charisma, personality, luck,
            gold)
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
        maxXP: number,
        agility: number,
        constitution: number,
        dexterity: number,
        endurance: number,
        strength: number,
        intelligence: number,
        perception: number,
        willpower: number,
        wisdom: number,
        attractiveness: number,
        charisma: number,
        personality: number,
        luck: number,
        gold: number) {
        const type = "Humanoid"
        const subType = "";
        super(name, type, subType, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP,
            agility, constitution, dexterity, endurance, strength, intelligence, perception, willpower, wisdom, attractiveness, charisma, personality, luck,
            gold)
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
        const agility = 10
        const constitution = 12;
        const dexterity = 10;
        const endurance = 10;
        const strength = 12;
        const intelligence = 12;
        const perception = 10;
        const willpower = 10;
        const wisdom = 12;
        const attractiveness = 10;
        const charisma = 12;
        const personality = 10;
        const luck = 15;
        const gold = 10;
        super(name, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP,
            agility, constitution, dexterity, endurance, strength, intelligence, perception, willpower, wisdom, attractiveness, charisma, personality, luck,
            gold)
        this.inventory = []
        this.party = [loyalHound]
        this.skillBook = [cookingSkill, farmingSkill, fishingSkill, leatherWorkingSkill, miningSkill, smithingSkill, tailoringSkill, woodcuttingSkill]
        this.spellBook = [magicBoltSpell]
        this.mainHand = club;
        this.offHand = woodenShield;
    }
}
export class Beast extends Character {
    constructor(name: string,
        subType: string,
        maxHP: number, currentHP: number, maxMP: number, currentMP: number,
        maxSP: number,
        currentSP: number,
        level: number,
        currentXP: number, // Using 'experience' to map to plainCharacter.currentXP
        maxXP: number,
        agility: number,
        constitution: number,
        dexterity: number,
        endurance: number,
        strength: number,
        intelligence: number,
        perception: number,
        willpower: number,
        wisdom: number,
        attractiveness: number,
        charisma: number,
        personality: number,
        luck: number,
        gold: number) {
        const type = "Beast"
        super(name, type, subType, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP,
            agility, constitution, dexterity, endurance, strength, intelligence, perception, willpower, wisdom, attractiveness, charisma, personality, luck,
            gold)
        this.name = name;
        this.currentMP = 0;
        this.maxMP = 0;
    }
}
export class Cow extends Beast {
    constructor() {
        const name = "Cow";
        const subType = "Cow"
        const maxHP = 30;
        const currentHP = 30;
        const maxMP = 0;
        const currentMP = 0;
        const maxSP = 10;
        const currentSP = 10;
        const level = 5;
        const currentXP = 25;
        const maxXP = 50;
        const agility = 8
        const constitution = 18;
        const dexterity = 8;
        const endurance = 15;
        const strength = 18;
        const intelligence = 5;
        const perception = 10;
        const willpower = 10;
        const wisdom = 10;
        const attractiveness = 1;
        const charisma = 1;
        const personality = 10;
        const luck = 5;
        const gold = 0;
        super(name, subType, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP,
            agility, constitution, dexterity, endurance, strength, intelligence, perception, willpower, wisdom, attractiveness, charisma, personality, luck,
            gold)
        this.mainHand = charge;
        this.inventory = [cowLeather, rawBeef]
    }
}
export class Dog extends Beast {
    constructor() {
        const name = "Loyal Hound";
        const subType = "Dog"
        const maxHP = 10;
        const currentHP = 10;
        const maxMP = 0;
        const currentMP = 0;
        const maxSP = 10;
        const currentSP = 10;
        const level = 1;
        const currentXP = 0;
        const maxXP = 50;
        const agility = 15
        const constitution = 10;
        const dexterity = 10;
        const endurance = 12;
        const strength = 12;
        const intelligence = 8;
        const perception = 15;
        const willpower = 12;
        const wisdom = 10;
        const attractiveness = 10;
        const charisma = 15;
        const personality = 10;
        const luck = 10;
        const gold = 0;
        super(name, subType, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP,
            agility, constitution, dexterity, endurance, strength, intelligence, perception, willpower, wisdom, attractiveness, charisma, personality, luck,
            gold)
        this.mainHand = dogBite;
        this.neck = dogCollar
    }
}
export const loyalHound = new Dog()
export class Rat extends Beast {
    constructor() {
        const name = "Rat";
        const subType = "Rat"
        const maxHP = 3;
        const currentHP = 3;
        const maxMP = 0;
        const currentMP = 0;
        const maxSP = 15;
        const currentSP = 15;
        const level = 1;
        const currentXP = 5;
        const maxXP = 50;
        const agility = 15
        const constitution = 8;
        const dexterity = 12;
        const endurance = 15;
        const strength = 5;
        const intelligence = 8;
        const perception = 12;
        const willpower = 8;
        const wisdom = 5;
        const attractiveness = 1;
        const charisma = 1;
        const personality = 1;
        const luck = 10;
        const gold = 0;
        super(name, subType, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP,
            agility, constitution, dexterity, endurance, strength, intelligence, perception, willpower, wisdom, attractiveness, charisma, personality, luck,
            gold)
        this.mainHand = ratBite;
        this.inventory = [cheese]
    }
}
export class Wolf extends Beast {
    constructor() {
        const name = "Wolf";
        const subType = "Wolf"
        const maxHP = 15;
        const currentHP = 15;
        const maxMP = 0;
        const currentMP = 0;
        const maxSP = 15;
        const currentSP = 15;
        const level = 1;
        const currentXP = 10;
        const maxXP = 50;
        const agility = 12
        const constitution = 10;
        const dexterity = 12;
        const endurance = 15;
        const strength = 15;
        const intelligence = 8;
        const perception = 15;
        const willpower = 15;
        const wisdom = 10;
        const attractiveness = 5;
        const charisma = 5;
        const personality = 10;
        const luck = 5;
        const gold = 0;
        super(name, subType, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP,
            agility, constitution, dexterity, endurance, strength, intelligence, perception, willpower, wisdom, attractiveness, charisma, personality, luck,
            gold)
        this.mainHand = wolfBite;
        this.inventory = [wolfFur]
    }
}
export class Undead extends Character {
    constructor(name: string, subType: string, maxHP: number,
        currentHP: number,
        maxMP: number,
        currentMP: number,
        maxSP: number,
        currentSP: number,
        level: number,
        currentXP: number,
        maxXP: number,
        agility: number,
        constitution: number,
        dexterity: number,
        endurance: number,
        strength: number,
        intelligence: number,
        perception: number,
        willpower: number,
        wisdom: number,
        attractiveness: number,
        charisma: number,
        personality: number,
        luck: number,
        gold: number) {
        const type = "Undead"
        super(name, type, subType, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP,
            agility, constitution, dexterity, endurance, strength, intelligence, perception, willpower, wisdom, attractiveness, charisma, personality, luck,
            gold)
    }
}
export class BasicSkeleton extends Undead {
    constructor() {
        const name = "Skeleton";
        const subType = "Skeleton"
        const maxHP = 8;
        const currentHP = 8;
        const maxMP = 0;
        const currentMP = 0;
        const maxSP = 10;
        const currentSP = 10;
        const level = 1;
        const currentXP = 10;
        const maxXP = 50;
        const agility = 12
        const constitution = 15;
        const dexterity = 12;
        const endurance = 10;
        const strength = 10;
        const intelligence = 5;
        const perception = 10;
        const willpower = 15;
        const wisdom = 5;
        const attractiveness = 1;
        const charisma = 1;
        const personality = 1;
        const luck = 10;
        const gold = 0;
        super(name, subType, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP,
            agility, constitution, dexterity, endurance, strength, intelligence, perception, willpower, wisdom, attractiveness, charisma, personality, luck,
            gold)
        this.mainHand = bronzeSpear;
        this.offHand = bronzeShield;
        this.inventory = [bronzeShield, bronzeSpear]
    }
}
export class BasicZombie extends Undead {
    constructor() {
        const name = "Zombie";
        const subType = "Zombie"
        const maxHP = 20;
        const currentHP = 20;
        const maxMP = 0;
        const currentMP = 0;
        const maxSP = 10;
        const currentSP = 10;
        const level = 1;
        const currentXP = 10;
        const maxXP = 50;
        const agility = 5
        const constitution = 15;
        const dexterity = 5;
        const endurance = 15;
        const strength = 12;
        const intelligence = 1;
        const perception = 8;
        const willpower = 15;
        const wisdom = 1;
        const attractiveness = 1;
        const charisma = 1;
        const personality = 1;
        const luck = 10;
        const gold = 0;
        super(name, subType, maxHP, currentHP, maxMP, currentMP, maxSP, currentSP, level, currentXP, maxXP,
            agility, constitution, dexterity, endurance, strength, intelligence, perception, willpower, wisdom, attractiveness, charisma, personality, luck,
            gold)
        this.mainHand = bareFist;
    }

}