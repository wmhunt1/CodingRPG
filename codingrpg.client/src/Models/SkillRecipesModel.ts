import { burntFish, cookedMinnow, Item, rawMinnow} from "./ItemModel"
export class SkillRecipe {
    name: string;
    //skill: string;
    //levelReq
    //xp
    tool: string;
    input: Item[];
    output: Item[];
    failureOutput: Item[];
    verb: string;
    constructor(name: string,tool:string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
        this.name = name
        this.tool = tool;
        this.input = input;
        this.output = output;
        this.failureOutput = failureOutput;
        this.verb = verb;
    }
}
export class CraftingSkillRecipe extends SkillRecipe {
    constructor(name: string,tool:string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
        super(name,tool, input, output, failureOutput, verb)
    }
}
export class CookingSkillRecipe extends CraftingSkillRecipe {
    constructor(name: string, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
        super(name, tool,input, output, failureOutput, verb)
    }
}
export const cookRawMinow = new CookingSkillRecipe("Cook Minnow","N/A", [rawMinnow], [cookedMinnow], [burntFish], "Cook")
export class GatheringSkillRecipe extends SkillRecipe {
    constructor(name: string, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string) {
        super(name,tool, input, output, failureOutput, verb)
    }
}
export class FishingSkillRecipe extends GatheringSkillRecipe {
    constructor(name: string, tool: string, input: Item[], output: Item[], failureOutput: Item[], verb: string = "Fish") {
        super(name,tool, input, output, failureOutput, verb)
    }
}
export const fishRawMinnow = new FishingSkillRecipe("Fish for Minnow","Fishing Rod", [], [rawMinnow], [], "Fish")