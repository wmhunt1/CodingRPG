import { bread,bucket, butter, burntBread, burntFish, cookedMinnow, Item, milk, rawMinnow, water, wheat, wheatFlour } from "./ItemModel"
export class SkillRecipe {
    name: string;
    skill: string;
    levelReq: number;
    xp: number
    tool: string;
    input: Item[];
    output: Item[];
    failureOutput: Item[];
    verb: string;
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
        this.name = name
        this.skill = skill;
        this.levelReq = levelReq
        this.xp = xp;
        this.tool = tool;
        this.input = input;
        this.output = output;
        this.failureOutput = failureOutput;
        this.verb = verb;
    }
}
export class CraftingSkillRecipe extends SkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
        super(name, skill, levelReq, xp, tool, input, output, failureOutput, verb)
    }
}
export class CookingSkillRecipe extends CraftingSkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
        super(name, skill, levelReq, xp, tool, input, output, failureOutput, verb)
    }
}
export const bakeBread = new CookingSkillRecipe("Bake Bread", "Cooking", 1, 5, "N/A", [water, wheatFlour], [bucket, bread], [burntBread], "Bake")
export const churnButter = new CookingSkillRecipe("Churn Butter", "Cooking", 1, 5, "N/A", [milk], [bucket, butter], [milk], "Churn")
export const cookRawMinow = new CookingSkillRecipe("Cook Minnow", "Cooking", 1, 5, "N/A", [rawMinnow], [cookedMinnow], [burntFish], "Cook")
export const fetchWater = new CookingSkillRecipe("Fetch Water", "Cooking", 1, 0, "N/A", [bucket], [water], [bucket], "Fetch Water")
export const millWheatFlour = new CookingSkillRecipe("Mill Wheat Flour", "Cooking", 1, 5, "N/A", [wheat], [wheatFlour], [wheat], "Cook")
export class GatheringSkillRecipe extends SkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
        super(name, skill, levelReq, xp, tool, input, output, failureOutput, verb)
    }
}
export class FarmingSkillRecipe extends GatheringSkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string = "Fish") {
        super(name, skill, levelReq, xp, tool, input, output, failureOutput, verb)
    }
}
export const milkCow = new FarmingSkillRecipe("Milk Cow", "Farming", 1, 5, "N/A", [bucket], [milk], [bucket], "Milk")
export const harvestWheat = new FarmingSkillRecipe("Harvest Wheat", "Farming", 1, 5, "Sickle", [wheat], [wheatFlour], [], "Harvest")
export class FishingSkillRecipe extends GatheringSkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string = "Fish") {
        super(name, skill, levelReq, xp, tool, input, output, failureOutput, verb)
    }
}
export const fishRawMinnow = new FishingSkillRecipe("Fish for Minnow", "Fishing", 1, 5, "Fishing Rod", [], [rawMinnow], [], "Fish")