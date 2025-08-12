import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
import { Spell } from "../Models/SpellModel"
import { useState } from "react"

interface SpellBookProps {
    hero: Character;
    back: () => void
    addGameLog: (message: string) => void;
}
function SpellBook({ hero, back, addGameLog }: SpellBookProps) {
    const [currentTarget, setCurrentTarget] = useState(hero);
    function handleCastSpell(spellToCast: Spell, caster: Character, target: Character) {
        spellToCast.cast(caster, target)
        addGameLog(`${caster.name} casts ${spellToCast.name} on ${target.name}`)
    }
    return (
        <div className="game-layout-grid" id="character-sheet">
            <div className="toolbar">
                <h2>{hero.name}'s SpellBook</h2>
            </div>
            <div className="game-content-left">
                <h3>Party</h3>
                <p>{hero.name}</p>
                <button className="action-button" onClick={() => setCurrentTarget(hero)}>Select</button>
                {hero.party.map((partyMember, index) => (
                    <div key={index}>
                        <p>{partyMember.name}</p>
                        <button className="action-button" style={{ width: "100%" }} onClick={() => setCurrentTarget(partyMember)}>Select</button>
                    </div>
                ))}
            </div>
            <div className="game-content-main">
                <div className="inventory-display-area">
                    {hero.spellBook.length > 0 ? (
                        <div className="inventory-items">
                            {
                                hero.spellBook
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((spell, index) => <div key={index}>
                                        <h3>{spell.name} - {spell.school}</h3>
                                        <p>{spell.description}</p>
                                        {spell.subType !== "Damaging" ? <button className="use-equip-button" onClick={() => handleCastSpell(spell, hero, currentTarget)}>Cast</button> : <></>}
                                    </div>)
                            }
                        </div>
                    ) : (
                        <div><p>Your SpellBook is empty</p></div>
                    )}
                </div>
            </div>
            <div className="area-options">
                <h3>Area Options</h3>
                <button className='area-button' onClick={() => back()}>Back</button>
            </div>
            <div className="game-content-bottom">
                <h3>Current Spell Target</h3>
                <p>{currentTarget.name}</p>
            </div>
        </div>
    );
}

export default SpellBook;