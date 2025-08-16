import { Character } from "../Models/CharacterModel";

export const levelUpHero = (hero: Character, addGameLog: (message: string) => void): Character => {
    const updatedHero = { ...hero };
    while (updatedHero.currentXP >= updatedHero.maxXP) {
        updatedHero.level += 1;
        updatedHero.maxXP *= 2;
        updatedHero.maxHP += updatedHero.constitution;
        updatedHero.maxMP += updatedHero.intelligence;
        updatedHero.maxSP += updatedHero.endurance;
        updatedHero.agility += 2;
        updatedHero.constitution += 2;
        updatedHero.dexterity += 2;
        updatedHero.endurance += 2;
        updatedHero.strength += 2;
        updatedHero.intelligence += 2;
        updatedHero.perception += 2;
        updatedHero.willpower += 2;
        updatedHero.wisdom += 2;
        updatedHero.attractiveness += 2;
        updatedHero.charisma += 2;
        updatedHero.personality += 2;
        updatedHero.luck += 2;
        updatedHero.currentHP = updatedHero.maxHP;
        updatedHero.currentMP = updatedHero.maxMP;
        updatedHero.currentSP = updatedHero.maxSP;
        addGameLog(`${updatedHero.name} is now level ${updatedHero.level}!`);
    }
    return updatedHero;
};