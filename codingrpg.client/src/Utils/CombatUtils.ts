import { Character, Hero } from "../Models/CharacterModel"; // Assuming CharacterModel is accessible
import { updateQuestProgress } from "./QuestUtils"

/**
 * Applies an attack from an attacker to a target.
 * Now includes a chance for the attack to miss.
 * @param attacker The attacking character.
 * @param target The target character.
 * @param addGameLog Function to add messages to the game log.
 * @returns The updated target character.
 */

export const applyAttack = (hero: Character, attacker: Character, target: Character, addGameLog: (message: string) => void): Character => {
    // Define the base hit chance as a decimal (e.g., 85% chance to hit)
    // This could be a stat on the character object in the future.
    const hitChance = 0.85;
    const hitRoll = Math.random();

    if (hitRoll <= hitChance) {
        // The attack is a hit
        const totalProtection = Math.floor((target.head.protection + target.shoulders.protection + target.chest.protection + target.hands.protection + target.wrists.protection + target.waist.protection + target.legs.protection + target.feet.protection) / 8)
        const strengthBonus = Math.floor(attacker.strength / 10);
        const totalAttack = attacker.mainHand.power + strengthBonus;
        let damage = totalAttack - totalProtection;
        if (damage < 0) { damage = 0 }
        const updatedTarget = { ...target, currentHP: target.currentHP - damage };

        if (damage != 0) {
            addGameLog(`${attacker.name} attacks ${target.name} for ${damage} damage!`);
        }
        else {
            addGameLog(`${attacker.name} attacks ${target.name} but does no damage!`);
        }

        if (updatedTarget.currentHP <= 0) {
            console.log(`${hero.name} journal update`)
            const existingQuest = hero.journal.find(quest => quest.objective === updatedTarget.name);
            if (existingQuest) {
                updateQuestProgress(hero, hero.journal, existingQuest, addGameLog)
            }
            addGameLog(`${updatedTarget.name} has been defeated!`);
        }
        return updatedTarget;
    } else {
        // The attack is a miss
        addGameLog(`${attacker.name} misses ${target.name}!`);
        // Return the target unchanged since the attack missed
        return target;
    }
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
    // Create new mutable copies of the arrays to work with
    const updatedHeroes = heroes.map((h) => ({ ...h }));
    let updatedEnemies = enemies.map((e) => ({ ...e }));

    // Randomly decide if heroes or enemies go first
    //later make it so speed is a factor
    const heroesGoFirst = Math.random() > 0.5;

    // An array of the two turn functions to execute
    const turns = [
        () => { // Heroes' Turn
            updatedHeroes.forEach((hero) => {
                if (hero.currentHP <= 0) return;
                const targetEnemy = updatedEnemies.find((enemy) => enemy.currentHP > 0);
                if (targetEnemy) {
                    const index = updatedEnemies.findIndex(e => e.name === targetEnemy.name);
                    updatedEnemies[index] = applyAttack(updatedHeroes[0], hero, targetEnemy, addGameLog);
                    if (updatedEnemies[index].currentHP <= 0) {
                        hero.currentXP += targetEnemy.currentXP;
                        hero.gold += targetEnemy.gold;
                    }
                }
            });
            updatedEnemies = updatedEnemies.filter((enemy) => enemy.currentHP > 0);
        },
        () => { // Enemies' Turn
            if (updatedEnemies.some((enemy) => enemy.currentHP > 0)) {
                updatedEnemies.forEach((enemy) => {
                    if (enemy.currentHP <= 0) return;
                    const targetHero = updatedHeroes.find((hero) => hero.currentHP > 0);
                    if (targetHero) {
                        const index = updatedHeroes.findIndex(h => h.name === targetHero.name);
                        updatedHeroes[index] = applyAttack(updatedEnemies[0], enemy, targetHero, addGameLog) as Hero;
                    }
                });
            }
        }
    ];

    // Execute the turns in the determined order
    if (heroesGoFirst) {
        //addGameLog("Heroes move first.");
        turns[0](); // Heroes' turn
        turns[1](); // Enemies' turn
    } else {
        //addGameLog("Enemies ambush the heroes and get to go first!");
        turns[1](); // Enemies' turn
        turns[0](); // Heroes' turn
    }

    return { updatedHeroes, updatedEnemies };
};