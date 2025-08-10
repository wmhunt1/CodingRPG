import { beer, Item } from "./ItemModel"

//export const questStatuses = ["Not Started", "In-Progress", "Completed", "Failed"]

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
//makes sure that conversations only happen once
export class ConversationQuest extends Quest {
    constructor(id: string, name: string, status: string, type: string = "Conversation", description: string, objective: string, target: number, targetProgress: number, xpReward: number, goldReward: number, itemReward: Item[]) {
        super(id, name, status, type, description, objective, target, targetProgress, xpReward, goldReward, itemReward)
    }
}
export class FetchQuest extends Quest {
    constructor(id: string, name: string, status: string, type: string = "Fetch", description: string, objective: string, target: number, targetProgress: number, xpReward: number, goldReward: number, itemReward: Item[]) {
        super(id, name, status, type, description, objective, target, targetProgress, xpReward, goldReward, itemReward)
    }
}
export const fetchRawMinnowQuest1 = new FetchQuest("fetchRawMinnowQuest1", "Fish for Minnows", "Not Started", "Fish", "Bring 5 Raw Minnow(s) to the old fisherman", "Raw Minnow", 5, 0, 50, 10, [])
export class SlayerQuest extends Quest {
    constructor(id: string, name: string, status: string, type: string = "Slay", description: string, objective: string, target: number, targetProgress: number, xpReward: number, goldReward: number, itemReward: Item[]) {
        super(id, name, status, type, description, objective, target, targetProgress, xpReward, goldReward, itemReward)
    }
}
export const slayRatQuest1 = new SlayerQuest("slayRatQuest1", "Rat Extermination", "Not Started", "Slay", "Exterminate the rats in the inn's cellar", "Rat", 3, 0, 50, 10, [beer])