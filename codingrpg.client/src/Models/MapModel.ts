import { AreaModel, Bridge, Cabin, Dock, Farm, Forest, Graveyard, HauntedHouse, River, Road, RoadRotated, StartingVillage, WaterMill } from './AreaModel.ts';
import { getRawMinnowQuest1Dialogue } from "./DialogueNodeModel.ts"
import { BasicSkeletonCombatEncounterLocation, BasicZombieCombatEncounterLocation, Location, MinnowFishingSpotLocation, PotionShopLocation, RiverWaterLocation, SalmonFishingSpotLocation, TroutFishingSpotLocation, WoodTreeLocation } from "./LocationModel.ts"
//import { fetchRawMinnowQuest1 } from "./QuestModel.ts"

export class MapModel {
    name: string;
    areas: AreaModel[]
    constructor(name: string, areas: AreaModel[]) {
        this.name = name;
        this.areas = areas;
    }
}
const forestLocations: Location[] = [new WoodTreeLocation()]
const graveyardLocations: Location[] = [new BasicSkeletonCombatEncounterLocation(), new BasicZombieCombatEncounterLocation()]
const riverFishingSpot = [new MinnowFishingSpotLocation(), new SalmonFishingSpotLocation(), new TroutFishingSpotLocation()];
const riverLocations = [...riverFishingSpot, new RiverWaterLocation()]
export class ValleyMap extends MapModel {
    constructor() {
        const name = "Valley Map"
        const areas = [
            new Road("Road", [], [], [], 0, 7), new Forest("Forest", forestLocations, [], [], 1, 7), new Forest("Forest", forestLocations, [], [], 2, 7),
            new Road("Road", [], [], [], 0, 6), new Cabin("Witch's Cabin", [new PotionShopLocation("Witch's Potion Shop", [])], [], [], 1, 6), new Forest("Forest", forestLocations, [], [], 2, 6), new River("River", riverLocations, [], [], 3, 6),
            new Road("Road", [], [], [], 0, 5), new Forest("Forest", forestLocations, [], [], 1, 5), new River("River", riverLocations, [], [], 2, 5),
            new Forest("Forest", forestLocations, [], [], -1, 4), new Road("Road", [], [], [], 0, 4), new River("River", riverLocations, [], [], 1, 4),
            new Forest("Forest", forestLocations, [], [], -1, 3), new Bridge("Bridge", riverLocations, [], [], 0, 3), new Forest("Forest", forestLocations, [], [], 1, 3), new Forest("Forest", forestLocations, [], [], 2, 3), new Forest("Forest", forestLocations, [], [], 3, 3),
            new Forest("Forest", forestLocations, [], [], -2, 2), new River("River", riverLocations, [], [], -1, 2), new Road("Road", [], [], [], 0, 2), new Forest("Forest", forestLocations, [], [], 1, 2), new HauntedHouse("Old Run-down Mansion", [], [], [], 2, 2), new Forest("Forest", forestLocations, [], [], 3, 2),
            new River("River", riverLocations, [], [], -2, 1), new Farm("Farm", [], [], -1, 1), new Road("Road", [], [], [], 0, 1), new Graveyard("Village Graveyard", graveyardLocations, [], [], 1, 1), new Road("Road", [], [], [], 2, 1), new Forest("Forest", forestLocations, [], [], 3, 1),
            new Forest("Forest", forestLocations, [], [], -2, 0), new Dock("Village Dock", riverLocations, [], [getRawMinnowQuest1Dialogue], -1, 0), new StartingVillage(), new RoadRotated("Road", [], [], [], 1, 0), new RoadRotated("Road", [], [], [], 2, 0), new RoadRotated("Road", [], [], [], 3, 0),
            new River("River", riverLocations, [], [], -2, -1), new Farm("Farm", [], [], -1, -1), new Road("Road", [], [], [], 0, -1), new Farm("Littleroot Farm", [], [], 1, -1), new Forest("Forest", forestLocations, [], [], 2, -1),
            new Forest("Forest", forestLocations, [], [], -2, -2), new WaterMill("Water Mill", [], [], -1, -2), new Road("Road", [], [], [], 0, -2), new Forest("Forest", forestLocations, [], [], 1, -2), new Forest("Forest", forestLocations, [], [], 2, -2),
            new River("River", riverLocations, [], [], -2, -3), new Forest("Forest", forestLocations, [], [], -1, -3), new Road("Road", [], [], [], 0, -3),
        ]
        super(name, areas)
    }

}
