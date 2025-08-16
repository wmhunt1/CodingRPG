import { Ability } from "../Models/AbilityModel";

export function addAbilityToAbilities(abilities: Ability[], abilityToAdd: Ability): void {
    const existingAbility = abilities.find(ability => ability.name === ability.name);

    if (existingAbility) {
        console.log("ability already known")
    } else {

        const newAbilityInstance = new Ability(abilityToAdd.name, abilityToAdd.description, abilityToAdd.level, abilityToAdd.type, abilityToAdd.subType, abilityToAdd.staminaCost, abilityToAdd.abilityValue, abilityToAdd.duration)

        abilities.push(newAbilityInstance);
    }
}