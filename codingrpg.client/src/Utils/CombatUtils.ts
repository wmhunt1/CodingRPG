// src/Utils/combatUtils.ts

import { Character, Hero } from "../Models/CharacterModel"; // Assuming CharacterModel is accessible

/**
 * Applies an attack from an attacker to a target.
 * @param attacker The attacking character.
 * @param target The target character.
 * @param addGameLog Function to add messages to the game log.
 * @returns The updated target character.
 */
export const applyAttack = (attacker: Character, target: Character, addGameLog: (message: string) => void): Character => {
    const damage = attacker.mainHand.power;
    const updatedTarget = { ...target, currentHP: target.currentHP - damage };
    addGameLog(`${attacker.name} attacks ${target.name} for ${damage} damage!`);

    if (updatedTarget.currentHP <= 0) {
        addGameLog(`${updatedTarget.name} has been defeated!`);
    }
    return updatedTarget;
};

/**
 * Executes a single round of combat.
 * @param heroes Current state of heroes.
 * @param enemies Current state of enemies.
 * @param addGameLog Function to add messages to the game log.
 * @returns An object containing the updated heroes and enemies.
 */
export const executeCombatRound = (
    heroes: Hero[],
    enemies: Character[],
    addGameLog: (message: string) => void
) => {
    const updatedHeroes = heroes.map((h) => ({ ...h }));
    let updatedEnemies = enemies.map((e) => ({ ...e }));

    // Heroes' Turn
    //Make all heroes gain xp?.
    updatedHeroes.forEach((hero) => {
        if (hero.currentHP <= 0) return;
        const targetEnemy = updatedEnemies.find((enemy) => enemy.currentHP > 0);
        if (targetEnemy) {
            const index = updatedEnemies.findIndex(e => e.name === targetEnemy.name); // Find index to update correctly
            updatedEnemies[index] = applyAttack(hero, targetEnemy, addGameLog);
            if (updatedEnemies[index].currentHP <= 0) {
                hero.currentXP += targetEnemy.currentXP;
                hero.gold += targetEnemy.gold;
            }
        }
    });

    updatedEnemies = updatedEnemies.filter((enemy) => enemy.currentHP > 0);

    // Enemies' Turn
    if (updatedEnemies.some((enemy) => enemy.currentHP > 0)) {
        updatedEnemies.forEach((enemy) => {
            if (enemy.currentHP <= 0) return;
            const targetHero = updatedHeroes.find((hero) => hero.currentHP > 0);
            if (targetHero) {
                const index = updatedHeroes.findIndex(h => h.name === targetHero.name); // Find index to update correctly
                updatedHeroes[index] = applyAttack(enemy, targetHero, addGameLog) as Hero; // Cast back to Hero
            }
        });
    }

    return { updatedHeroes, updatedEnemies };
};