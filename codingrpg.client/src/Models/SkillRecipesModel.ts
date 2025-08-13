import {
    bread,
    bronzeAxe, bronzeAxeOffHand, bronzeBar, bronzeBelt, bronzeBoots, bronzeBracers, bronzeChest, bronzeDagger, bronzeDaggerOffHand, bronzeGauntlets,
    bronzeHammer, bronzeHammerOffHand, bronzeHelmet, bronzeLegs, bronzeMace, bronzeMaceOffHand, bronzePauldrons, bronzeShield, bronzeSpear,
    bronzeSpearOffHand, bronzeStaff, bronzeSword, bronzeSwordOffHand, bronzeTwoHandedAxe, bronzeTwoHandedHammer, bronzeTwoHandedMace, bronzeTwoHandedSpear,
    bronzeTwoHandedSword,
    bucket, butter, burntBeef, burntBread, burntFish,
    cookedBeef, cookedMinnow, cookedSalmon, cookedTrout, copperOre, cowLeather,
    flax,
    ironAxe, ironAxeOffHand, ironBar, ironBelt, ironBoots, ironBracers, ironChest, ironDagger, ironDaggerOffHand, ironHammer, ironHammerOffHand, ironHelmet,
    ironGauntlets, ironLegs, ironOre, ironMace, ironMaceOffHand, ironPauldrons, ironShield, ironSpear, ironSpearOffHand, ironStaff, ironSword, ironSwordOffHand,
    ironTwoHandedAxe, ironTwoHandedHammer, ironTwoHandedMace, ironTwoHandedSpear, ironTwoHandedSword,
    Item,
    leatherBelt, leatherBoots, leatherBracers, leatherChest, leatherCowl, leatherGauntlets, leatherLegs, leatherPauldrons, linenCloth,
    milk, pants,
    skirt,
    rawBeef, rawMinnow, rawSalmon, rawTrout,
    water, wheat, wheatFlour, woodLogs,
    tinOre, tunic,
    cloak,

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
export const bakeBread = new CookingSkillRecipe("Bake Bread", "Cooking", 1, 5, "N/A", [water, wheatFlour], [bucket, bread], [bucket, burntBread], "Bake")
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
export class SmithingSkillRecipe extends CraftingSkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
        super(name, skill, levelReq, xp, tool, input, output, failureOutput, verb)
    }
}
//bronze
export const forgeBronzeAxe = new SmithingSkillRecipe("Forge Bronze Axe", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeAxe], [], "Forge")
export const forgeBronzeBelt = new SmithingSkillRecipe("Forge Bronze Belt", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeBelt], [], "Forge")
export const forgeBronzeBoots = new SmithingSkillRecipe("Forge Bronze Boots", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeBoots], [], "Forge")
export const forgeBronzeBracers = new SmithingSkillRecipe("Forge Bronze Bracers", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeBracers], [], "Forge")
export const forgeBronzeChest = new SmithingSkillRecipe("Forge Bronze Chest", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeChest], [], "Forge")
export const forgeBronzeDagger = new SmithingSkillRecipe("Forge Bronze Dagger", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeDagger], [], "Forge")
export const forgeBronzeGauntlets = new SmithingSkillRecipe("Forge Bronze Gauntlets", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeGauntlets], [], "Forge")
export const forgeBronzeHammer = new SmithingSkillRecipe("Forge Bronze Hammer", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeHammer], [], "Forge")
export const forgeBronzeHelmet = new SmithingSkillRecipe("Forge Bronze Helmet", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeHelmet], [], "Forge")
export const forgeBronzeLegs = new SmithingSkillRecipe("Forge Bronze Legs", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeLegs], [], "Forge")
export const forgeBronzeMace = new SmithingSkillRecipe("Forge Bronze Mace", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeMace], [], "Forge")
export const forgeBronzeAxeOffHand = new SmithingSkillRecipe("Forge Bronze Axe Off-Hand", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeAxeOffHand], [], "Forge")
export const forgeBronzeDaggerOffHand = new SmithingSkillRecipe("Forge Bronze Dagger Off-Hand", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeDaggerOffHand], [], "Forge")
export const forgeBronzeHammerOffHand = new SmithingSkillRecipe("Forge Bronze Hammer Off-Hand", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeHammerOffHand], [], "Forge")
export const forgeBronzeMaceOffHand = new SmithingSkillRecipe("Forge Bronze Mace Off-Hand", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeMaceOffHand], [], "Forge")
export const forgeBronzeSpearOffHand = new SmithingSkillRecipe("Forge Bronze Spear Off-Hand", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeSpearOffHand], [], "Forge")
export const forgeBronzeSwordOffHand = new SmithingSkillRecipe("Forge Bronze Sword Off-Hand", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeSwordOffHand], [], "Forge")
export const forgeBronzePauldrons = new SmithingSkillRecipe("Forge Bronze Pauldrons", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzePauldrons], [], "Forge")
export const forgeBronzeShield = new SmithingSkillRecipe("Forge Bronze Shield", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeShield], [], "Forge")
export const forgeBronzeSpear = new SmithingSkillRecipe("Forge Bronze Spear", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeSpear], [], "Forge")
export const forgeBronzeSword = new SmithingSkillRecipe("Forge Bronze Sword", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeSword], [], "Forge")
export const forgeBronzeTwoHandedAxe = new SmithingSkillRecipe("Forge Bronze Two-Handed Axe", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeTwoHandedAxe], [], "Forge")
export const forgeBronzeTwoHandedHammer = new SmithingSkillRecipe("Forge Bronze Two-Handed Hammer", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeTwoHandedHammer], [], "Forge")
export const forgeBronzeTwoHandedMace = new SmithingSkillRecipe("Forge Bronze Two-Handed Mace", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeTwoHandedMace], [], "Forge")
export const forgeBronzeTwoHandedSpear = new SmithingSkillRecipe("Forge Bronze Two-Handed Spear", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeTwoHandedSpear], [], "Forge")
export const forgeBronzeStaff = new SmithingSkillRecipe("Forge Bronze Staff", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeStaff], [], "Forge")
export const forgeBronzeTwoHandedSword = new SmithingSkillRecipe("Forge Bronze Two-Handed Sword", "Smithing", 1, 5, "N/A", [bronzeBar], [bronzeTwoHandedSword], [], "Forge")

