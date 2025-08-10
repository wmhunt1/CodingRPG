// DialogueManager.ts
import type { DialogueNode } from "./DialogueNodeModel"; // Assuming your Dialogue interfaces are in a DialogueModel file
import { QuestManager } from "./QuestManager";

export class DialogueManager {
    private dialogueData: DialogueNode[];
    private questManager: QuestManager;

    constructor(data: DialogueNode[], questManager: QuestManager) {
        this.dialogueData = data;
        this.questManager = questManager;
    }

    public findNode(id: number): DialogueNode | undefined {
        const node = this.dialogueData.find(n => n.id === id);

        if (node) {
            // Filter the choices based on quest status
            const filteredChoices = node.choices.filter(choice => {
                // If a choice has no condition, it's always available
                if (!choice.condition) {
                    return true;
                }

                // Get the current quest status
                const currentStatus = this.questManager.getQuestStatus(choice.condition.questId);

                // Return true only if the quest status matches the condition
                return currentStatus === choice.condition.status;
            });

            // Return a new DialogueNode with the filtered choices
            return { ...node, choices: filteredChoices };
        }

        return undefined;
    }
}