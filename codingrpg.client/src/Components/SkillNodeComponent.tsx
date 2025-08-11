import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
import { Item } from "../Models/ItemModel"
import { useState, useEffect } from "react";
import { Skill } from "../Models/SkillModel"
import type { SkillNodeModel } from '../Models/SkillNodeModel';
import type { SkillRecipe } from '../Models/SkillRecipesModel';

import { instantiateCharacterItems } from "../Utils/CharacterUtils"
import { addItemToInventory, removeItemFromInventory } from "../Utils/InventoryUtils"; // Assuming you put it there
import { addSkillXP } from '../Utils/SkillUtil';

interface SkillNodeProps {
    hero: Character;
    back: () => void
    skillNode: SkillNodeModel
    onUpdateHero: (updatedHero: Character) => void;
    addGameLog: (message: string) => void;
}

// Helper function to format an array of items into a human-readable string with quantities
const formatItemsList = (items: Item[]): string => {
    if (items.length === 0) {
        return "Nothing";
    }
    return items.map(item => `${item.name} x ${item.quantity}`).join(', ');
};

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
        let updatedHero: Character = instantiateCharacterItems(JSON.parse(JSON.stringify(currentHero)));

        // Get the used skill and check if the hero's level is high enough
        const usedSkill: Skill | undefined = updatedHero.skillBook.find((s => skill.skill === s.name));
        if (!usedSkill || usedSkill.level < skill.levelReq) {
            addGameLog(`Failure: ${skill.name} requires at least level ${skill.levelReq} in ${skill.skill}`);
            return;
        }

        // Check for required tool
        if (skill.tool !== "N/A") {
            const hasTool = updatedHero.inventory.some(inventoryItem => inventoryItem.subType === skill.tool);
            if (!hasTool) {
                addGameLog(`Failure: You do not have a(n) ${skill.tool}`);
                return;
            }
        }

        addGameLog(`${updatedHero.name} starts to ${skill.name}`);

        // Check for all required input items
        let hasAllInputs = true;
        const tempInventory: Item[] = [...updatedHero.inventory];
        for (const inputItem of skill.input) {
            const hasItem = tempInventory.some(inventoryItem => inventoryItem.name === inputItem.name && inventoryItem.quantity >= inputItem.quantity);
            if (!hasItem) {
                hasAllInputs = false;
                addGameLog(`Failure: Missing required item: ${inputItem.name} x ${inputItem.quantity}`);
                break;
            }
        }

        if (hasAllInputs) {
            // Remove all input items from the inventory.
            for (const inputItem of skill.input) {
                removeItemFromInventory(tempInventory, inputItem, inputItem.quantity);
            }
            updatedHero.inventory = tempInventory;

            // Log the removal of all inputs with one message
            addGameLog(`Removed ${formatItemsList(skill.input)} from inventory.`);

            // Roll for success
            const success = rollForSuccess(0.7);

            if (success) {
                addGameLog(`Success!`);
                // Add the outputs to the inventory.
                for (const outputItem of skill.output) {
                    addItemToInventory(updatedHero.inventory, outputItem, outputItem.quantity);
                }
                // Add skill XP and log
                updatedHero = addSkillXP(updatedHero, skill.skill, skill.xp, addGameLog);
                // Log the addition of all outputs with one message
                addGameLog(`Added ${formatItemsList(skill.output)} to inventory.`);

            } else {
                addGameLog(`Failure! ${updatedHero.name} fails to ${skill.name}.`);
                // Add the failure outputs to the inventory.
                for (const failureOutputItem of skill.failureOutput) {
                    addItemToInventory(updatedHero.inventory, failureOutputItem, failureOutputItem.quantity);
                }
                // Log the addition of all failure outputs with one message
                addGameLog(`Added ${formatItemsList(skill.failureOutput)} to inventory.`);
            }
        } else {
            addGameLog(`Skill failed due to missing ingredients.`);
        }

        // Update the hero's state
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
                            {resources
                                .sort((a, b) => a.levelReq - b.levelReq)
                                .map((skill, index) => (
                                    <div key={index}>
                                        <p>{skill.name}</p>
                                        <p>Required Level: {skill.levelReq}</p>
                                        <p>XP: {skill.xp}</p>
                                        <p>Tool: {skill.tool}</p>
                                        <p>
                                            Input:
                                            {skill.input.map((inputItem, inputIndex) => (
                                                <span key={inputIndex}>
                                                    {inputItem.name} x {inputItem.quantity}
                                                    {inputIndex < skill.input.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                        </p>
                                        <p>
                                            Output:
                                            {skill.output.map((outputItem, outputIndex) => (
                                                <span key={outputIndex}>
                                                    {outputItem.name} x {outputItem.quantity}
                                                    {outputIndex < skill.output.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                        </p>
                                        <p>
                                            Failure Output:
                                            {skill.failureOutput.map((failureOutputItem, failureOutputIndex) => (
                                                <span key={failureOutputIndex}>
                                                    {failureOutputItem.name} x {failureOutputItem.quantity}
                                                    {failureOutputIndex < skill.failureOutput.length - 1 ? ', ' : ''}
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