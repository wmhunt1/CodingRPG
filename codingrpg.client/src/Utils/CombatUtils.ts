
// src/Utils/CombatUtils.ts
import { Character, Hero } from "../Models/CharacterModel"; // Assuming CharacterModel is accessible
import { Item } from "../Models/ItemModel";
import { Spell } from "../Models/SpellModel";
import { addItemToInventory, removeItemFromInventory } from "./InventoryUtils";
import { updateQuestProgress } from "./QuestUtils";

/**
 * Applies a physical attack from an attacker to a target.
 * Calculates damage based on the attacker's strength and weapon power versus the target's protection.
 * @param hero The hero performing the attack (for quest tracking purposes).
 * @param attacker The character performing the attack.
 * @param target The character being attacked.
 * @param addGameLog The function to log combat messages.
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
 * Casts a spell from a hero on a target.
 * @param hero The hero casting the spell.
 * @param target The character being affected by the spell.
 * @param spell The spell being cast.
 * @param addGameLog The function to log combat messages.
 * @returns The updated target character.
 */
export const castSpell = (hero: Character, target: Character, spell: Spell, addGameLog: (message: string) => void): Character => {
    const updatedTarget = { ...target };
    spell.cast(hero, updatedTarget); // Assuming spell.cast modifies the target in place
    if (spell.subType === "Healing") {
        addGameLog(`${hero.name} casts ${spell.name} on ${target.name}, healing ${spell.spellValue} HP`);
    }
    if (spell.subType === "Damaging") {
        addGameLog(`${hero.name} fires a ${spell.name} at ${target.name}, dealing ${spell.spellValue} DMG`);
    }
    // Return the updated target character.
    return updatedTarget;
}

/**
 * Uses an item from a hero on a target.
 * @param hero The hero using the item.
 * @param target The character being affected by the item.
 * @param item The item being used.
 * @param addGameLog The function to log combat messages.
 * @returns The updated target character.
 */
export const useItem = (hero: Character, target: Character, item: Item, addGameLog: (message: string) => void): Character => {
    removeItemFromInventory(hero.inventory, item, 1);
    const updatedTarget = { ...target };
    addItemToInventory(updatedTarget.inventory, item, 1);
    item.use(updatedTarget);
    addGameLog(`${hero.name} uses a ${item.name} on ${target.name}`);
    return updatedTarget;
}

/**
 * Executes a single round of combat, handling turns for heroes and enemies.
 * @param heroes The array of heroes in combat.
 * @param enemies The array of enemies in combat.
 * @param addGameLog The function to log combat messages.
 * @param action The action the first hero will take.
 * @param target The character targeted by the first hero.
 * @param item The item to use, if the action is "Item".
 * @param spell The spell to cast, if the action is "Spell".
 * @returns An object containing the updated arrays of heroes and enemies.
 */
export const executeCombatRound = (
    heroes: Hero[],
    enemies: Character[],
    addGameLog: (message: string) => void,
    action: string,
    target: Character,
    item?: Item,
    spell?: Spell,
) => {
    // Create new mutable copies of the arrays to work with
    const updatedHeroes = heroes.map((h) => ({ ...h }));
    let updatedEnemies = enemies.map((e) => ({ ...e }));

    const heroesGoFirst = Math.random() > 0.5;
    updatedEnemies = updatedEnemies.filter((enemy) => enemy.currentHP > 0);


    const turns = [
        () => { // Heroes' Turn
            if (updatedHeroes.length > 0) {
                const firstHero = updatedHeroes[0];
                if (firstHero.currentHP > 0) {
                    if (action === 'Attack') {
                        const targetEnemy = updatedEnemies.find((enemy) => enemy.name === target.name);
                        if (targetEnemy) {
                            const index = updatedEnemies.findIndex(e => e.name === targetEnemy.name);
                            updatedEnemies[index] = applyAttack(firstHero, firstHero, targetEnemy, addGameLog);
                        }
                    }
                    else if (action === "Item" && item) {
                        // Find the target in either the hero or enemy array
                        const targetAllyIndex = updatedHeroes.findIndex((hero) => hero.name === target.name);
                        const targetEnemyIndex = updatedEnemies.findIndex((enemy) => enemy.name === target.name);

                        if (targetAllyIndex !== -1) {
                            updatedHeroes[targetAllyIndex] = useItem(firstHero, updatedHeroes[targetAllyIndex], item, addGameLog) as Hero;
                        }
                        if (targetEnemyIndex !== -1) {
                            updatedEnemies[targetEnemyIndex] = useItem(firstHero, updatedEnemies[targetEnemyIndex], item, addGameLog);
                        }
                    }
                    else if (action === "Spell" && spell) {
                        // Find the target in either the hero or enemy array
                        const targetAllyIndex = updatedHeroes.findIndex((hero) => hero.name === target.name);
                        const targetEnemyIndex = updatedEnemies.findIndex((enemy) => enemy.name === target.name);

                        if (targetAllyIndex !== -1) {
                            updatedHeroes[targetAllyIndex] = castSpell(firstHero, updatedHeroes[targetAllyIndex], spell, addGameLog) as Hero;
                        }
                        if (targetEnemyIndex !== -1) {
                            updatedEnemies[targetEnemyIndex] = castSpell(firstHero, updatedEnemies[targetEnemyIndex], spell, addGameLog);
                        }
                    }
                    else {
                        console.log("Other action")
                    }
                }
                updatedEnemies = updatedEnemies.filter((enemy) => enemy.currentHP > 0);
                // Handle the rest of the heroes
                for (let i = 1; i < updatedHeroes.length; i++) {
                    const hero = updatedHeroes[i];
                    if (hero.currentHP <= 0) continue;
                    const targetEnemy = updatedEnemies.find((enemy) => enemy.currentHP > 0);
                    if (targetEnemy) {
                        const index = updatedEnemies.findIndex(e => e.name === targetEnemy.name);
                        updatedEnemies[index] = applyAttack(hero, hero, targetEnemy, addGameLog);
                        if (updatedEnemies[index].currentHP <= 0) {
                            hero.currentXP += targetEnemy.currentXP;
                            hero.gold += targetEnemy.gold;
                        }
                    }
                }
            }
            updatedEnemies = updatedEnemies.filter((enemy) => enemy.currentHP > 0);
        },
        () => { // Enemies' Turn
            if (updatedEnemies.some((enemy) => enemy.currentHP > 0)) {
                updatedEnemies.forEach((enemy) => {
                    if (enemy.currentHP <= 0) return;

                    // Filter for heroes that are still alive
                    const aliveHeroes = updatedHeroes.filter(hero => hero.currentHP > 0);

                    // If there are any heroes left, choose a random one as the target
                    if (aliveHeroes.length > 0) {
                        const randomIndex = Math.floor(Math.random() * aliveHeroes.length);
                        const targetHero = aliveHeroes[randomIndex];

                        const index = updatedHeroes.findIndex(h => h.name === targetHero.name);
                        updatedHeroes[index] = applyAttack(updatedEnemies[0], enemy, targetHero, addGameLog) as Hero;
                    }
                });
            }
        }
    ];

    if (heroesGoFirst) {
        turns[0]();
        turns[1]();
    } else {
        turns[1]();
        turns[0]();
    }

    return { updatedHeroes, updatedEnemies };
};