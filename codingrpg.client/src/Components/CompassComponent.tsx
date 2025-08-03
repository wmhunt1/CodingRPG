import '../StyleSheets/GameStyle.css';

interface CompassProps { // Renamed from LoadGameProps to be more specific
    move: (direction: string) => void;
}

function Compass({ move }: CompassProps) {
    return (
        <div id="compass">
            <div id="compass-north">
                <button id="compass-north-west" onClick={() => move("NW")}>North-West</button>
                <button id="compass-north-true" onClick={() => move("N")}>North</button>
                <button id="compass-north-east" onClick={() => move("NE")}>North-East</button>
            </div>
            <div id="compass-east-west">
                <button id="compass-west-true" onClick={() => move("W")}>West</button><button id="compass-east-true" onClick={() => move("E")}>East</button>
            </div>
            <div id="compass-south">
                <button id="compass-south-west" onClick={() => move("SW")}>South-West</button>
                <button id="compass-south-true" onClick={() => move("S")}>South</button>
                <button id="compass-south-east" onClick={() => move("SE")}>South-East</button>
            </div>
        </div>
    );
}
export default Compass;