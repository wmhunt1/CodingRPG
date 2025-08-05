import { AreaModel,Bridge,Farm,Forest,River, StartingVillage} from './AreaModel.ts';
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
        const areas = [
            new Forest("Forest", [], -1, 2), new Forest("Forest", [], 0, 2), new River("River", [], 1, 2),
            new River("River", [], -1, 1), new Bridge("Northern Bridge", [], 0, 1), new River("River", [], 1, 1)/*or manor*/,
        /* or dock or mill*/new River("River", [], -1, 0), new StartingVillage(), new Farm("Farm", [], 1, 0) /*or cemetary/church*/,
            new Farm("Farm", [], -1, -1), new Farm("Farm", [], 0, -1), new Farm("Farm", [], 1, -1),
        ]
        super(name,areas)
    }

}
