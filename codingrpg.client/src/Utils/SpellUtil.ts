import { Spell } from "../Models/SpellModel"
export function addSpellToSpellBook(spellBook: Spell[], spellToAdd: Spell): void {
    const existingSpell = spellBook.find(spell => spell.name === spellToAdd.name);

    if (existingSpell) {
        console.log("spell already known")
    } else {
        //const newSpellInstance: Spell;

        const newSpellInstance = new Spell(spellToAdd.name, spellToAdd.description, spellToAdd.school, spellToAdd.level, spellToAdd.type, spellToAdd.subType, spellToAdd.manaCost, spellToAdd.spellValue, spellToAdd.duration)

        spellBook.push(newSpellInstance);
    }
}
