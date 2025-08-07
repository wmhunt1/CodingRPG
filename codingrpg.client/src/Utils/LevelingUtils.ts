import { Character } from "../Models/CharacterModel";

export const levelUpHero = (hero: Character, addGameLog: (message: string) => void): Character => {
    const updatedHero = { ...hero };
    while (updatedHero.currentXP >= updatedHero.maxXP) {
        updatedHero.level += 1;
        updatedHero.maxXP *= 2;
        updatedHero.maxHP += 10;
        updatedHero.maxMP += 10;
        updatedHero.maxSP += 10;
        updatedHero.strength += 2;
        updatedHero.currentHP = updatedHero.maxHP;
        updatedHero.currentMP = updatedHero.maxMP;
        updatedHero.currentSP = updatedHero.maxSP;
        addGameLog(`${updatedHero.name} is now level ${updatedHero.level}!`);
    }
    return updatedHero;
};