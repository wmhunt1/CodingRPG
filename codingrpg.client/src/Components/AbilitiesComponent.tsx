import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
//import { Ability } from "../Models/SpellModel"
import { useState } from "react"

interface AbilitiesProps {
    hero: Character;
    back: () => void
    //addGameLog: (message: string) => void;
}
function Abilities({ hero, back, /*addGameLog*/ }: AbilitiesProps) {
    const [currentTarget, setCurrentTarget] = useState(hero);
    //function handleCastSpell(spellToCast: Spell, caster: Character, target: Character) {
    //    spellToCast.cast(caster, target)
    //    addGameLog(`${caster.name} casts ${spellToCast.name} on ${target.name}`)
    //}
    return (
        <div className="inventory-layout-grid" id="character-sheet">
            <div className="toolbar">
                <h2>{currentTarget.name}'s Abilities</h2>
            </div>
            <div className="inventory-content-left">
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
            <div className="inventory-content-main">
                <div className="inventory-display-area">
                    {currentTarget.abilities.length > 0 ? (
                        <div className="inventory-items">
                            {
                                currentTarget.abilities
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((abil, index) => <div key={index}>
                                        <h3>{abil.name}</h3>
                                        <p>{abil.description}</p>
                                        {/*       {abil.subType !== "Damaging" ? <button className="use-equip-button" onClick={() => handleCastSpell(spell, hero, currentTarget)}>Cast</button> : <></>}*/}
                                    </div>)
                            }
                        </div>
                    ) : (
                        <div><p>You have no abilties</p></div>
                    )}
                </div>
            </div>
            <div className="inventory-options">
                <h3>Area Options</h3>
                <button className='area-button' onClick={() => back()}>Back</button>
            </div>
            {/*<div className="game-content-bottom">*/}
            {/*    <h3>Current Spell Target</h3>*/}
            {/*    <p>{currentTarget.name}</p>*/}
            {/*</div>*/}
        </div>
    );
}

export default Abilities;