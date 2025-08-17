import { useState, useCallback, useMemo } from "react";
import '../StyleSheets/GameStyle.css';
import { AreaModel, NotArea } from "../Models/AreaModel";
import { Character } from "../Models/CharacterModel";
import { DungeonModel } from "../Models/DungeonModel";

import AreaMap from "./AreaMapComponent";
import Compass from "./CompassComponent";
import { calculateNewLocation } from "../Utils/MovementUtil";
interface DungeonProps {
    // Add props as needed
    hero: Character;
    dungeon: DungeonModel;
    addGameLog: (message: string) => void;
    back: () => void; // Optional back function
}

function Dungeon({ hero, dungeon, addGameLog, back }: DungeonProps) {
    const party = hero.party;
    const currentDungeon = dungeon;
    const [area, setArea] = useState<AreaModel>(dungeon.dungeonMap.areas[0]);
    const areaMap = useMemo(() => {
        return dungeon.dungeonMap
    }, [dungeon])

    const handleMovement = useCallback((direction: string) => {
        const { newArea, way, message } = calculateNewLocation(area.xCoord, area.yCoord, direction, areaMap);

        if (newArea) {
            setArea(newArea);
            addGameLog(`${hero.name} travels ${way} to ${newArea.name}`);
        } else {
            addGameLog(message || `You cannot go that way`); // Use the message from utility or a default
        }
    }, [addGameLog, area, hero, areaMap]);
    const surroundingAreas = useMemo(() => {
        const areas = [];
        for (let y = area.yCoord + 4; y >= area.yCoord - 4; y--) {
            for (let x = area.xCoord - 4; x <= area.xCoord + 4; x++) {
                // Find the area by coordinates. If not found, create a new NotArea.
                const foundArea = dungeon.dungeonMap.areas.find(a => a.xCoord === x && a.yCoord === y) || new NotArea(x, y);
                areas.push(foundArea);
            }
        }
        return areas;
    }, [area.xCoord, area.yCoord, dungeon.dungeonMap.areas]); // Recalculate only when the current area changes
    return (
        <div className="game-layout-grid" id="dungeon">
            <div className="toolbar">
                <h2>{currentDungeon.name}</h2>
            </div>
            <div className="game-content-left">
                <h3>Party</h3>
                <p>{hero.name}</p>
                {party.map((partyMember, index) => (
                    <div key={index}>
                        <p>{partyMember.name}</p>
                    </div>
                ))}
            </div>
            <div className="game-content-main">
                <AreaMap
                    surroundingAreas={surroundingAreas}
                    currentArea={area} />
            </div>
            <div className="game-options">
                <h3>Dungeon Options</h3>
                {/*   //later make it so you have to go to entrance first*/}
                <button className='area-button' onClick={() => back()}>Leave</button>
            </div>
            <div className="game-content-bottom">
                <div id="area-info">
                    <Compass move={handleMovement}></Compass>
                </div>
            </div>
        </div>
    );
}

export default Dungeon;