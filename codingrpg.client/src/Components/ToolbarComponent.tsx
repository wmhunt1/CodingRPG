import '../StyleSheets/GameStyle.css';

interface ToolbarProps {
    ability: () => void;
    characterSheet: () => void;
    equipment: () => void;
    inventory: () => void;
    journal: () => void;
    mainMenu: () => void;
    skill: () => void;
    spell: () => void;
}
function Toolbar({ ability, characterSheet, equipment, inventory, journal, mainMenu, skill, spell }: ToolbarProps) {
    return (
        <div className="toolbar-options">
            <button className="toolbar-button" onClick={ability}>
                Abilties
            </button>
            <button className="toolbar-button" onClick={characterSheet}>
                Character Sheet
            </button>
            <button className="toolbar-button" onClick={equipment}>
                Equipment
            </button>
            <button className="toolbar-button">
                Factions
            </button>
            <button className="toolbar-button" onClick={inventory}>
                Inventory
            </button>
            <button className="toolbar-button" onClick={journal}>
                Journal
            </button>
            <button className="toolbar-button">
                Map
            </button>
            <button className="toolbar-button">
                Party
            </button>
            <button className="toolbar-button" onClick={skill}>
                Skills
            </button>
            <button className="toolbar-button" onClick={spell}>
                Spellbook
            </button>
            <button className="toolbar-button" onClick={mainMenu}>
                Main Menu
            </button>
            {/*<button className="toolbar-button">*/}
            {/*    Settings*/}
            {/*</button>*/}
        </div>
    );
}

export default Toolbar;