export const bronzeRecipes: SkillRecipe[] = [
    forgeBronzeAxe,
    forgeBronzeBelt,
    forgeBronzeBoots,
    forgeBronzeBracers,
    forgeBronzeChest,
    forgeBronzeDagger,
    forgeBronzeGauntlets,
    forgeBronzeHammer,
    forgeBronzeHelmet,
    forgeBronzeLegs,
    forgeBronzeMace,
    forgeBronzeAxeOffHand,
    forgeBronzeDaggerOffHand,
    forgeBronzeHammerOffHand,
    forgeBronzeMaceOffHand,
    forgeBronzeSpearOffHand,
    forgeBronzeSwordOffHand,
    forgeBronzePauldrons,
    forgeBronzeShield,
    forgeBronzeSpear,
    forgeBronzeSword,
    forgeBronzeTwoHandedAxe,
    forgeBronzeTwoHandedHammer,
    forgeBronzeTwoHandedMace,
    forgeBronzeTwoHandedSpear,
    forgeBronzeStaff,
    forgeBronzeTwoHandedSword
];
//iron
export const forgeIronAxe = new SmithingSkillRecipe("Forge Iron Axe", "Smithing", 5, 25, "N/A", [ironBar], [ironAxe], [], "Forge")
export const forgeIronBelt = new SmithingSkillRecipe("Forge Iron Belt", "Smithing", 5, 25, "N/A", [ironBar], [ironBelt], [], "Forge")
export const forgeIronBoots = new SmithingSkillRecipe("Forge Iron Boots", "Smithing", 5, 25, "N/A", [ironBar], [ironBoots], [], "Forge")
export const forgeIronBracers = new SmithingSkillRecipe("Forge Iron Bracers", "Smithing", 5, 25, "N/A", [ironBar], [ironBracers], [], "Forge")
export const forgeIronChest = new SmithingSkillRecipe("Forge Iron Chest", "Smithing", 5, 25, "N/A", [ironBar], [ironChest], [], "Forge")
export const forgeIronDagger = new SmithingSkillRecipe("Forge Iron Dagger", "Smithing", 5, 25, "N/A", [ironBar], [ironDagger], [], "Forge")
export const forgeIronGauntlets = new SmithingSkillRecipe("Forge Iron Gauntlets", "Smithing", 5, 25, "N/A", [ironBar], [ironGauntlets], [], "Forge")
export const forgeIronHammer = new SmithingSkillRecipe("Forge Iron Hammer", "Smithing", 5, 25, "N/A", [ironBar], [ironHammer], [], "Forge")
export const forgeIronHelmet = new SmithingSkillRecipe("Forge Iron Helmet", "Smithing", 5, 25, "N/A", [ironBar], [ironHelmet], [], "Forge")
export const forgeIronLegs = new SmithingSkillRecipe("Forge Iron Legs", "Smithing", 5, 25, "N/A", [ironBar], [ironLegs], [], "Forge")
export const forgeIronMace = new SmithingSkillRecipe("Forge Iron Mace", "Smithing", 5, 25, "N/A", [ironBar], [ironMace], [], "Forge")
export const forgeIronPauldrons = new SmithingSkillRecipe("Forge Iron Pauldrons", "Smithing", 5, 25, "N/A", [ironBar], [ironPauldrons], [], "Forge")
export const forgeIronAxeOffHand = new SmithingSkillRecipe("Forge Iron Axe Off-Hand", "Smithing", 5, 25, "N/A", [ironBar], [ironAxeOffHand], [], "Forge")
export const forgeIronDaggerOffHand = new SmithingSkillRecipe("Forge Iron Dagger Off-Hand", "Smithing", 5, 25, "N/A", [ironBar], [ironDaggerOffHand], [], "Forge")
export const forgeIronHammerOffHand = new SmithingSkillRecipe("Forge Iron Hammer Off-Hand", "Smithing", 5, 25, "N/A", [ironBar], [ironHammerOffHand], [], "Forge")
export const forgeIronMaceOffHand = new SmithingSkillRecipe("Forge Iron Mace Off-Hand", "Smithing", 5, 25, "N/A", [ironBar], [ironMaceOffHand], [], "Forge")
export const forgeIronSpearOffHand = new SmithingSkillRecipe("Forge Iron Spear Off-Hand", "Smithing", 5, 25, "N/A", [ironBar], [ironSpearOffHand], [], "Forge")
export const forgeIronSwordOffHand = new SmithingSkillRecipe("Forge Iron Sword Off-Hand", "Smithing", 5, 25, "N/A", [ironBar], [ironSwordOffHand], [], "Forge")
export const forgeIronShield = new SmithingSkillRecipe("Forge Iron Shield", "Smithing", 5, 25, "N/A", [ironBar], [ironShield], [], "Forge")
export const forgeIronSpear = new SmithingSkillRecipe("Forge Iron Spear", "Smithing", 5, 25, "N/A", [ironBar], [ironSpear], [], "Forge")
export const forgeIronSword = new SmithingSkillRecipe("Forge Iron Sword", "Smithing", 5, 25, "N/A", [ironBar], [ironSword], [], "Forge")
export const forgeIronTwoHandedAxe = new SmithingSkillRecipe("Forge Iron Two-Handed Axe", "Smithing", 5, 25, "N/A", [ironBar], [ironTwoHandedAxe], [], "Forge")
export const forgeIronTwoHandedHammer = new SmithingSkillRecipe("Forge Iron Two-Handed Hammer", "Smithing", 5, 25, "N/A", [ironBar], [ironTwoHandedHammer], [], "Forge")
export const forgeIronTwoHandedMace = new SmithingSkillRecipe("Forge Iron Two-Handed Mace", "Smithing", 5, 25, "N/A", [ironBar], [ironTwoHandedMace], [], "Forge")
export const forgeIronTwoHandedSpear = new SmithingSkillRecipe("Forge Iron Two-Handed Spear", "Smithing", 5, 25, "N/A", [ironBar], [ironTwoHandedSpear], [], "Forge")
export const forgeIronStaff = new SmithingSkillRecipe("Forge Iron Staff", "Smithing", 5, 25, "N/A", [ironBar], [ironStaff], [], "Forge")
export const forgeIronTwoHandedSword = new SmithingSkillRecipe("Forge Iron Two-Handed Sword", "Smithing", 5, 25, "N/A", [ironBar], [ironTwoHandedSword], [], "Forge")

