import { Character } from "../Models/CharacterModel";
import { Skill } from "../Models/SkillModel"

export const addSkillXP = (hero: Character, skill: string, xp: number, addGameLog: (message: string) => void): Character => {
    // 1. Create a shallow copy of the hero object.
    const updatedHero = { ...hero }

    // 2. Find the skill object within the new copy.
    // This finds the *reference* to the skill object inside the array.
    const updatedSkill: Skill | undefined = updatedHero.skillBook.find((s => skill === s.name));

    if (updatedSkill) {
        addGameLog(`${updatedHero.name} earns ${skill} ${xp} XP`);

        // 3. Update the skill object's currentXP.
        // Because 'updatedSkill' is a reference to the object in 'updatedHero.skillBook',
        // this change is made directly to the skill object inside the new hero copy.
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