import { damageCharacter, healCharacter } from "../Utils/GameUtil";
import { addSpellToSpellBook } from "../Utils/SpellUtil";
import { Character } from "./CharacterModel";

// Base class with a flexible target parameter
export class Spell {
    name: string;
    description: string;
    school: string;
    level: number;
    type: string;
    subType: string;
    manaCost: number;
    spellValue: number;
    duration: number;

    constructor(name: string, description: string, school: string, level: number, type: string, subType: string, manaCost: number, spellValue: number, duration: number) {
        this.name = name;
        this.description = description;
        this.school = school;
        this.level = level;
        this.type = type;
        this.subType = subType;
        this.manaCost = manaCost;
        this.spellValue = spellValue;
        this.duration = duration;
    }

    // `cast` method now accepts a union type
    cast(caster: Character, target: Character | Character[]): { caster: Character, targets: Character[] } {
        // Convert single target to an array for consistent processing
        const targets = Array.isArray(target) ? target : [target];
        console.log("Casting a generic spell on:", targets);
        return { caster, targets };
    }

    learn(learner: Character): Character {
        // addSpellToSpellBook is not defined in the provided code, but this is the intended use
        addSpellToSpellBook(learner.spellBook, this);
        return learner;
    }
}

// DamagingSpell handles both single and multiple targets
export class DamagingSpell extends Spell {
    constructor(name: string, description: string, school: string, level: number, type: string, subType: string, manaCost: number, spellValue: number, duration: number) {
        super(name, description, school, level, type, subType, manaCost, spellValue, duration);
    }

    override cast(caster: Character, target: Character[]): { caster: Character, targets: Character[] } {
        if (caster.currentMP >= this.manaCost) {
            caster.currentMP -= this.manaCost;
            // Convert single target to an array for iteration
            const targets = Array.isArray(target) ? target : [target];
            console.log(targets)
            targets.forEach(t => {
                console.log(t.name)
                console.log("Before damage, target's HP:", t.currentHP);
                damageCharacter(t, this.spellValue);
                console.log("After damage, target's HP:", t.currentHP);
            });
        }
        return { caster, targets: Array.isArray(target) ? target : [target] };
    }
}
export const magicBoltSpell = new DamagingSpell("Magic Bolt", "A bolt of magic that deals 5 DMG", "Destruction", 1, "Damaging", "Single-Target", 5, 5, 0);

// HealingSpell handles both single and multiple targets
export class HealingSpell extends Spell {
    constructor(name: string, description: string, school: string, level: number, type: string, subType: string, manaCost: number, spellValue: number, duration: number) {
        super(name, description, school, level, type, subType, manaCost, spellValue, duration);
    }

    override cast(caster: Character, target: Character[]): { caster: Character, targets: Character[] } {
        if (caster.currentMP >= this.manaCost) {
            caster.currentMP -= this.manaCost;
            // Convert single target to an array for iteration
            const targets = Array.isArray(target) ? target : [target];
            targets.forEach(t => {
                healCharacter(t, this.spellValue);
            });
        }
        return { caster, targets: Array.isArray(target) ? target : [target] };
    }
}
export const basicHealSpell = new HealingSpell("Basic Heal", "A basic healing spell that restores 5 HP", "Restoration", 1, "Healing", "Single-Target", 5, 5, 0);