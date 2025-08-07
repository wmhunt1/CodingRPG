import { GeneralStoreLocation, InnLocation, Location, SmithShopLocation } from './LocationModel.ts';
import { Quest, slayRatQuest1 } from "./QuestModel.ts"
//import { GeneralShop, InnShop } from "./ShopModel.ts"
import bridgeImage from "../assets/stone-bridge.png"
import farmImage from "../assets/wheat.png";
import forestImage from "../assets/forest.png";
import notAreaImage from "../assets/plain-square.png"
import riverImage from "../assets/splashy-stream.png";
import villageImage from "../assets/village.png";
export class AreaModel {
    name: string;
    locations: Location[]
    quests: Quest[]
    xCoord: number = 0;
    yCoord: number = 0;
    imageSrc: string = ""
    imageAlt: string = ""

    constructor(name: string, locations: Location[], quests: Quest[], x: number, y: number) {
        this.name = name;
        this.locations = locations;
        this.quests = quests;
        this.xCoord = x;
        this.yCoord = y;
    }
}
export class NotArea extends AreaModel {
    constructor(x: number, y: number) {
        const name = "Under Construction"
        const locations: Location[] = []
        const quests: Quest[] = []
        super(name, locations, quests, x, y)
        this.imageSrc = notAreaImage;
        this.imageAlt = "Under Construction";
    }
}
export class Dungeon extends AreaModel {
    constructor(name: string, locations: Location[], quests: Quest[], x: number, y: number) {
        super(name, locations, quests, x, y)
        //this.imageSrc = farmImage;
        //this.imageAlt = "Farm";
    }
}
export class Farm extends AreaModel {
    constructor(name: string, locations: Location[], quests: Quest[], x: number, y: number) {
        super(name, locations, quests, x, y)
        this.imageSrc = farmImage;
        this.imageAlt = "Farm";

    }
}
export class Forest extends AreaModel {
    //hunting spot lumbering
    constructor(name: string, locations: Location[], quests: Quest[], x: number, y: number) {
        super(name, locations, quests, x, y)
        this.imageSrc = forestImage;
        this.imageAlt = "Forest";
    }
}
export class TravelWay extends AreaModel {
    constructor(name: string, locations: Location[], quests: Quest[], x: number, y: number) {
        super(name, locations, quests, x, y)
    }
}
export class Bridge extends TravelWay {
    constructor(name: string, locations: Location[], quests: Quest[], x: number, y: number) {
        super(name, locations, quests, x, y)
        this.imageSrc = bridgeImage;
        this.imageAlt = "A Bridge"
    }
}
export class Settlement extends AreaModel {
    constructor(name: string, locations: Location[], quests: Quest[], x: number, y: number) {
        super(name, locations, quests, x, y)
        this.imageSrc = villageImage;
        this.imageAlt = "A Settlement";
    }
}
export class Village extends Settlement {
    constructor(name: string, locations: Location[], quests: Quest[], x: number, y: number) {
        super(name, locations, quests, x, y)
        this.imageSrc = villageImage;
        this.imageAlt = "A Village";
    }
}
export class StartingVillage extends Village {
    constructor() {
        const name = "Starting Village"
        //maybe move cellar to inn location
        const locations: Location[] = [new GeneralStoreLocation("Joe the Trader's"), new InnLocation("Dreaming Worker Inn", 5), new SmithShopLocation("Forgeheart Smithy")]
        const quests: Quest[] = [slayRatQuest1]
        const x = 0;
        const y = 0;
        super(name, locations, quests, x, y)
    }
}
export class WaterBody extends AreaModel {
    //fishing spot
    constructor(name: string, locations: Location[], quests: Quest[], x: number, y: number) {
        super(name, locations, quests, x, y)
    }
}
export class River extends WaterBody {
    constructor(name: string, locations: Location[], quests: Quest[], x: number, y: number) {
        super(name, locations, quests, x, y)
        this.imageSrc = riverImage;
        this.imageAlt = "A River"
    }
}