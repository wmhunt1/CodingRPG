import { Character } from "../Models/CharacterModel"
export function fullHeal(character: Character) {
    character.currentHP = character.maxHP
    character.currentMP = character.maxMP
    character.currentSP = character.maxSP
    character.party.forEach(hero => {
        hero.currentHP = hero.maxHP
        hero.currentMP = hero.maxMP
        hero.currentSP = hero.maxSP
    })
    return character;
}
export function damageCharacter(char: Character, damageValue: number) {
    char.currentHP -= damageValue;
    return char
}
export function healCharacter(char: Character, healValue: number) {
    char.currentHP += healValue;
    if (char.currentHP > char.maxHP) {
        char.currentHP = char.maxHP;
    }
    return char
}