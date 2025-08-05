import { AreaModel, Bridge, StartingVillage } from './AreaModel.ts';
import {MinnowFishingSpotLocation } from "./LocationModel.ts"
export class MapModel {
    name: string;
    areas: AreaModel[]
    constructor(name: string, areas: AreaModel[]) {
        this.name = name;
        this.areas = areas;
    }
}
export class ValleyMap extends MapModel{
    constructor() {
        const name = "Valley Map"
        const areas = [new StartingVillage(),new Bridge("North Bridge",[new MinnowFishingSpotLocation()],0,1)]
        super(name,areas)
    }

}
