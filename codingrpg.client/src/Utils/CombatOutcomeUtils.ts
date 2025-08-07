// src/Utils/combatOutcomeUtils.ts
import { Character, Hero } from "../Models/CharacterModel";
import { levelUpHero } from "./LevelingUtils";

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