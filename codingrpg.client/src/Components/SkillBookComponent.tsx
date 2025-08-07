import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";

interface SkillBookProps {
    hero: Character;
    back: () => void
}
function SkillBook({ hero, back }: SkillBookProps) {
    return (
        <div className="game-layout-grid" id="character-sheet">
            <div className="toolbar">
                <h2>{hero.name}'s Skills</h2>
            </div>
            <div className="game-content-left">
                <h3>Placeholder</h3>
                <p>Placeholder</p>
            </div>
            <div className="game-content-main">
                <div className="inventory-display-area">
                    {hero.skillBook.length > 0 ? (
                        <div className="inventory-items">
                            {
                                hero.skillBook
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((skill, index) => <div key={index}>
                                        <h3>{skill.name}</h3>
                                        <p>Level: {skill.level} ({skill.currentXP}/{skill.maxXP}) XP</p>
                                    </div>)
                            }
                        </div>
                    ) : (
                        <div><p>Your journal is empty</p></div>
                    )}
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

export default SkillBook;