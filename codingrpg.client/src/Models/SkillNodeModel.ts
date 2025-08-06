import {cookRawMinow, fishRawMinnow, SkillRecipe } from "./SkillRecipesModel"
export class SkillNodeModel {
    name: string;
    recipes: SkillRecipe[];
    //skill
    //level
    constructor(name: string, recipes: SkillRecipe[]) {
        this.name = name
        this.recipes = recipes;
    }
}
export class CraftingSkillNode extends SkillNodeModel {

    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}
export class CookingSKillNode extends CraftingSkillNode {

    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}
export class CookingRange extends CookingSKillNode {
    constructor() {
        const name = "Range";
        const recipes:SkillRecipe[] = [cookRawMinow]
        super(name,recipes)
    }
}
export class GatheringSKillNode extends SkillNodeModel {

    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
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
        const recipes: SkillRecipe[] = [fishRawMinnow]
        super(recipes)
    }
}