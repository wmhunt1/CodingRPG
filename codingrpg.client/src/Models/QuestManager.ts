import { Quest, fetchRawMinnowQuest1, slayRatQuest1 } from "./QuestModel";
export class QuestManager {
    // A map to store quest objects, using the quest's ID as the key
    private quests: Map<string, Quest>;

    constructor() {
        this.quests = new Map();
        // Initialize with your quests
        this.quests.set(fetchRawMinnowQuest1.id, fetchRawMinnowQuest1);
        this.quests.set(slayRatQuest1.id, slayRatQuest1);
    }

    public getQuestStatus(questId: string): string | undefined {
        const quest = this.quests.get(questId);
        return quest ? quest.status : undefined;
    }

    // You'll need a way to update quest statuses as the player progresses
    public setQuestStatus(questId: string, newStatus: "Completed" | "In-Progress" | "Not-Started" | "Failed"): void {
        const quest = this.quests.get(questId);
        if (quest) {
            quest.status = newStatus;
        }
    }
}