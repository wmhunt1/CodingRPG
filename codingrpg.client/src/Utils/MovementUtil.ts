// MovementUtil.ts

//import { MapModel } from '../Models/MapModel';
import { AreaModel} from '../Models/AreaModel';
import type { MapModel } from '../Models/MapModel';

interface MovementResult {
    newArea: AreaModel | null;
    way: string;
    message: string | null;
}

export function calculateNewLocation(currentX: number, currentY: number, direction: string, map: MapModel): MovementResult {
    let newX = currentX;
    let newY = currentY;
    let way = "";

    switch (direction) {
        case "NW":
            newX--;
            newY++;
            way = "North-West";
            break;
        case "N":
            newY++;
            way = "North";
            break;
        case "NE":
            newX++;
            newY++;
            way = "North-East";
            break;
        case "W":
            newX--;
            way = "West";
            break;
        case "E":
            newX++;
            way = "East";
            break;
        case "SW":
            newX--;
            newY--;
            way = "South-West";
            break;
        case "S":
            newY--;
            way = "South";
            break;
        case "SE":
            newX++;
            newY--;
            way = "South-East";
            break;
        default:
            return { newArea: null, way: "", message: "Invalid direction" }; // Should ideally not happen with good UI
    }

    // This part should probably be passed in or derived from a global game state
    // For now, let's keep it here for demonstration, but consider passing the map
 

    const locationIndex = map.areas.findIndex((area: AreaModel) => area.xCoord === newX && area.yCoord === newY);

    if (locationIndex !== -1) {
        return { newArea: map.areas[locationIndex], way, message: null };
    } else {
        return { newArea: null, way: "", message: "You cannot go that way" };
    }
}