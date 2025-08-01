// CreateCharacter.tsx
import '../StyleSheets/GameStyle.css';
import { Hero } from "../Models/CharacterModel";
import { useState } from 'react';
import Log from ".//LogComponent";

// The interface now includes the new props for the game log
interface CreateCharacterProps {
    hero: Hero;
    back: () => void;
    onCreateEnd: (heroUpdated: Hero) => void;
    gameLog: string[];
    addGameLog: (message: string) => void;
}

// The component accepts the new props
function CreateCharacter({ hero, back, onCreateEnd, gameLog, addGameLog }: CreateCharacterProps) {
    const [newHero, setNewHero] = useState(hero);
    // The local gameLog state is removed and replaced by the prop.
    // const [gameLog, setGameLog] = useState<string[]>(["Create your character"]);

    const handleCreateCharacter = () => {
        const inputElement = document.getElementById('name-input') as HTMLInputElement;
        newHero.name = inputElement.value;
        console.log(newHero.name);

        if (newHero.name !== "") {
            setNewHero(newHero);
            // We now call the function passed down from the parent component
            addGameLog(`Hello, ${newHero.name}! Let your adventure begin.`);
            onCreateEnd(newHero);
        } else {
            // We use the prop function to send messages to the main log
            addGameLog(`Please name your character.`);
        }
    };

    return (
        <div className="char-creation">
            <h2>Character Creation</h2>
            <div>
                <label htmlFor="name-input">Select Character Name: <input id="name-input" /></label>
            </div>
            <div>
                <button className="menu-button" onClick={() => handleCreateCharacter()}>Create Character</button>
                <button className='menu-button' onClick={() => back()}>Back</button>
            </div>
            {/* The Log component now displays the gameLog passed as a prop */}
            <Log logEntries={gameLog} />
        </div>
    );
}

export default CreateCharacter;
