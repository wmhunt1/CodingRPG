import { Character,Rat } from './CharacterModel.ts';
import {ShopModel} from "./ShopModel.ts"
export class Location {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
export class CombatLocation extends Location {
    combatants: Character[];
    constructor(name: string, combatants: Character[]) {
        super(name)
        this.combatants = combatants;
    }
}
export class RatCellar extends CombatLocation {
    constructor() {
        const name = "Rat Cellar"
        const combatants: Character[] = [new Rat()]
        super(name, combatants)
    }
}
export class ShopLocation extends Location {
    shop: ShopModel;
    constructor(name: string, shop:ShopModel) {
        super(name)
        this.shop = shop;
    }
}
export class InnLocation extends ShopLocation {
    innStay: number;
    constructor(name: string, shop: ShopModel,innStay:number) {
        super(name,shop)
        this.shop = shop;
        this.innStay = innStay;
    }
}
