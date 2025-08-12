import { Character, Cow, Rat } from './CharacterModel.ts';
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
export class CowCombatEncounter extends CombatEncounter {
    constructor() {
        const name = "A Cow"
        const combatants: Character[] = [new Cow()];
        super(name, combatants)
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
        const name = "Cellar full of rats"
        const min = 1;
        const max = 3;
        const total = Math.floor(Math.random() * (max - min + 1)) + min;
        const combatants: Character[] = [new Rat()];
        for (let i = 0; i < total; i++) {
            combatants.push(new Rat());
        }
        super(name, combatants)
    }
}