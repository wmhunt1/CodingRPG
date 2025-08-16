import { Character } from "../Models/CharacterModel";
import { Skill } from "../Models/SkillModel"

export const addSkillXP = (hero: Character, skill: string, xp: number, addGameLog: (message: string) => void): Character => {
    // 1. Create a shallow copy of the hero object.
    const updatedHero = { ...hero }

    const updatedSkill: Skill | undefined = updatedHero.skillBook.find((s => skill === s.name));

    if (updatedSkill) {
        addGameLog(`${updatedHero.name} earns ${skill} ${xp} XP`);

        updatedSkill.currentXP += xp;

        console.log(updatedSkill.currentXP)
        levelUpSkill(updatedHero, updatedSkill, addGameLog)
    }

    // 4. Return the complete, updated hero object.
    return updatedHero;
}
export const levelUpSkill = (hero: Character, skill: Skill, addGameLog: (message: string) => void): Character => {
    const updatedHero = { ...hero };
    while (skill.currentXP >= skill.maxXP) {
        skill.level += 1;
        skill.maxXP *= 2;
        addGameLog(`${updatedHero.name}'s ${skill.name} is now level ${skill.level}!`);
    }
    return updatedHero;
};