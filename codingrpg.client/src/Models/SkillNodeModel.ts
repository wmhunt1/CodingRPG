import { Item,rawMinnow } from "./ItemModel"
export class SkillNodeModel {
    name: string;
    resources: Item[];
    //skill
    //level
    constructor(name: string, resources: Item[]) {
        this.name = name
        this.resources = resources;
    }
}
export class GatheringSKillNode extends SkillNodeModel {
   
    constructor(name: string, resources: Item[]) {
        super(name,resources)
    }
}
export class FishingSpot extends GatheringSKillNode {
    constructor(resources: Item[]) {
        const name = "Fishing Spot"
        super(name, resources)
    }
}
export class MinnowFishingSpot extends FishingSpot {
    constructor() {
        const resources: Item[] = [rawMinnow]
        super(resources)
    }
}
//change to recipes