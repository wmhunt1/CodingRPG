import {GoblinDungeon1Map, MapModel } from './MapModel';
export class DungeonModel {
    name: string;
    dungeonMap: MapModel;
    constructor(name: string, map: MapModel) { this.name = name; this.dungeonMap = map; }
}
export class GoblinDungeon1 extends DungeonModel {
    constructor() {
        const name = "Dwarven Mine overrun by goblins";
        const map = new GoblinDungeon1Map()
        super(name, map);
    }
}