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
export const cookingSkill = new CraftingSkill("Cooking", 1, 0, 50)
export class GatheringSkill extends Skill {
    constructor(name: string, level: number, currentXP: number, maxXP: number) {
        super(name, level, currentXP, maxXP)
    }
}
export const fishingSkill = new GatheringSkill("Fishing", 1, 0, 50)