export const ironRecipes: SkillRecipe[] = [
    forgeIronAxe,
    forgeIronBelt,
    forgeIronBoots,
    forgeIronBracers,
    forgeIronChest,
    forgeIronDagger,
    forgeIronGauntlets,
    forgeIronHammer,
    forgeIronHelmet,
    forgeIronLegs,
    forgeIronMace,
    forgeIronAxeOffHand,
    forgeIronDaggerOffHand,
    forgeIronHammerOffHand,
    forgeIronMaceOffHand,
    forgeIronSpearOffHand,
    forgeIronSwordOffHand,
    forgeIronPauldrons,
    forgeIronShield,
    forgeIronSpear,
    forgeIronSword,
    forgeIronTwoHandedAxe,
    forgeIronTwoHandedHammer,
    forgeIronTwoHandedMace,
    forgeIronTwoHandedSpear,
    forgeIronStaff,
    forgeIronTwoHandedSword
];
//smelting
export const smeltBronzeBar = new SmithingSkillRecipe("Smelt Bronze Bar", "Smithing", 1, 5, "N/A", [copperOre, tinOre], [bronzeBar], [], "Smelt")
export const smeltIronBar = new SmithingSkillRecipe("Smelt Iron Bar", "Smithing", 5, 25, "N/A", [ironOre, ironOre], [ironBar], [], "Smelt")
export class TailoringSkillRecipe extends CraftingSkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
        super(name, skill, levelReq, xp, tool, input, output, failureOutput, verb)
    }
}
export const spinFlax = new TailoringSkillRecipe("Spin Flax", "Tailoring", 1, 5, "N/A", [flax], [linenCloth], [], "Spin")
export const weaveCloak = new TailoringSkillRecipe("Weave Cloak", "Tailoring", 1, 5, "N/A", [linenCloth], [cloak], [], "Weave")
export const weavePants = new TailoringSkillRecipe("Weave Pants", "Tailoring", 1, 5, "N/A", [linenCloth], [pants], [], "Weave")
export const weaveSkirt = new TailoringSkillRecipe("Weave Skirt", "Tailoring", 1, 5, "N/A", [linenCloth], [skirt], [], "Weave")
export const weaveTunic = new TailoringSkillRecipe("Weave Tunic", "Tailoring", 1, 5, "N/A", [linenCloth], [tunic], [], "Weave")

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
export const harvestWheat = new FarmingSkillRecipe("Harvest Wheat", "Farming", 1, 5, "Sickle", [wheat], [wheatFlour], [], "Harvest")
export const milkCow = new FarmingSkillRecipe("Milk Cow", "Farming", 1, 5, "N/A", [bucket], [milk], [bucket], "Milk")
export const pickFlax = new FarmingSkillRecipe("Pick Flax", "Farming", 1, 5, "N/A", [], [flax], [], "Pick")

