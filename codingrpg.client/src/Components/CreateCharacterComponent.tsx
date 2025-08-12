// CreateCharacter.tsx
import '../StyleSheets/GameStyle.css';
import { Hero } from "../Models/CharacterModel";
import { useState } from 'react';

// The interface now includes the new props for the game log
interface CreateCharacterProps {
    hero: Hero;
    back: () => void;
    onCreateEnd: (heroUpdated: Hero) => void;
    addGameLog: (message: string) => void;
}

// The component accepts the new props
function CreateCharacter({ hero, back, onCreateEnd, addGameLog }: CreateCharacterProps) {
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
           <div id="character-creation"className="game-layout-grid">
            <div className="toolbar">
                <h2>Character Creation</h2>
            </div>
            <div className="game-content-left">
            </div>
            <div className="game-content-main">
               <div>
                    <label htmlFor="name-input">Select Character Name: <input id="name-input" /></label>
                </div>
            </div>
            <div className="area-options">
         <button className="area-button" onClick={() => handleCreateCharacter()}>Create Character</button>
                <button className='area-button' onClick={() => back()}>Back</button>
            </div>
            <div className="game-content-bottom">
                <h3>Placeholder</h3>
                <p>Placeholder for Bottom Panel</p>
            </div>
        </div>

    );
}

export default CreateCharacter;
