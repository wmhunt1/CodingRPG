import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";

interface JournalProps {
    hero: Character;
    back: () => void
}
function Journal({ hero, back }: JournalProps) {
    return (
        <div className="inventory-layout-grid" id="character-sheet">
            <div className="toolbar">
                <h2>{hero.name}'s Journal</h2>
            </div>
            <div className="inventory-content-left">
                <h3>Placeholder</h3>
                <p>Placeholder</p>
            </div>
            <div className="inventory-content-main">
                <div className="inventory-display-area">
                    {hero.journal.length > 0 ? (
                        <div className="inventory-items">
                            {
                                hero.journal
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .filter(quest => quest.status !== "Completed")
                                    .map((quest, index) => <div key={index}>
                                        <h3>{quest.name}</h3>
                                        <p>{quest.description}</p>
                                        <p>{quest.type} {quest.objective} - {quest.targetProgress}/{quest.target}</p>
                                    </div>)
                            }
                        </div>
                    ) : (
                        <div><p>Your journal is empty</p></div>
                    )}
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

export default Journal;