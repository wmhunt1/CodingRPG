export interface Choice {
    text: string;
    nextId: number;
}

export interface DialogueNode {
    id: number;
    character: string;
    text: string;
    choices: Choice[];
}

// A class to manage the dialogue data and provide methods to interact with it.
export class DialogueManager {
    private dialogueData: DialogueNode[];

    constructor(data: DialogueNode[]) {
        this.dialogueData = data;
    }

    public findNode(id: number): DialogueNode | undefined {
        return this.dialogueData.find(node => node.id === id);
    }
}
export const testDialogueData: DialogueNode[] = [
    {
        id: 1,
        character: "Mysterious Stranger",
        text: "Welcome, adventurer. You seem lost.",
        choices: [
            { text: "Who are you?", nextId: 2 },
            { text: "Where am I?", nextId: 3 },
            { text: "I'm not lost, you are!", nextId: 4 },
        ],
    },
    {
        id: 2,
        character: "Mysterious Stranger",
        text: "I am a humble traveler. Now, what brings you to these forgotten lands?",
        choices: [
            { text: "I'm on a quest.", nextId: 5 },
            { text: "Just passing through.", nextId: 6 },
        ],
    },
    {
        id: 3,
        character: "Mysterious Stranger",
        text: "This is the Whispering Glade, a place of ancient magic and forgotten tales. Be careful.",
        choices: [
            { text: "Tell me more about the magic.", nextId: 7 },
            { text: "Okay, thanks for the warning.", nextId: 6 },
        ],
    },
    {
        id: 4,
        character: "Mysterious Stranger",
        text: "A feisty one, I see. Very well, be on your way then. There is nothing for you here.",
        choices: [], // This ends the conversation
    },
    {
        id: 5,
        character: "Mysterious Stranger",
        text: "A quest? Intriguing. What is your goal?",
        choices: [
            { text: "I am searching for the legendary Sunstone.", nextId: 8 },
            { text: "I'd rather not say.", nextId: 9 },
        ],
    },
    {
        id: 6,
        character: "Mysterious Stranger",
        text: "Farewell, then. May your path be clear.",
        choices: [], // This ends the conversation
    },
    {
        id: 7,
        character: "Mysterious Stranger",
        text: "The magic here is tied to the ancient trees. They hold the memories of this world.",
        choices: [
            { text: "Fascinating.", nextId: 6 },
        ],
    },
    {
        id: 8,
        character: "Mysterious Stranger",
        text: "The Sunstone? That is a relic of immense power. It is said to be guarded by a dragon.",
        choices: [
            { text: "A dragon? I'll be careful.", nextId: 6 },
        ],
    },
    {
        id: 9,
        character: "Mysterious Stranger",
        text: "I understand. Some secrets are best kept. Safe travels, friend.",
        choices: [],
    },
];