import { addItemToInventory } from "../Utils/InventoryUtils"
import { acceptQuest } from "../Utils/QuestUtils";
import type { Character } from "./CharacterModel";
import { basicFishingRod } from "./ItemModel";
import { fetchRawMinnowQuest1,slayRatQuest1 } from "./QuestModel"
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
            return [
                {
                    id: 1,
                    character: "Old Fisherman",
                    text: `Well, have ye got those minnows yet?`,
                    choices: [
                        {
                            text: "Aye, I got 'em.",
                            nextId: 2,
                            // The action now accepts 'hero' as an argument.
                            action: () => {
                                checkQuestProgress(hero, hero.journal, existingQuest, addGameLog)
                            },

                        },
                        { text: "Not yet, still lookin'.", nextId: 3 }
                    ],
                    condition: { questId: "fetchRawMinnowQuest1", status: "In-Progress" }
                },
                {
                    id: 2,
                    character: "Old Fisherman",
                    text: `Much obliged, that'll do for a good day's catch.`,
                    choices: [],
                    condition: { questId: "fetchRawMinnowQuest1", status: "In-Progress" }
                },
                {
                    id: 3,
                    character: "Old Fisherman",
                    text: `Don't dilly-dally. The tide won't wait for ye!`,
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
                    text: `A life by the water's a good one, full of patience and the promise o' a good haul.`,
                    choices: [

                    ],
                    condition: { questId: "fetchRawMinnowQuest1", status: "Not-Started" }
                }
            ];
        }
    }
    else {
        return [
            {
                id: 1,
                character: "Old Fisherman",
                text: `Howdy, youngster. Lookin' for a purpose, are ye? I've got an extra rod if ye need one to get yer hands wet.`,
                choices: [
                    {
                        text: "Yes, I'll help.",
                        nextId: 2,
                        // The action now accepts 'hero' as an argument.
                        action: () => {
                            const existingItem = hero.inventory.find(item => item.subType === "Fishing Rod");
                            if (!existingItem) {
                                addItemToInventory(hero.inventory, basicFishingRod, 1)
                            }
                        },

                    },
                    { text: "No, thank you.", nextId: 3 }
                ],
                condition: { questId: "fetchRawMinnowQuest1", status: "Not-Started" }
            },
            {
                id: 2,
                character: "Old Fisherman",
                text: `Bait's runnin' low, and I can't catch the big ones without it. Would ye mind fetchin' me 5 minnows?`,
                choices: [
                    {
                        text: "Aye, consider it done.",
                        nextId: 4,
                        action: () => acceptQuest(hero, hero.journal, fetchRawMinnowQuest1, addGameLog)
                    },
                    { text: "No, I'm busy.", nextId: 5 }
                ],
                condition: { questId: "fetchRawMinnowQuest1", status: "Not-Started" }
            },
            {
                id: 3,
                character: "Old Fisherman",
                text: `Fair winds to ye, then.`,
                choices: [],
                condition: { questId: "fetchRawMinnowQuest1", status: "Not-Started" }
            },
            {
                id: 4,
                character: "Old Fisherman",
                text: `Much obliged, youngster. Now get to it!`,
                choices: [],
                //condition: { questId: "fetchRawMinnowQuest1", status: "" }
            },
            {
                id: 5,
                character: "Old Fisherman",
                text: `Ah well, ye can't catch 'em all.`,
                choices: [],
                //condition: { questId: "fetchRawMinnowQuest1", status: "Not-Started" }
            },
            {
                id: 6,
                character: "Old Fisherman",
                text: `Well, have ye got those minnows yet?`,
                choices: [],
                condition: { questId: "fetchRawMinnowQuest1", status: "In-Progress" }
            },
            //
        ];
    }
};
export const getSlayRatQuest1Dialogue = (hero: Character, addGameLog: (message: string) => void): DialogueNode[] => {
    const existingQuest = hero.journal.find(quest => quest.id === "slayRatQuest1");
    if (existingQuest) {
        if (existingQuest.status === "In-Progress") {
            return [
                {
                    id: 1,
                    character: "Innkeeper",
                    text: `Any luck with my little problem yet?`,
                    choices: [
                        {
                            text: "Yes, the cellar is clear.",
                            nextId: 2,
                            // The action now accepts 'hero' as an argument.
                            action: () => {
                                checkQuestProgress(hero, hero.journal, existingQuest, addGameLog)
                            },

                        },
                        { text: "Not yet, I'm still working on it.", nextId: 3 }
                    ],
                    condition: { questId: "slayRatQuest1", status: "In-Progress" }
                },
                {
                    id: 2,
                    character: "Innkeeper",
                    text: `Oh, thank the gods! My barrels are safe. Here's your reward, hero.`,
                    choices: [],
                    condition: { questId: "slayRatQuest1", status: "In-Progress" }
                },
                {
                    id: 3,
                    character: "Innkeeper",
                    text: `Well, hurry back down there! I can't have my vintage ale spoiled by those vermin!`,
                    choices: [],
                    condition: { questId: "slayRatQuest1", status: "In-Progress" }
                }
                //
            ];
        }
        else {
            return [
                {
                    id: 1,
                    character: "Innkeeper",
                    text: `It's a tough life, runnin' a tavern. You're always either cleanin' or cookin'.`,
                    choices: [

                    ],
                    condition: { questId: "slayRatQuest1", status: "Not-Started" }
                }
            ];
        }
    }
    else {
        return [
            {
                id: 1,
                character: "Innkeeper",
                text: `Hmph. You look like you can handle yourself. I've got a bit of a problem in my cellar.`,
                choices: [
                    {
                        text: "What's the problem?",
                        nextId: 2,
                        // The action now accepts 'hero' as an argument.
                        action: () => {
                            // The Innkeeper doesn't give an item on accepting the quest.
                        },

                    },
                    { text: "I'm not interested.", nextId: 3 }
                ],
                condition: { questId: "slayRatQuest1", status: "Not-Started" }
            },
            {
                id: 2,
                character: "Innkeeper",
                text: `My cellar's been overrun with rats, chewing through all my finest barrels! I need you to get rid of at least five of 'em.`,
                choices: [
                    {
                        text: "I'll take care of it.",
                        nextId: 4,
                        action: () => acceptQuest(hero, hero.journal, slayRatQuest1, addGameLog)
                    },
                    { text: "I'm not a pest control expert.", nextId: 5 }
                ],
                condition: { questId: "slayRatQuest1", status: "Not-Started" }
            },
            {
                id: 3,
                character: "Innkeeper",
                text: `Suit yourself, I suppose.`,
                choices: [],
                condition: { questId: "slayRatQuest1", status: "Not-Started" }
            },
            {
                id: 4,
                character: "Innkeeper",
                text: `Right, then. The cellar door is just out back. Try not to spill anything.`,
                choices: [],
                //condition: { questId: "slayRatQuest1", status: "" }
            },
            {
                id: 5,
                character: "Innkeeper",
                text: `Ah well, I'll find someone else, I guess.`,
                choices: [],
                //condition: { questId: "slayRatQuest1", status: "Not-Started" }
            },
            {
                id: 6,
                character: "Innkeeper",
                text: `Any luck with my little problem yet?`,
                choices: [],
                condition: { questId: "slayRatQuest1", status: "In-Progress" }
            },
            //
        ];
    }
};
