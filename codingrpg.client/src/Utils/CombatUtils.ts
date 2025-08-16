
// src/Utils/CombatUtils.ts
import { Character, Hero } from "../Models/CharacterModel"; // Assuming CharacterModel is accessible
import { Item, OffHandWeapon, Shield } from "../Models/ItemModel";
import { Spell } from "../Models/SpellModel";
import { addItemToInventory, removeItemFromInventory } from "./InventoryUtils";
import { updateQuestProgress } from "./QuestUtils";

export const applyAttack = (hero: Character, attacker: Character, target: Character, addGameLog: (message: string) => void): Character => {
    const totalAttackerAgility = (attacker.agility + attacker.agilityBonus - attacker.agilityPenalty + attacker.agilityTempBonus - attacker.agilityTempPenalty) / 100
    const totalTargetAgility = (target.agility + target.agilityBonus - target.agilityPenalty + target.agilityTempBonus - target.agilityTempPenalty) / 100
    const hitChance = 0.85 + totalAttackerAgility - totalTargetAgility;
    const hitRoll = Math.random();

    if (hitRoll <= hitChance) {
        let shieldBonus = 0;
        if (target.offHand instanceof Shield) {
            shieldBonus = target.offHand.protection;
        }

        // Calculate the attacker's total power
        let totalPower = attacker.mainHand.power;
        if (attacker.offHand instanceof OffHandWeapon) {
            totalPower += attacker.offHand.power;
        }

        const totalStrength = Math.floor((attacker.strength + attacker.strengthBonus - attacker.strengthPenalty + attacker.strengthTempBonus - attacker.strengthTempPenalty) / 10);
        totalPower += totalStrength;

        const totalProtection = Math.floor((target.head.protection + target.shoulders.protection + target.chest.protection + target.hands.protection + target.wrists.protection + target.waist.protection + target.legs.protection + target.feet.protection) / 8) + shieldBonus;

        let damage = totalPower - totalProtection;

        const totalAttackerLuck = (attacker.luck + attacker.luckBonus - attacker.luckPenalty + attacker.luckTempBonus - attacker.luckTempPenalty) / 100;
        const totalTargetLuck = (target.luck + target.luckBonus - target.luckPenalty + target.luckTempBonus - target.luckTempPenalty)

        const critChance = 0.05 + totalAttackerLuck - totalTargetLuck;
        const critRoll = Math.random();
        let isCritical = false;

        // Check for a critical hit
        if (critRoll <= critChance) {
            isCritical = true;
            damage *= 2;
        }

        // Ensure at least 1 damage is dealt if it's a critical hit or if damage is initially 0
        if (damage < 1) {
            damage = 1;
        }

        const updatedTarget = { ...target, currentHP: target.currentHP - damage };

        if (isCritical) {
            addGameLog(`${attacker.name} lands a critical strike on ${target.name} for ${damage} damage!`);
        } else if (damage > 0) {
            addGameLog(`${attacker.name} attacks ${target.name} for ${damage} damage!`);
        } else {
            addGameLog(`${attacker.name} attacks ${target.name} but does no damage!`);
        }

        if (updatedTarget.currentHP <= 0) {
            const existingQuest = hero.journal.find(quest => updatedTarget.name.includes(quest.objective));
            if (existingQuest) {
                console.log("existing quest")
                updateQuestProgress(hero, hero.journal, existingQuest, addGameLog);
            }
            addGameLog(`${updatedTarget.name} has been defeated!`);
        }
        return updatedTarget;
    } else {
        addGameLog(`${attacker.name} misses ${target.name}!`);
        return target;
    }
};

export const castSpell = (hero: Character, targets: Character[], spell: Spell, addGameLog: (message: string) => void): (Character[]) => {

    const updatedTargets: Character[] = [];
    console.log(targets)
    if (hero.currentMP >= spell.manaCost) {
        hero.currentMP -= spell.manaCost;
        const { targets: updatedTargetArray } = spell.cast(hero, targets);
        updatedTargets.push(updatedTargetArray[0]);

        // Log messages for the whole group
        console.log(spell.subType)
        if (spell.type === "Healing") {
            addGameLog(`${hero.name} casts ${spell.name} on ${targets.map(t => t.name).join(', ')}, healing ${spell.spellValue} HP`);
        }
        if (spell.type === "Damaging") {
            addGameLog(`${hero.name} fires a ${spell.name} at ${targets.map(t => t.name).join(', ')}, dealing ${spell.spellValue} DMG`);
        }
    } else {
        addGameLog(`${hero.name} does not have enough mana to cast ${spell.name}!`);
    }

    return updatedTargets
};

export const useItem = (hero: Character, target: Character, item: Item, addGameLog: (message: string) => void): Character => {
    removeItemFromInventory(hero.inventory, item, 1);
    const updatedTarget = { ...target };
    addItemToInventory(updatedTarget.inventory, item, 1);
    item.use(updatedTarget);
    addGameLog(`${hero.name} uses a ${item.name} on ${target.name}`);
    return updatedTarget;
}

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

    const firstHero = updatedHeroes[0];
    const turns = [
        () => { // Heroes' Turn
            if (updatedHeroes.length > 0) {

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
                        let targets: Character[] = [];
                        console.log("Spell")
                        // Determine targets based on spell subType and the selected target
                        if (spell.subType === "Single-Target") {
                            if (!target) {
                                addGameLog(`${firstHero.name} tried to cast a single-target spell without a target!`);
                                return;
                            }
                            targets.push(target);
                            console.log(targets)
                        } else if (spell.subType === "Multi-Target") {
                            // Decide to target allies or enemies based on another property, like spell.school or spell.type
                            // For example, if the spell is "Healing", target allies; otherwise, target enemies.
                            if (spell.type === "Healing") {
                                targets = updatedHeroes.filter(h => h.currentHP > 0);
                            } else {
                                targets = updatedEnemies.filter(e => e.currentHP > 0);
                                console.log(targets)
                            }
                        } else {
                            addGameLog(`Invalid spell sub-type for ${spell.name}.`);
                            return;
                        }

                        // Call castSpell with the determined targets array
                        const updatedTargets = castSpell(firstHero, targets, spell, addGameLog);

                        // Update the hero/enemy arrays based on the returned characters
                        if (Array.isArray(updatedTargets)) {
                            updatedTargets.forEach(t => {
                                const heroIndex = updatedHeroes.findIndex(h => h.name === t.name);
                                if (heroIndex !== -1) {
                                    updatedHeroes[heroIndex] = t as Hero;
                                }
                                const enemyIndex = updatedEnemies.findIndex(e => e.name === t.name);
                                if (enemyIndex !== -1) {
                                    updatedEnemies[enemyIndex] = t;
                                }
                            });
                        }
                    }
                    else {
                        console.log("Other action")
                    }
                }
                updatedEnemies = updatedEnemies.filter((enemy) => enemy.currentHP > 0);
                // Handle the rest of the heroes
                for (let i = 1; i < updatedHeroes.length; i++) {
                    const updatedHero = updatedHeroes[i];
                    if (updatedHero.currentHP <= 0) continue;
                    const targetEnemy = updatedEnemies.find((enemy) => enemy.currentHP > 0);
                    if (targetEnemy) {
                        const index = updatedEnemies.findIndex(e => e.name === targetEnemy.name);
                        updatedEnemies[index] = applyAttack(firstHero, updatedHero, targetEnemy, addGameLog);
                        //if (updatedEnemies[index].currentHP <= 0) {
                        //    hero.currentXP += targetEnemy.currentXP;
                        //    hero.gold += targetEnemy.gold;
                        //}
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