import '../StyleSheets/GameStyle.css';
//import { Character } from "../Models/CharacterModel";
//import {Item } from "../Models/ItemModel"



interface ShopProps {
    //hero: Character;
    back: () => void
    //shopInventory: Item[]
}
function CharacterSheet({back}: ShopProps) {
    return (
        <div id="shop">
            <div className="menu">
                <button className='menu-button' onClick={() => back()}>Back</button>
            </div>
        </div>
    );
}

export default CharacterSheet;