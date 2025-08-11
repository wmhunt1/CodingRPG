import {
    bread, bucket, butter, burntBeef, burntBread, burntFish,
    cookedBeef, cookedMinnow, cookedSalmon, cookedTrout,cowLeather,
    Item,
    leatherBelt,leatherBoots,leatherBracers,leatherChest,leatherCowl,leatherGauntlets,leatherLegs,leatherPauldrons,
    milk,
    rawBeef, rawMinnow, rawSalmon, rawTrout,
    water, wheat, wheatFlour, woodLogs,

} from "./ItemModel"
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
export const bakeBread = new CookingSkillRecipe("Bake Bread", "Cooking", 1, 5, "N/A", [water, wheatFlour], [bucket, bread], [bucket,burntBread], "Bake")
export const churnButter = new CookingSkillRecipe("Churn Butter", "Cooking", 1, 5, "N/A", [milk], [bucket, butter], [milk], "Churn")
export const cookRawBeef = new CookingSkillRecipe("Cook Beef", "Cooking", 1, 5, "N/A", [rawBeef], [cookedBeef], [burntBeef], "Cook")
export const cookRawMinow = new CookingSkillRecipe("Cook Minnow", "Cooking", 1, 5, "N/A", [rawMinnow], [cookedMinnow], [burntFish], "Cook")
export const cookRawSalmon = new CookingSkillRecipe("Cook Salmon", "Cooking", 30, 150, "N/A", [rawSalmon], [cookedSalmon], [burntFish], "Cook")
export const cookRawTrout = new CookingSkillRecipe("Cook Trout", "Cooking", 15, 75, "N/A", [rawTrout], [cookedTrout], [burntFish], "Cook")
export const fetchWater = new CookingSkillRecipe("Fetch Water", "Cooking", 1, 0, "N/A", [bucket], [water], [bucket], "Fetch Water")
export const millWheatFlour = new CookingSkillRecipe("Mill Wheat Flour", "Cooking", 1, 5, "N/A", [wheat], [wheatFlour], [wheat], "Cook")

export class LeatherworkingSkillRecipe extends CraftingSkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
        super(name, skill, levelReq, xp, tool, input, output, failureOutput, verb)
    }
}
export const craftLeatherBelt = new LeatherworkingSkillRecipe("Craft Leather Belt", "Leatherworking", 1, 5, "Needle and Thread", [cowLeather], [leatherBelt], [], "Craft")
export const craftLeatherBoots = new LeatherworkingSkillRecipe("Craft Leather Boots", "Leatherworking", 1, 5, "Needle and Thread", [cowLeather], [leatherBoots], [], "Craft")
export const craftLeatherBracers = new LeatherworkingSkillRecipe("Craft Leather Bracers", "Leatherworking", 1, 5, "Needle and Thread", [cowLeather], [leatherBracers], [], "Craft")
export const craftLeatherChest = new LeatherworkingSkillRecipe("Craft Leather Jacket", "Leatherworking", 1, 5, "Needle and Thread", [cowLeather], [leatherChest], [], "Craft")
export const craftLeatherCowl = new LeatherworkingSkillRecipe("Craft Leather Cowl", "Leatherworking", 1, 5, "Needle and Thread", [cowLeather], [leatherCowl], [], "Craft")
export const craftLeatherGauntlets = new LeatherworkingSkillRecipe("Craft Leather Gauntlets", "Leatherworking", 1, 5, "Needle and Thread", [cowLeather], [leatherGauntlets], [], "Craft")
export const craftLeatherLegs = new LeatherworkingSkillRecipe("Craft Leather Greaves", "Leatherworking", 1, 5, "Needle and Thread", [cowLeather], [leatherLegs], [], "Craft")
export const craftLeatherPauldrons = new LeatherworkingSkillRecipe("Craft Leather Pauldrons", "Leatherworking", 1, 5, "Needle and Thread", [cowLeather], [leatherPauldrons], [], "Craft")
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
export const fishRawSalmon = new FishingSkillRecipe("Fish for Minnow", "Fishing", 30, 150, "Fishing Rod", [], [rawSalmon], [], "Fish")
export const fishRawTrout = new FishingSkillRecipe("Fish for Minnow", "Fishing", 15, 75, "Fishing Rod", [], [rawTrout], [], "Fish")

export class WoodcuttingSkillRecipe extends GatheringSkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string = "Fish") {
        super(name, skill, levelReq, xp, tool, input, output, failureOutput, verb)
    }
}
export const chopWoodLogs = new FishingSkillRecipe("Chop Tree", "Woodcutting", 1, 5, "Hatchet", [], [woodLogs], [], "Chop")