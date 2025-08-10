import { AreaModel, Dock, Farm, Road, StartingVillage, WaterMill } from './AreaModel.ts';
import {getRawMinnowQuest1Dialogue} from "./DialogueNodeModel.ts"
import { MinnowFishingSpotLocation, RiverWaterLocation, SalmonFishingSpotLocation, TroutFishingSpotLocation } from "./LocationModel.ts"
//import { fetchRawMinnowQuest1 } from "./QuestModel.ts"

export class MapModel {
    name: string;
    areas: AreaModel[]
    constructor(name: string, areas: AreaModel[]) {
        this.name = name;
        this.areas = areas;
    }
}
const riverFishingSpot = [new MinnowFishingSpotLocation(), new SalmonFishingSpotLocation(), new TroutFishingSpotLocation()];
export class ValleyMap extends MapModel {
    constructor() {
        const name = "Valley Map"
        const areas = [

            new Dock("Village Dock", [...riverFishingSpot, new RiverWaterLocation()], [], [getRawMinnowQuest1Dialogue], -1, 0), new StartingVillage(),
            new Road("Road", [], [], [], 0, -1), new Farm("Littleroot Farm", [], [], 1, -1),
            new WaterMill("Water Mill", [], [], -1, -2), new Road("Road", [], [], [], 0, -2),
        ]
        super(name, areas)
    }

}
