//import Inventory from "../Components/InventoryComponent"
import { Character } from "../Models/CharacterModel"
import { Quest } from "../Models/QuestModel"
import { addItemToInventory, removeItemFromInventory } from "./InventoryUtils"
import { levelUpHero } from "./LevelingUtils"
//acceptQuest
export const acceptQuest = (character: Character, journal: Quest[], questToAdd: Quest, addGameLog: (message: string) => void): void => {
    const existingQuest = journal.find(quest => quest.name === questToAdd.name);
    if (!existingQuest) {
        questToAdd.status = "In-Progress"
        journal.push(questToAdd)
        addGameLog(`${character.name} accepts Quest: ${questToAdd.name}`)
    }
    else {
        addGameLog(`${character.name} has already accepted Quest: ${questToAdd.name}`)
    }
}
//increaseQuestProgress
export const updateQuestProgress = (character: Character, journal: Quest[], questToUpdate: Quest, addGameLog: (message: string) => void): void => {
    const existingQuest = journal.find(quest => quest.name === questToUpdate.name);
    if (existingQuest) {
        existingQuest.targetProgress++;
        addGameLog(`${character.name} ${questToUpdate.name} (${questToUpdate.targetProgress}/${questToUpdate.target})`)
    }
}
export const checkQuestProgress = (character: Character, journal: Quest[], questToUpdate: Quest, addGameLog: (message: string) => void): void => {
    const existingQuest = journal.find(quest => quest.name === questToUpdate.name);
    if (existingQuest) {
        let questComplete = false;
        if (existingQuest.type == "Slay") {
            if (existingQuest.targetProgress >= existingQuest.target) {
                questComplete = true;
            }
            else {
                addGameLog(`${character.name} has not finished ${questToUpdate.name}. Current Progress: (${questToUpdate.targetProgress}/${questToUpdate.target})`)
            }
        }
        else if (existingQuest.type == "Fetch" || existingQuest.type == "Fish" || existingQuest.type == "Gather") {
            console.log("Not Implemented")
            const existingItem = character.inventory.find(item => item.name === questToUpdate.objective);
            if (!existingItem || existingItem.quantity < questToUpdate.target) {
                addGameLog(`${character.name} does not have enough ${questToUpdate.objective}`)
            }
            else {
                removeItemFromInventory(character.inventory, existingItem, questToUpdate.target)
                addGameLog(`${character.name} hands in ${questToUpdate.objective} X ${questToUpdate.target}`)
                questComplete = true
            }
        }
        else {
            console.log("Default")
        }
        if (questComplete !== false) {
            completeQuest(character, journal, questToUpdate, addGameLog)
        }
    }
}
export const getQuestRewards = (character: Character, quest: Quest, addGameLog: (message: string) => void): Character => {
    character.gold += quest.goldReward
    character.currentXP += quest.xpReward;
    levelUpHero(character, addGameLog)
    if (quest.itemReward.length > 0) {
        addGameLog(`${character.name} recieves the following items`)
        for (let item = 0; item < quest.itemReward.length; item++) {
            addItemToInventory(character.inventory, quest.itemReward[item], quest.itemReward[item].quantity)
        }
    }
    addGameLog(`${character.name} earns ${quest.xpReward} XP and ${quest.goldReward} Gold`)
    return character;
}
//completeQuest
export const completeQuest = (character: Character, journal: Quest[], questToUpdate: Quest, addGameLog: (message: string) => void): void => {
    const existingQuest = journal.find(quest => quest.name === questToUpdate.name);
    if (existingQuest) {
        existingQuest.status = "Completed";
        getQuestRewards(character, questToUpdate, addGameLog)
        addGameLog(`${character.name} has completed ${questToUpdate.name}`)
    }
}