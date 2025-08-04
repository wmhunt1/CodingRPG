// src/Utils/combatOutcomeUtils.ts

import { Character, Hero } from "../Models/CharacterModel";

export const levelUpHero = (hero: Hero, addGameLog: (message: string) => void): Hero => {
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

export const checkCombatOutcome = (
    heroes: Hero[],
    enemies: Character[],
    onCombatEnd: (result: "victory" | "defeat" | "run" | "exit", heroesUpdated: Hero[]) => void,
    addGameLog: (message: string) => void
) => {
    const allEnemiesDefeated = enemies.every((enemy) => enemy.currentHP <= 0);
    const allHeroesDefeated = heroes.every((hero) => hero.currentHP <= 0);
    if (allHeroesDefeated || allEnemiesDefeated) {
        if (allHeroesDefeated) {
            addGameLog(`All heroes are defeated! You have lost!`);
            onCombatEnd("defeat", heroes);
        } else {
            addGameLog(`All enemies are defeated! Heroes are victorious!`);
            const finalHeroes = heroes.map((hero) => levelUpHero(hero, addGameLog));

            onCombatEnd("victory", finalHeroes);
            return { combatOngoing: false, finalHeroes }; // Return finalHeroes on victory
        }
        return { combatOngoing: false, finalHeroes: heroes }; // Return heroes as is on defeat
    }
    return { combatOngoing: true, finalHeroes: heroes }; // Combat still ongoing
};