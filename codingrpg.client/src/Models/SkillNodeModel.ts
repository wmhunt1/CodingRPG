import {
    bakeBread,
    bronzeRecipes,
    chopWoodLogs,
    churnButter, cookRawBeef, cookRawMinow, cookRawSalmon, cookRawTrout,
    craftLeatherBelt, craftLeatherBoots, craftLeatherBracers, craftLeatherChest, craftLeatherCowl, craftLeatherGauntlets, craftLeatherLegs, craftLeatherPauldrons,
    fetchWater,
    fishRawMinnow, fishRawSalmon,
    harvestWheat,
    ironRecipes,
    milkCow,
    millWheatFlour,
    pickFlax,
    SkillRecipe,
    smeltBronzeBar, smeltIronBar,
    spinFlax,
    weaveCloak, weavePants, weaveSkirt, weaveTunic,
} from "./SkillRecipesModel"
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
        const name = "Butter Churn";
        const recipes: SkillRecipe[] = [churnButter]
        super(name, recipes)
    }
}
export class CookingRange extends CookingSKillNode {
    constructor() {
        const name = "Cooking Range";
        const recipes: SkillRecipe[] = [bakeBread, cookRawBeef, cookRawMinow, cookRawSalmon, cookRawTrout]
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
export class LeatherworkingSKillNode extends CraftingSkillNode {

    constructor() {
        const name = "Leatherworking"
        const recipes: SkillRecipe[] = [craftLeatherBelt, craftLeatherBoots, craftLeatherBracers, craftLeatherChest, craftLeatherCowl, craftLeatherGauntlets, craftLeatherLegs, craftLeatherPauldrons]
        super(name, recipes)
    }
}
export class SmithingSKillNode extends CraftingSkillNode {

    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}
export class AnvilAndForge extends SmithingSKillNode {
    constructor() {
        const name = "Anvil and Forge";
        const recipes: SkillRecipe[] = [...bronzeRecipes, ...ironRecipes]
        super(name, recipes)
    }
}
export class Smelter extends SmithingSKillNode {
    constructor() {
        const name = "Smelter"
        const recipes: SkillRecipe[] = [smeltBronzeBar, smeltIronBar]
        super(name, recipes)
    }
}
export class TailoringSKillNode extends CraftingSkillNode {

    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}
export class Loom extends TailoringSKillNode {
    constructor() {
        const name = "Loom";
        const recipes: SkillRecipe[] = [weaveCloak, weavePants, weaveSkirt, weaveTunic,]
        super(name, recipes)
    }
}
export class SpinningWheel extends TailoringSKillNode {
    constructor() {
        const name = "Spinning Wheel";
        const recipes: SkillRecipe[] = [spinFlax]
        super(name, recipes)
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
export class FlaxField extends FarmPlot {
    constructor() {
        const name = "Flax Field"
        const recipes: SkillRecipe[] = [pickFlax]
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
    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}
export class MinnowFishingSpot extends FishingSpot {
    constructor() {
        const name = "Minnow Fishing Spot"
        const recipes: SkillRecipe[] = [fishRawMinnow]
        super(name, recipes)
    }
}
export class SalmonFishingSpot extends FishingSpot {
    constructor() {
        const name = "Salmon Fishing Spot"
        const recipes: SkillRecipe[] = [fishRawSalmon]
        super(name, recipes)
    }
}
export class TroutFishingSpot extends FishingSpot {
    constructor() {
        const name = "Trout Fishing Spot"
        const recipes: SkillRecipe[] = [fishRawSalmon]
        super(name, recipes)
    }
}
export class MiningSkillNode extends GatheringSKillNode {
    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}
export class OreVein extends MiningSkillNode {
    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}
export class WoodcuttingSkillNode extends GatheringSKillNode {
    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}
export class Tree extends WoodcuttingSkillNode {
    constructor(name: string, recipes: SkillRecipe[]) {
        super(name, recipes)
    }
}
export class WoodTree extends Tree {
    constructor() {
        const name = "Trees"
        const recipes: SkillRecipe[] = [chopWoodLogs]
        super(name, recipes)
    }
}