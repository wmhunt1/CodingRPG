
export const QuestState = {
    NotStarted: "NotStarted",
    InProgress: "InProgress",
    Completed: "Completed",
    Failed: "Failed",
} as const;

/**
 * A type alias for the values of the QuestState object.
 * This allows us to use QuestState as a type for improved type safety.
 */
export type QuestState = typeof QuestState[keyof typeof QuestState];
export interface QuestObjective {
    /** A unique identifier for the objective within the quest. */
    id: string;
    /** A human-readable description of the objective. */
    description: string;
    /** The current completion status of the objective. */
    isCompleted: boolean;
}

/**
 * An interface for the rewards received upon completing a quest.
 * This can be customized to include various types of rewards like items, currency, or experience points.
 */
export interface QuestRewards {
    /** The amount of experience points gained. */
    experience?: number;
    /** The amount of gold or other currency gained. */
    gold?: number;
    /** An array of item IDs or objects received as a reward. */
    items?: string[];
}

/**
 * The main interface for a Quest. This defines the structure of a quest object.
 * It's designed to be a data-centric model that can be easily serialized and stored.
 */
export interface Quest {
    /** A unique identifier for the quest. */
    id: string;
    /** The title of the quest. */
    title: string;
    /** A detailed description of the quest. */
    description: string;
    /** The current state of the quest. */
    state: QuestState;
    /** An array of objectives that need to be completed. */
    objectives: QuestObjective[];
    /** The rewards for completing the quest. */
    rewards: QuestRewards;
    /** An optional array of quest IDs that must be completed before this one can be started. */
    prerequisites?: string[];
}

/**
 * A class that encapsulates the logic for managing a quest.
 * This is where you would put methods to interact with the quest data.
 */
export class QuestManager {
    private quests: Quest[];

    constructor(initialQuests: Quest[] = []) {
        this.quests = initialQuests;
    }

    /**
     * Finds a quest by its ID.
     * @param questId The ID of the quest to find.
     * @returns The quest object, or undefined if not found.
     */
    public getQuestById(questId: string): Quest | undefined {
        return this.quests.find(q => q.id === questId);
    }

    /**
     * Starts a quest, setting its state to InProgress.
     * @param questId The ID of the quest to start.
     */
    public startQuest(questId: string): void {
        const quest = this.getQuestById(questId);
        if (quest && quest.state === QuestState.NotStarted) {
            // Check for prerequisites before starting
            const prerequisitesMet = quest.prerequisites ?
                quest.prerequisites.every(prereqId => {
                    const prereqQuest = this.getQuestById(prereqId);
                    return prereqQuest && prereqQuest.state === QuestState.Completed;
                }) : true;

            if (prerequisitesMet) {
                quest.state = QuestState.InProgress;
                console.log(`Quest "${quest.title}" has started!`);
            } else {
                console.log(`Cannot start quest "${quest.title}". Prerequisites not met.`);
            }
        } else {
            console.log(`Quest with ID "${questId}" not found or already started.`);
        }
    }

    /**
     * Marks a specific objective as completed.
     * @param questId The ID of the quest.
     * @param objectiveId The ID of the objective to complete.
     */
    public completeObjective(questId: string, objectiveId: string): void {
        const quest = this.getQuestById(questId);
        if (quest && quest.state === QuestState.InProgress) {
            const objective = quest.objectives.find(obj => obj.id === objectiveId);
            if (objective && !objective.isCompleted) {
                objective.isCompleted = true;
                console.log(`Objective "${objective.description}" completed!`);
                this.checkQuestCompletion(quest);
            }
        }
    }

    /**
     * Checks if all objectives of a quest are completed and updates the quest state.
     * @param quest The quest object to check.
     */
    private checkQuestCompletion(quest: Quest): void {
        const allObjectivesCompleted = quest.objectives.every(obj => obj.isCompleted);
        if (allObjectivesCompleted) {
            quest.state = QuestState.Completed;
            console.log(`Quest "${quest.title}" has been completed!`);
            // You could trigger a reward function here
            // this.awardRewards(quest);
        }
    }

    /**
     * A hypothetical method to award the quest rewards to the player.
     * This would interact with your player inventory, stats, etc.
     * @param quest The quest object to award rewards for.
     */
    //private awardRewards(quest: Quest): void {
    //    console.log(`Awarding rewards for quest "${quest.title}"...`);
    //    // Example: add experience, gold, items to a player object
    //    // player.addExperience(quest.rewards.experience);
    //    // player.addGold(quest.rewards.gold);
    //    // player.addItem(quest.rewards.items);
    //}
}
export const killTheRatsQuest: Quest = {
    id: "rat-extermination-1",
    title: "Exterminate the Rats",
    description: "The village cellar has been overrun by rats! Slay three of them to make the village safe again.",
    state: QuestState.NotStarted,
    objectives: [
        {
            id: "slay-rats",
            description: "Slay 3 Rats.",
            isCompleted: false,
        },
    ],
    rewards: {
        experience: 25,
        gold: 5,
    },
};

