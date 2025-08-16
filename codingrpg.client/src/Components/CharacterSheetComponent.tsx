import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";

import { useState } from "react"

interface CharacterSheetProps {
    hero: Character;
    back: () => void
}
function CharacterSheet({ hero, back }: CharacterSheetProps) {
    const party = hero.party;
    const [activeCharacter, setActiveCharacter] = useState<Character>(hero)

    return (
        <div className="inventory-layout-grid" id="character-sheet">
            <div className="toolbar">
                <h2>{activeCharacter.name}'s Character Sheet</h2>
            </div>
            <div className="inventory-content-left">
                <h3>Party</h3>
                <p>{hero.name}</p>
                <button className="action-button" onClick={() => setActiveCharacter(hero)}>Select</button>
                {party.map((partyMember, index) => (
                    <div key={index}>
                        <p>{partyMember.name}</p>
                        <button className="action-button" style={{ width: "100%" }} onClick={() => setActiveCharacter(partyMember)}>Select</button>
                    </div>
                ))}
            </div>
            <div className="inventory-content-main">
                <div className="stats-display-area">
                    <div className="stats-container">
                        <h3>Base Stats</h3>
                        <div className="stats">
                            <p>Name: {activeCharacter.name}</p>
                            <p>Level: {activeCharacter.level} ({activeCharacter.currentXP}/{activeCharacter.maxXP})</p>
                            <p>HP: {activeCharacter.currentHP}/{activeCharacter.maxHP}</p>
                            <p>MP: {activeCharacter.currentMP}/{activeCharacter.maxMP}</p>
                            <p>SP: {activeCharacter.currentSP}/{activeCharacter.maxSP}</p>
                        </div>
                    </div>
                    <div className="stats-container">
                        <h3>Attributes</h3>
                        <div className="stats">
                            <h3>Physical</h3>
                            <p>AGL: {hero.agility}</p>
                            <p>CON: {hero.constitution}</p>
                            <p>DEX: {hero.dexterity}</p>
                            <p>END: {hero.endurance}</p>
                            <p>STR: {hero.strength}</p>
                            <h4>Mental</h4>
                            <p>INT: {hero.intelligence}</p>
                            <p>PER: {hero.perception}</p>
                            <p>WIS: {hero.wisdom}</p>
                            <p>WLP: {hero.willpower}</p>
                            <h4>Social</h4>
                            <p>ATR: {hero.attractiveness}</p>
                            <p>CHA: {hero.charisma}</p>
                            <p>PRS: {hero.personality}</p>
                            <h4>Other</h4>
                            <p>LCK: {hero.luck}</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className="inventory-options">
                <h3>Area Options</h3>
                <button className='area-button' onClick={() => back()}>Back</button>
            </div>
            {/*<div className="game-content-bottom">*/}
            {/*    <h3>Placeholder</h3>*/}
            {/*    <p>Placeholder for Bottom Panel</p>*/}
            {/*</div>*/}
        </div>
    );
}

export default CharacterSheet;