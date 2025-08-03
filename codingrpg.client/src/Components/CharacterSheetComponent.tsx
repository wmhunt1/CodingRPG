import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";

interface CharacterSheetProps {
    hero: Character;
    back: () => void
}
function CharacterSheet({ hero, back }: CharacterSheetProps) {
    return (
        <div className="game-layout-grid" id="character-sheet">
            <div className="toolbar">
                <h2>{hero.name}'s Character Sheet</h2>
            </div>
            <div className="game-content-left">
                <h3>Placeholder</h3>
                <p>Placeholder</p>
            </div>
            <div className="game-content-main">
                <div className="stats-display-area">
                    <div className="stats-container">
                        <h3>Base Stats</h3>
                        <div className="stats">
                            <p>Name: {hero.name}</p>
                            <p>Level: {hero.level} ({hero.currentXP}/{hero.maxXP})</p>
                            <p>HP: {hero.currentHP}/{hero.maxHP}</p>
                            <p>MP: {hero.currentMP}/{hero.maxMP}</p>
                            <p>SP: {hero.currentSP}/{hero.maxSP}</p>
                        </div>
                    </div>
                    <div className="stats-container">
                        <h3>Attributes</h3>
                        <div className="stats">
                        <p>ATR: {hero.attractiveness}</p>
                        <p>CHA: {hero.charisma}</p>
                        <p>CON: {hero.constitution}</p>
                        <p>DEX: {hero.dexterity}</p>
                        <p>INT: {hero.intelligence}</p>
                        <p>LCK {hero.luck}</p>
                        <p>PER: {hero.perception}</p>
                        <p>SPD: {hero.speed}</p>
                        <p>STR: {hero.strength}</p>
                        <p>WLP: {hero.willPower}</p>
                        <p>WIS: {hero.wisdom}</p>
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

export default CharacterSheet;