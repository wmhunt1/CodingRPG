import { burntFish, cookedMinnow, Item, rawMinnow} from "./ItemModel"
export class SkillRecipe {
    name: string;
    skill: string;
    levelReq: number;
    xp:number
    tool: string;
    input: Item[];
    output: Item[];
    failureOutput: Item[];
    verb: string;
    constructor(name: string, skill: string, levelReq:number,xp:number,tool:string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
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
    constructor(name: string, skill: string, levelReq: number, xp:number,tool:string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
        super(name,skill,levelReq,xp,tool, input, output, failureOutput, verb)
    }
}
export class CookingSkillRecipe extends CraftingSkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
        super(name,skill,levelReq,xp, tool,input, output, failureOutput, verb)
    }
}
export const cookRawMinow = new CookingSkillRecipe("Cook Minnow","Cooking",1,5,"N/A", [rawMinnow], [cookedMinnow], [burntFish], "Cook")
export class GatheringSkillRecipe extends SkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp:number,tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
        super(name,skill,levelReq,xp,tool, input, output, failureOutput, verb)
    }
}
export class FishingSkillRecipe extends GatheringSkillRecipe {
    constructor(name: string, skill: string, levelReq: number, xp: number, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string = "Fish") {
        super(name,skill,levelReq,xp,tool, input, output, failureOutput, verb)
    }
}
export const fishRawMinnow = new FishingSkillRecipe("Fish for Minnow","Fishing",1,5,"Fishing Rod", [], [rawMinnow], [], "Fish")