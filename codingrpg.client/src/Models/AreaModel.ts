import {InnLocation, Location, RatCellar, ShopLocation } from './LocationModel.ts';
import { GeneralShop,InnShop} from "./ShopModel.ts"
export class AreaModel {
    name: string;
    locations: Location[]
    xCoord: number = 0; 
    yCoord: number = 0;
    constructor(name: string,locations: Location[],x:number,y:number) {
        this.name = name;
        this.locations = locations;
        this.xCoord = x;
        this.yCoord = y;
    }
}
export class Farm extends AreaModel {
    constructor(name: string, locations: Location[], x: number, y: number) {
        super(name, locations, x, y)
    }
}
export class Forest extends AreaModel {
    constructor(name: string, locations: Location[], x: number, y: number) {
        super(name, locations, x, y)
    }
}
export class Settlement extends AreaModel {
    constructor(name: string, locations: Location[], x: number, y: number) {
        super(name,locations,x,y)
    }
}
export class Village extends Settlement {
    constructor(name: string, locations: Location[], x: number, y: number) {
        super(name, locations,x,y)
    }
}
export class StartingVillage extends Village {
    constructor() {
        const name = "Starting Village"
        const locations: Location[] = [new InnLocation("Starting Inn",new InnShop(5),5),new RatCellar(), new ShopLocation("General Shop", new GeneralShop())]
        const x = 0;
        const y = 0;
        super(name,locations,x,y)
    }
}