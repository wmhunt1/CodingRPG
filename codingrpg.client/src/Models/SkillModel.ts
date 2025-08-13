export class Skill {
    name: string;
    level: number;
    currentXP: number;
    maxXP: number;
    constructor(name: string, level: number, currentXP: number, maxXP: number) {
        this.name = name;
        this.level = level;
        this.currentXP = currentXP;
        this.maxXP = maxXP;
    }
}
export class CraftingSkill extends Skill {
    constructor(name: string, level: number, currentXP: number, maxXP: number) {
        super(name, level, currentXP, maxXP)
    }
}
//export const alchemySkill = new CraftingSkill("Alchemy", 1, 0, 50)
//construction
export const cookingSkill = new CraftingSkill("Cooking", 1, 0, 50)
export const leatherWorkingSkill = new CraftingSkill("Leatherworking", 1, 0, 50)
export const smithingSkill = new CraftingSkill("Smithing", 1, 0, 50)
export const tailoringSkill = new CraftingSkill("Tailoring", 1, 0, 50)
//crafting?
//enchanting
//engineering
//firemaking or utility
//fletching
//jewelcrafting
//pottery
export class GatheringSkill extends Skill {
    constructor(name: string, level: number, currentXP: number, maxXP: number) {
        super(name, level, currentXP, maxXP)
    }
}
export const farmingSkill = new GatheringSkill("Farming",1,0,50)
export const fishingSkill = new GatheringSkill("Fishing", 1, 0, 50)
//export const herbloreSkill = new GatheringSkill("Herblore", 1, 0, 50)
export const huntingSkill = new GatheringSkill("Hunting", 1, 0, 50)
export const miningSkill = new GatheringSkill("Mining", 1, 0, 50)
export const woodcuttingSkill = new GatheringSkill("Woodcutting",1,0,50)