import { AreaModel} from "../Models/AreaModel"; 
interface AreaMapProps {
    surroundingAreas: AreaModel[];
    currentArea: AreaModel;
}

// AreaMapComponent is now defined within the same file.
const AreaMap = ({ surroundingAreas, currentArea }: AreaMapProps) => {
    return (
        <div className="area-map">
            {/* Map over the surrounding areas passed as a prop */}
            {surroundingAreas.map((surroundingArea, index) => {
                // Determine if the current area in the loop is the player's current location
                const isCurrentLocation =
                    surroundingArea.xCoord === currentArea.xCoord &&
                    surroundingArea.yCoord === currentArea.yCoord;
                const imageClassName = `area-image${isCurrentLocation ? " current-location" : ""
                    }`;

                return (
                    <img
                        key={index}
                        className={imageClassName}
                        src={surroundingArea.imageSrc}
                        alt={surroundingArea.imageAlt}
                    />
                );
            })}
        </div>
    );
};
export default AreaMap;