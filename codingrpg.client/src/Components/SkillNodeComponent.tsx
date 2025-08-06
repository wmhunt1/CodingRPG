import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
import { Item } from "../Models/ItemModel"
import { useState, useEffect } from "react";
import type { SkillNodeModel } from '../Models/SkillNodeModel';
import type { SkillRecipe } from '../Models/SkillRecipesModel';

import { instantiateCharacterItems } from "../Utils/CharacterUtils"
import { addItemToInventory, removeItemFromInventory } from "../Utils/InventoryUtils"; // Assuming you put it there

interface SkillNodeProps {
    hero: Character;
    back: () => void
    skillNode: SkillNodeModel
    onUpdateHero: (updatedHero: Character) => void;
    addGameLog: (message: string) => void;
}
function SkillNode({ hero, back, skillNode, onUpdateHero, addGameLog }: SkillNodeProps) {
    const [currentHero, setCurrentHero] = useState(hero);
    const resources = skillNode.recipes;
    useEffect(() => {
        setCurrentHero(instantiateCharacterItems(hero));
    }, [hero]);
    function rollForSuccess(successRate: number): boolean {
        return Math.random() < successRate;
    }
    function handleSkill(skill: SkillRecipe) {
        const updatedHero: Character = instantiateCharacterItems(JSON.parse(JSON.stringify(currentHero)));
        addGameLog(`${updatedHero.name} starts to ${skill.name}`)

        // 1. Check if all input items are in the inventory and remove them.
        let hasAllInputs = true;
        const tempInventory: Item[] = [...updatedHero.inventory]; // Create a temporary copy to work with

        for (const inputItem of skill.input) {
            if (!tempInventory.includes(inputItem)) {
                hasAllInputs = false;
                addGameLog(`Failure: Missing required item: ${inputItem}`);
                break; // Stop checking as soon as one is missing
            }
        }

        if (hasAllInputs) {
            // If we have all the inputs, remove them from the inventory.
            for (const inputItem of skill.input) {
                removeItemFromInventory(tempInventory, inputItem);
                addGameLog(`Removed ${inputItem} from inventory.`);
            }
            updatedHero.inventory = tempInventory;

            // 2. Roll for failure. Let's assume a 70% success rate for this example.
            const success = rollForSuccess(0.7);

            if (success) {
                addGameLog(`Success! ${updatedHero.name} successfully ${skill.name}s.`);
                // 3. If successful, add the outputs to the inventory.
                for (const outputItem of skill.output) {
                    addItemToInventory(updatedHero.inventory, outputItem);
                    addGameLog(`Added ${outputItem.name} to inventory.`);
                }
            } else {
                addGameLog(`Failure! ${updatedHero.name} fails to ${skill.name}.`);
                // 4. If failed, add the failure outputs to the inventory.
                for (const failureOutputItem of skill.failureOutput) {
                    addItemToInventory(updatedHero.inventory, failureOutputItem);
                    addGameLog(`Added ${failureOutputItem.name} to inventory.`);
                }
            }
        } else {
            addGameLog(`Skill failed due to missing ingredients.`);
        }

        // 5. Update the hero's state
        setCurrentHero(updatedHero);
        onUpdateHero(updatedHero);
        addGameLog(``);
    }
    return (
        <div id="skillNode" className="game-layout-grid">
            <div className="toolbar">
                <h2>{skillNode.name}</h2>
            </div>
            <div className="game-content-left">
                <h3>Placeholder</h3>
            </div>
            <div className="game-content-main">
                <div className="skill-recipe-display-area">
                    <div className="skill-recipe-container">
                        <h3>{skillNode.name}</h3>
                        <div className="skill-recipe">
                            {resources.map((skill, index) => (
                                <div key={index}>
                                    <p>{skill.name}</p>
                                    <p>
                                        Input:
                                        {skill.input.map((inputItem, inputIndex) => (
                                            <span key={inputIndex}>
                                                {inputItem.name}
                                                {inputIndex < skill.input.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </p>
                                    <p>
                                        Output:
                                        {skill.output.map((outputItem, outputIndex) => (
                                            <span key={outputIndex}>
                                                {outputItem.name}
                                                {outputIndex < skill.output.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </p>
                                    <button className="skill-button" onClick={() => handleSkill(skill)}>{skill.verb}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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