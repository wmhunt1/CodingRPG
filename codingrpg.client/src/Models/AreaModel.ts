import { Location, RatCellar, ShopLocation } from './LocationModel.ts';
import {TestShop } from "./ShopModel.ts"
export class AreaModel {
    name: string;
    locations: Location[]
    xCoord: number = 0; 
    yCoord: number = 0;
    constructor(name: string,locations: Location[]) {
        this.name = name;
        this.locations = locations;
    }
}
export class Settlement extends AreaModel {
    constructor(name: string, locations: Location[]) {
        super(name,locations)
    }
}
export class Village extends Settlement {
    constructor(name: string, locations: Location[]) {
        super(name, locations)
    }
}
export class StartingVillage extends Village {
    constructor() {
        const name = "Starting Village"
        const locations:Location[] = [new RatCellar(),new ShopLocation("Test Shop",new TestShop()),new Location("Test Heal")]
        super(name,locations)
    }
}