import { Character } from "./CharacterModel";
import { addAbilityToAbilities } from "../Utils/AbilityUtils";

export class Ability {
    name: string;
    description: string;
    level: number;
    type: string;
    subType: string;
    staminaCost: number;
    abilityValue: number;
    duration: number;

    constructor(name: string, description: string, level: number, type: string, subType: string, staminaCost: number, abilityValue: number, duration: number) {
        this.name = name;
        this.description = description;
        this.level = level;
        this.type = type;
        this.subType = subType;
        this.staminaCost = staminaCost;
        this.abilityValue = abilityValue;
        this.duration = duration;
    }

    use(user: Character, targets: Character[]): { user: Character, targets: Character[] } {
        console.log("Using generic ability on:", targets);
        return { user, targets };
    }

    learn(learner: Character): Character {
        // addAbilityToAbilities is not defined, but this is the intended use
        addAbilityToAbilities(learner.abilities, this);
        return learner;
    }
}

export class DamagingAbility extends Ability {
    constructor(name: string, description: string, level: number, type: string, subType: string, staminaCost: number, abilityValue: number, duration: number) {
        super(name, description, level, type, subType, staminaCost, abilityValue, duration);
    }

    override use(user: Character, targets: Character[]): { user: Character, targets: Character[] } {
        if (user.currentSP >= this.staminaCost) {
            user.currentSP -= this.staminaCost;
            targets.forEach(t => {
                t.currentHP -= this.abilityValue;
            });
        }
        return { user, targets };
    }
}