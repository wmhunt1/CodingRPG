import { healCharacter } from "../Utils/GameUtil";
import { addSpellToSpellBook } from "../Utils/SpellUtil";
import { Character } from "./CharacterModel"
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
    //effect: () => void;
    constructor(name: string, description: string, school: string, level: number, type: string, subType: string, manaCost: number, spellValue: number,duration:number) {
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
    cast(caster: Character, target: Character): { caster: Character, target: Character } {
        console.log(target)
        return { caster, target };
    }
    learn(learner: Character): Character {
        addSpellToSpellBook(learner.spellBook, this)
        return learner;
    }
}
export class HealingSpell extends Spell {
    constructor(name: string, description: string, school: string, level: number, type: string, subType: string, manaCost: number, spellValue: number,duration:number){
        super(name, description, school, level, type, subType, manaCost, spellValue,duration)
    }
    override cast(caster: Character, target: Character): { caster: Character, target: Character } {
        if (caster.currentMP >= this.manaCost) {
            caster.currentMP -= this.manaCost
            healCharacter(target,this.spellValue)
        }
        return { caster, target };
    }
}
export const basicHealSpell = new HealingSpell("Basic Heal", "A basic healing spell that restores 5 HP", "Restoration", 1, "Restoration", "Healing", 5, 5,0)
//heal
//multiHeal