import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
//import { Item } from "../Models/ItemModel"
//import { addItemToInventory, removeItemFromInventory } from "../Utils/InventoryUtils"; // Assuming you put it there
//import { InnShop, ShopModel } from "../Models/ShopModel"

import {/* useState, */useEffect } from "react";
import type { SkillNodeModel } from '../Models/SkillNodeModel';
//import Inventory from './InventoryComponent';

interface SkillNodeProps {
    hero: Character;
    back: () => void
    skillNode: SkillNodeModel
    onUpdateHero: (updatedHero: Character) => void;
    addGameLog: (message: string) => void;
}
//might need to seperate based on crafting/gathering
function SkillNode({ hero, back, skillNode,/* onUpdateHero, addGameLog*/ }: SkillNodeProps) {
    //const [activeScreen, setActiveScreen] = useState<ShopState>("Buy");
    //const [currentHero, setCurrentHero] = useState(hero);
    //const resources = skillNode
    useEffect(() => {
        //setCurrentHero(hero);
    }, [hero]);

    return (
        <div id="shop" className="game-layout-grid">
            <div className="toolbar">
                <h2>{skillNode.name}</h2>
            </div>
            <div className="game-content-left">
                <h3>Placeholder</h3>
            </div>
            <div className="game-content-main">
                <h3>Recipe selection?</h3>
            </div>
            <div className="area-options">
                <h3>Options</h3>
                <button className='area-button' onClick={() => back()}>Leave</button>
            </div>
            <div className="game-content-bottom">
                <h3>Interaction / Status</h3>
                <p>Placeholder for Bottom Panel</p>
            </div>
        </div>
    );
}

export default SkillNode;