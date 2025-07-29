import '../StyleSheets/GameStyle.css';
import { Hero } from "../Models/CharacterModel";
import { useState } from 'react'
import Log from ".//LogComponent"; // <--- Import your new component here
interface CreateCharacterProps {
    hero: Hero;
    back:()=>void
}
function CreateCharacter({ hero, back }: CreateCharacterProps) {
    const [newHero, setNewHero] = useState(hero)
    const [gameLog, setGameLog] = useState<string[]>(["Create your character"]);
    const handleCreateCharacter = () => {
        const inputElement = document.getElementById('name-input') as HTMLInputElement;
        newHero.name = inputElement.value;
        console.log(newHero.name)
        if (newHero.name !== "") {
            setNewHero(newHero);
            setGameLog(prevLog => [...prevLog, `Hello, ${hero.name}`]);
            //setActive("Game");
        }
        else {
            setGameLog(prevLog => [...prevLog, `Please name your Character`]);
        }
    }
  return (
      <div className="char-creation">
          <h2>Character Creation</h2>
          <div>
              <label htmlFor="name-input">Select Character Name: <input id="name-input" ></input></label>
          </div>
          <div>
              <button className="menu-button" onClick={() => handleCreateCharacter()}>Create Character</button>
              <button className='menu-button' onClick={() => back()}>Back</button>
          </div>
          <Log logEntries={gameLog}></Log>
      </div>
  );
}

export default CreateCharacter;