export class FishingSkillRecipe extends GatheringSkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string = "Fish") {
        super(name, skill, levelReq, xp, tool, input, output, failureOutput, verb)
    }
}
export const fishRawMinnow = new FishingSkillRecipe("Fish for Minnow", "Fishing", 1, 5, "Fishing Rod", [], [rawMinnow], [], "Fish")
export const fishRawSalmon = new FishingSkillRecipe("Fish for Minnow", "Fishing", 30, 150, "Fishing Rod", [], [rawSalmon], [], "Fish")
export const fishRawTrout = new FishingSkillRecipe("Fish for Minnow", "Fishing", 15, 75, "Fishing Rod", [], [rawTrout], [], "Fish")

export class MiningSkillRecipe extends GatheringSkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string = "Fish") {
        super(name, skill, levelReq, xp, tool, input, output, failureOutput, verb)
    }
}
export const mineCopperOre = new MiningSkillRecipe("Mine Copper Ore", "Mining", 1, 5, "Pickaxe", [], [copperOre], [], "Mine")
export const mineIronOre = new MiningSkillRecipe("Mine Iron Ore", "Mining", 5, 25, "Pickaxe", [], [ironOre], [], "Mine")
export const mineTinOre = new MiningSkillRecipe("Mine Tin Ore", "Mining", 1, 5, "Pickaxe", [], [tinOre], [], "Mine")

export class WoodcuttingSkillRecipe extends GatheringSkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string = "Fish") {
        super(name, skill, levelReq, xp, tool, input, output, failureOutput, verb)
    }
}
export const chopWoodLogs = new FishingSkillRecipe("Chop Tree", "Woodcutting", 1, 5, "Hatchet", [], [woodLogs], [], "Chop")