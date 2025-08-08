// src/Utils/combatOutcomeUtils.ts
import { Character, Hero } from "../Models/CharacterModel";
import { addItemToInventory } from "./InventoryUtils"
import { levelUpHero } from "./LevelingUtils";

export const checkCombatOutcome = (
    heroes: Hero[],
    enemies: Character[],
    originalEnemies: Character[],
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
            if (heroes.length > 0) {
                const firstHero = heroes[0];
                // Add all enemy inventories to the first hero's inventory
                heroes.forEach(hero => {
                    originalEnemies.forEach(enemy => {
                        hero.currentXP += Math.floor(enemy.currentXP / heroes.length)
                    });
                })
                originalEnemies.forEach(enemy => {
                    firstHero.gold += enemy.gold;
                    if (enemy.inventory && enemy.inventory.length > 0) {
                        enemy.inventory.forEach(item => {
                            addItemToInventory(firstHero.inventory, item, item.quantity)
                            addGameLog(`${enemy.name} drops ${item.name}`); // Assuming item has a 'name' property
                        });
                    }
                });
            }
            const finalHeroes = heroes.map((hero) => levelUpHero(hero, addGameLog));

            onCombatEnd("victory", finalHeroes);
            return { combatOngoing: false, finalHeroes }; // Return finalHeroes on victory
        }
        return { combatOngoing: false, finalHeroes: heroes }; // Return heroes as is on defeat
    }
    return { combatOngoing: true, finalHeroes: heroes }; // Combat still ongoing
};