import { addItemToInventory } from "../Utils/InventoryUtils"
import { acceptQuest } from "../Utils/QuestUtils";
import type { Character } from "./CharacterModel";
import { basicFishingRod } from "./ItemModel";
import { fetchRawMinnowQuest1 } from "./QuestModel"
import { checkQuestProgress } from "../Utils/QuestUtils"
export interface Choice {
    text: string;
    nextId: number;
    action?: () => void;
    // Add an optional 'condition' property to each choice
    condition?: {
        questId: string;
        status: "Completed" | "In-Progress" | "Not-Started" | "Failed";
    };
}

export interface DialogueNode {
    hero?: Character
    id: number;
    character: string;
    text: string;
    choices: Choice[];
    quest?: string;
    condition?: {
        questId: string;
        status: "Completed" | "In-Progress" | "Not-Started" | "Failed";
    };
}
export const getRawMinnowQuest1Dialogue = (hero: Character, addGameLog: (message: string) => void): DialogueNode[] => {
    const existingQuest = hero.journal.find(quest => quest.id === "fetchRawMinnowQuest1");
    if (existingQuest) {
        if (existingQuest.status === "In-Progress") {
            console.log(existingQuest.status)
            return [
                {
                    id: 1,
                    character: "Old Fisherman",
                    text: `Did you get those minnows?`,
                    choices: [
                        {
                            text: "Yes",
                            nextId: 2,
                            // The action now accepts 'hero' as an argument.
                            action: () => {
                                checkQuestProgress(hero, hero.journal, existingQuest, addGameLog)
                            },

                        },
                        { text: "No", nextId: 3 }
                    ],
                    condition: { questId: "fetchRawMinnowQuest1", status: "In-Progress" }
                },
                {
                    id: 2,
                    character: "Old Fisherman",
                    text: `Thanks`,
                    choices: [],
                    condition: { questId: "fetchRawMinnowQuest1", status: "In-Progress" }
                },
                {
                    id: 3,
                    character: "Old Fisherman",
                    text: `Keep going`,
                    choices: [],
                    condition: { questId: "fetchRawMinnowQuest1", status: "In-Progress" }
                }
                //
            ];
        }
        else {
            return [
                {
                    id: 1,
                    character: "Old Fisherman",
                    text: `Fishing is a rewarding Profession`,
                    choices: [

                    ],
                    condition: { questId: "fetchRawMinnowQuest1", status: "Not-Started" }
                }
            ];
        }
    }
    else {
        console.log("Doesn't have quest")
        return [
            {
                id: 1,
                character: "Old Fisherman",
                text: `Hello, youngster. Care to help do some fishing? I have an extra rod if you don't have one.'`,
                choices: [
                    {
                        text: "Yes",
                        nextId: 2,
                        // The action now accepts 'hero' as an argument.
                        action: () => {
                            const existingItem = hero.inventory.find(item => item.subType === "Fishing Rod");
                            if (!existingItem) {
                                addItemToInventory(hero.inventory, basicFishingRod, 1)
                            }
                        },

                    },
                    { text: "No", nextId: 3 }
                ],
                condition: { questId: "fetchRawMinnowQuest1", status: "Not-Started" }
            },
            {
                id: 2,
                character: "Old Fisherman",
                text: `I'm running low on bait would you mind catching 5 minnows for me?'`,
                choices: [
                    {
                        text: "Yes",
                        nextId: 4,
                        action: () => acceptQuest(hero, hero.journal, fetchRawMinnowQuest1, addGameLog)
                    },
                    { text: "No", nextId: 5 }
                ],
                condition: { questId: "fetchRawMinnowQuest1", status: "Not-Started" }
            },
            {
                id: 3,
                character: "Old Fisherman",
                text: `Maybe another time`,
                choices: [],
                condition: { questId: "fetchRawMinnowQuest1", status: "Not-Started" }
            },
            {
                id: 4,
                character: "Old Fisherman",
                text: `Thanks, youngster`,
                choices: [],
                //condition: { questId: "fetchRawMinnowQuest1", status: "" }
            },
            {
                id: 5,
                character: "Old Fisherman",
                text: `Oh well`,
                choices: [],
                //condition: { questId: "fetchRawMinnowQuest1", status: "Not-Started" }
            },
            {
                id: 6,
                character: "Old Fisherman",
                text: `Did you get those minnows?`,
                choices: [],
                condition: { questId: "fetchRawMinnowQuest1", status: "In-Progress" }
            },
            //
        ];
    }


};