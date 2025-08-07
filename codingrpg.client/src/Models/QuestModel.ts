import { beer, Item } from "./ItemModel"

export const questStatuses = ["Not Started", "In-Progress", "Completeds", "Failed"]
export class Quest {
    id: string;
    name: string;
    status: string;
    type: string;
    description: string;
    objective: string;
    target: number;
    targetProgress: number
    xpReward: number;
    goldReward: number;
    itemReward: Item[]
    constructor(id: string, name: string, status: string, type: string, description: string, objective: string, target: number, targetProgress: number, xpReward: number, goldReward: number, itemReward: Item[]) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.type = type;
        this.description = description;
        this.objective = objective;
        this.target = target;
        this.targetProgress = targetProgress;
        this.xpReward = xpReward;
        this.goldReward = goldReward;
        this.itemReward = itemReward;
    }
}
export class SlayerQuest extends Quest {
    constructor(id: string, name: string, status: string, type: string = "Slay", description: string, objective: string, target: number, targetProgress: number, xpReward: number, goldReward: number, itemReward: Item[]) {
        super(id, name, status, type, description, objective, target, targetProgress, xpReward, goldReward, itemReward)
    }
}
export const slayRatQuest1 = new SlayerQuest("slayRatQuest1", "Rat Extermination", "Not Started", "Slay", "Exterminate the rats in the inn's cellar", "Rat", 3, 0, 50, 10, [beer])