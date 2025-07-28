import '../StyleSheets/GameStyle.css';
import { Character} from "../Models/CharacterModel";

interface CharacterSheetProps {
    hero: Character;
    back:()=> void
}
function CharacterSheet({hero,back }: CharacterSheetProps) {
  return (
      <div id="character-sheet">
          <h2>Character Sheet</h2>
          <h3>Base Stats</h3>
          <p>Name: {hero.name}</p>
          <p>Level: {hero.level} ({hero.currentXP}/{hero.maxXP})</p>
          <p>HP: {hero.currentHP}/{hero.maxHP}</p>
          <h3>Inventory</h3>
          <p>Weapon: {hero.weapon.name} ({hero.weapon.power} DMG)</p>
          <div className="menu">
              <button className='menu-button' onClick={() => back()}>Back</button>
          </div>      </div>  
  );
}

export default CharacterSheet;