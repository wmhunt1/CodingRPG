import { useState, useEffect } from 'react';
import { DialogueManager } from "../Models/DialogueNodeModel"
import type { DialogueNode } from "../Models/DialogueNodeModel"

// Interfaces for clear typing of the dialogue data structure.


// Create a single instance of the dialogue manager to be used in the application.

// The main App component that combines the game layout and the dialogue system.
interface DialogueSystemProps {
    dialogueManager: DialogueManager
    //dialogueData: DialogueNode[]
    back: () => void
}
export default function DialogueSystem({dialogueManager, back }: DialogueSystemProps) {
    //const dialogueManager = useMemo(() => new DialogueManager(dialogueData), [dialogueData]);
    // State to hold the current dialogue node ID.
    const [currentNodeId, setCurrentNodeId] = useState(1);
    const [currentDialogue, setCurrentDialogue] = useState<DialogueNode | undefined>(dialogueManager.findNode(1));

    // State to manage the visibility of the dialogue box.
    const [isDialogueVisible, setIsDialogueVisible] = useState(true);

    // useEffect to update the current dialogue whenever the node ID changes.
    useEffect(() => {
        if (currentNodeId) {
            setCurrentDialogue(dialogueManager.findNode(currentNodeId));
        }
    }, [currentNodeId,dialogueManager]);

    // Handler for when a choice is clicked.
    const handleChoiceClick = (nextId: number) => {
        if (nextId) {
            setCurrentNodeId(nextId);
        } else {
            setIsDialogueVisible(false);
        }
    };

    // This function will render the dialogue UI.
    const renderDialogue = () => {
        if (!currentDialogue) {
            return <p>Error: Dialogue node not found.</p>;
        }

        return (
            <div className="w-full h-full p-6 md:p-8 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
                {/* Character Name */}
                <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4">
                    {currentDialogue.character}
                </h2>

                {/* Dialogue Text */}
                <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6 border-l-4 border-blue-500 pl-4">
                    {currentDialogue.text}
                </p>

                {/* Choices Container */}
                <div className="space-y-3">
                    {currentDialogue.choices.length > 0 ? (
                        currentDialogue.choices.map((choice, index) => (
                            <button
                                key={index}
                                onClick={() => handleChoiceClick(choice.nextId)}
                                className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                {choice.text}
                            </button>
                        ))
                    ) : (
                            <div className="text-center">
                                <p className="text-xl text-white mb-4">Conversation has ended.</p>
                                <button
                                    onClick={() => {
                                        setCurrentNodeId(1);
                                        setIsDialogueVisible(true);
                                    }}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
                                >
                                    Restart Dialogue
                                </button>
                            </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full flex flex-col items-center justify-center p-4">
            <div className="game-layout-grid grid grid-cols-3 grid-rows-[auto_1fr_auto] gap-4 w-full h-full max-w-7xl max-h-[90vh]">
                <div className="col-span-3 toolbar bg-gray-800 rounded-lg shadow p-4 text-white">
                    {/*    <h2>Game Title</h2>*/}
                    <h2>Dialogue</h2>
                </div>

                <div className="game-content-left col-span-1 bg-gray-800 rounded-lg shadow p-4 text-white">
                    <h3>Placeholder</h3>
                </div>

                {/* The main content area where the dialogue system is rendered */}
                <div className="game-content-main col-span-1 md:col-span-2 bg-gray-900 rounded-lg shadow p-4 text-white flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
                    {isDialogueVisible ? (
                        renderDialogue()
                    ) : (
                        <div className="text-center">
                            <p className="text-xl text-white mb-4">Conversation has ended.</p>
                            <button
                                onClick={() => {
                                    setCurrentNodeId(1);
                                    setIsDialogueVisible(true);
                                }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
                            >
                                Restart Dialogue
                            </button>
                        </div>
                    )}
                </div>

                <div className="area-options col-span-3 md:col-span-1 bg-gray-800 rounded-lg shadow p-4 text-white">
                    <h3>Area Options</h3>
                    <button className='area-button w-full px-4 py-2 my-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors' onClick={() => back()}>Leave</button>
                </div>

                <div className="game-content-bottom col-span-3 md:col-span-2 bg-gray-800 rounded-lg shadow p-4 text-white">
                    <h3>Placeholder</h3>
                    <p>Placeholder for your items.</p>
                </div>
            </div>
        </div>
    );
}