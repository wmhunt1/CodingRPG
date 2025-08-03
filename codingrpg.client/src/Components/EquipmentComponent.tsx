import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";

interface EquipmentProps {
    hero: Character;
    back: () => void
}
function Equipment({ hero, back }: EquipmentProps) {
    return (
        <div className="game-layout-grid" id="character-sheet">
            <div className="toolbar">
                <h2>{hero.name}'s Equipment</h2>
            </div>
            <div className="game-content-left">
                <h3>Placeholder</h3>
                <p>Placeholder</p>
            </div>
            <div className="game-content-main">
                <div className="stats-display-area">
                    <div className="stats-container">
                        <h3>Weapons</h3>
                        <div className="stats">
                            <p>Weapon: {hero.weapon.name} ({hero.weapon.power} DMG)</p>
                        </div>
                    </div>
                    <div className="stats-container">
                        <h3>Armor</h3>
                        <div className="stats">
                        </div>
                    </div>
                </div>
            </div>
            <div className="area-options">
                <h3>Area Options</h3>
                <button className='area-button' onClick={() => back()}>Back</button>
            </div>
            <div className="game-content-bottom">
                <h3>Placeholder</h3>
                <p>Placeholder for Bottom Panel</p>
            </div>
        </div>
    );
}

export default Equipment;