import '../StyleSheets/GameStyle.css';

interface ToolbarProps {
    characterSheet: () => void;
    equipment: () => void;
    inventory: () => void;
    journal: () => void;
    mainMenu: () => void;
    skill: () => void;
}
function Toolbar({ characterSheet, equipment, inventory, journal, mainMenu,skill }: ToolbarProps) {
    return (
        <div className="toolbar-options">
            <button className="toolbar-button">
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
            <button className="toolbar-button">
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