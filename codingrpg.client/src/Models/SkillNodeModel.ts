import { bakeBread, churnButter, cookRawMinow, fetchWater, fishRawMinnow, harvestWheat, milkCow, millWheatFlour, SkillRecipe } from "./SkillRecipesModel"
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
export class ButterChurn extends CookingSKillNode {
    constructor() {
        const name = "Butter";
        const recipes: SkillRecipe[] = [churnButter]
        super(name, recipes)
    }
}
export class CookingRange extends CookingSKillNode {
    constructor() {
        const name = "Range";
        const recipes: SkillRecipe[] = [bakeBread, cookRawMinow]
        super(name, recipes)
    }
}
export class Mill extends CookingSKillNode {
    constructor() {
        const name = "Mill";
        const recipes: SkillRecipe[] = [millWheatFlour]
        super(name, recipes)
    }
}
export class WaterSourceNode extends CookingSKillNode {
    constructor(name: string) {
        const recipes: SkillRecipe[] = [fetchWater]
        super(name, recipes)
    }
}
export class RiverWater extends WaterSourceNode {
    constructor() {
        const name = "River Water";
        super(name)
    }
}
export class Well extends WaterSourceNode {
    constructor() {
        const name = "Well";
        super(name)
    }
}
export class GatheringSKillNode extends SkillNodeModel {

    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}
export class FarmingSkillNode extends GatheringSKillNode {
    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}
export class FarmPlot extends FarmingSkillNode {
    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}
export class WheatField extends FarmPlot {
    constructor() {
        const name = "Wheat Field"
        const recipes: SkillRecipe[] = [harvestWheat]
        super(name, recipes)
    }
}
export class LiveStock extends FarmingSkillNode {
    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}
export class DairyCow extends LiveStock {
    constructor() {
        const name = "Dairy Cow"
        const recipes: SkillRecipe[] = [milkCow]
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
export class MiningSite extends GatheringSKillNode {
    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}
export class OreVein extends MiningSite {
    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}