import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
interface PartySidebarProps {
    hero:Character
    party: Character[];
}
function PartySidebar({hero, party }: PartySidebarProps) {
    return (
        <div>
            <h3>Party</h3>
        
                    <p>{hero.name} - LV: {hero.level}</p>
                    <p>HP: {hero.currentHP}/{hero.maxHP}</p>
                    <p>HP: {hero.currentMP}/{hero.maxMP}</p>
                    <p>HP: {hero.currentSP}/{hero.maxSP}</p>
        
            {party.map((partyMember, index) => (
                <div key={index}>
                    <p>{partyMember.name} - LV: {partyMember.level}</p>
                    <p>HP: {partyMember.currentHP}/{partyMember.maxHP}</p>
                    <p>HP: {partyMember.currentMP}/{partyMember.maxMP}</p>
                    <p>HP: {partyMember.currentSP}/{partyMember.maxSP}</p>
                </div>
            ))}
        </div>
    );
}

export default PartySidebar;