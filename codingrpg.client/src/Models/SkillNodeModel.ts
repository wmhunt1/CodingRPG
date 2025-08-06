import {rawMinnowSkillRecipe, SkillRecipe} from "./SkillRecipesModel"
export class SkillNodeModel {
    name: string;
    recipes: SkillRecipe[];
    //skill
    //level
    constructor(name: string,recipes: SkillRecipe[]) {
        this.name = name
        this.recipes = recipes;
    }
}
export class GatheringSKillNode extends SkillNodeModel {
   
    constructor(name: string, recipes: SkillRecipe[]) {
        super(name,recipes)
    }
}
export class FishingSpot extends GatheringSKillNode {
    constructor(recipes: SkillRecipe[]) {
        const name = "Fishing Spot"
        super(name, recipes)
    }
}
export class MinnowFishingSpot extends FishingSpot {
    constructor() {
        const recipes: SkillRecipe[] = [rawMinnowSkillRecipe]
        super(recipes)
    }
}