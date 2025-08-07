import { Character } from "../Models/CharacterModel";

export const levelUpHero = (hero: Character, addGameLog: (message: string) => void): Character => {
    const updatedHero = { ...hero };
    while (updatedHero.currentXP >= updatedHero.maxXP) {
        updatedHero.level += 1;
        updatedHero.currentXP -= updatedHero.maxXP;
        updatedHero.maxXP *= 2;
        updatedHero.maxHP += 10;
        updatedHero.currentHP = Math.min(updatedHero.currentHP + 10, updatedHero.maxHP);
        addGameLog(`${updatedHero.name} is now level ${updatedHero.level}!`);
    }
    return updatedHero;
};