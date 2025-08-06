import { Character, Rat } from './CharacterModel.ts';
export class Encounter {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
export class CombatEncounter extends Encounter {
    combatants: Character[];
    constructor(name: string, combatants: Character[]) {
        super(name)
        this.combatants = combatants;
    }
}
export class NoCombatEncounter extends CombatEncounter {
    constructor() {
        const name = "None"
        const combatants: Character[] = [];
        super(name, combatants)
    }
}
export class RatCellarCombatEncounter extends CombatEncounter {
    constructor() {
        const name = "Kill Rats"
        const minRats = 1;
        const maxRats = 3;
        const numberOfRats = Math.floor(Math.random() * (maxRats - minRats + 1)) + minRats;
        const combatants: Character[] = [new Rat()];
        for (let i = 0; i < numberOfRats; i++) {
            combatants.push(new Rat());
        }
        super(name, combatants)
    }
}