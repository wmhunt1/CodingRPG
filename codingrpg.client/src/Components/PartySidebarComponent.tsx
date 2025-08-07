import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
interface PartySidebarProps {
    party: Character[];
}
function PartySidebar({ party }: PartySidebarProps) {
    return (
        <div>
            <h3>Party</h3>
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