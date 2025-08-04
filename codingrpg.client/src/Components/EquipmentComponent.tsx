// Equipment.tsx
import '../StyleSheets/GameStyle.css';
import { Character } from "../Models/CharacterModel";
import {BareBack, BareChest, BareHands, BareHead,BareFeet,BareFinger, BareFist,BareLegs, BareNeck,BareShoulders,BareWaist,BareWrists,Equipable,OffHandWeapon,Shield, EmptyHand } from "../Models/ItemModel"; // Import Item for addItemToInventory
import { useState, useEffect } from "react";
import { instantiateCharacterItems } from "../Utils/CharacterUtils"

// Import the helper function from ItemModel.ts or a separate utils file
import { addItemToInventory } from "../Utils/InventoryUtils";

interface EquipmentProps {
    hero: Character;
    back: () => void;
    onUpdateHero: (updatedHero: Character) => void;
    addGameLog: (message: string) => void;
}
function Equipment({ hero, back, onUpdateHero, addGameLog }: EquipmentProps) {
    const [currentHero, setCurrentHero] = useState(hero);

    useEffect(() => {
        setCurrentHero(instantiateCharacterItems(hero));
    }, [hero]);

    function handleUnEquipItem(itemToUnEquip: Equipable) {
        const updatedHero: Character = instantiateCharacterItems(JSON.parse(JSON.stringify(currentHero)));

        // Remove the item from its equipped slot
        if (itemToUnEquip.slot === "Chest") {
            updatedHero.chest = new BareChest();
        } else if (itemToUnEquip.slot === "Weapon") {
            updatedHero.mainHand = new BareFist(); // Assuming 'Weapon' unequips to a bare fist in the main hand
        } else if (itemToUnEquip.slot === "OffHand") {
            updatedHero.offHand = new EmptyHand(); // Assuming 'Weapon' unequips to a bare fist in the main hand
        } else if (itemToUnEquip.slot === "Head") {
            updatedHero.head = new BareHead();
        } else if (itemToUnEquip.slot === "Shoulders") {
            updatedHero.shoulders = new BareShoulders();
        } else if (itemToUnEquip.slot === "Hands") {
            updatedHero.hands = new BareHands();
        } else if (itemToUnEquip.slot === "Wrists") {
            updatedHero.wrists = new BareWrists();
        } else if (itemToUnEquip.slot === "Waist") {
            updatedHero.waist = new BareWaist();
        } else if (itemToUnEquip.slot === "Legs") {
            updatedHero.legs = new BareLegs();
        } else if (itemToUnEquip.slot === "Feet") {
            updatedHero.feet = new BareFeet();
        } else if (itemToUnEquip.slot === "Neck") {
            updatedHero.neck = new BareNeck();
        } else if (itemToUnEquip.slot === "Back") {
            updatedHero.back = new BareBack();
        } else if (itemToUnEquip.slot === "Finger") {
            updatedHero.finger = new BareFinger();
        }
        // Add more slots as needed

        // Use the common helper to add the unequipped item back to inventory
        addItemToInventory(updatedHero.inventory, itemToUnEquip);

        setCurrentHero(updatedHero);
        onUpdateHero(updatedHero);
        addGameLog(`${currentHero.name} unequipped ${itemToUnEquip.name}.`);
    }

    return (
        <div className="game-layout-grid" id="character-sheet">
            <div className="toolbar">
                <h2>{currentHero.name}'s Equipment</h2>
            </div>
            <div className="game-content-left">
                <h3>Placeholder</h3>
                <p>Placeholder</p>
            </div>
            <div className="game-content-main">
                <div className="stats-display-area">
                    <div className="stats-container">
                        <h3>Weapons</h3>
                        <div className="stats">
                            <p>Weapon: {currentHero.mainHand.name} ({currentHero.mainHand.power}) {currentHero.mainHand.name !== "Bare Fist" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.mainHand)}>UnEquip</button> : <></>}</p>
                            <p>OffHand: {currentHero.offHand.name} {currentHero.offHand instanceof OffHandWeapon ? `(${currentHero.offHand.power})` : <></>}{currentHero.offHand instanceof Shield ? `(${currentHero.offHand.protection})` : <></>}{currentHero.offHand.name !== "Empty Hand" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.offHand)}>UnEquip</button> : <></>}</p>
                        </div>
                    </div>
                    <div className="stats-container">
                        <h3>Armor</h3>
                        <div className="stats">
                            <p>Head: {currentHero.head.name} ({currentHero.head.protection}) {currentHero.head.name !== "Bare Head" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.head)}>UnEquip</button> : <></>}</p>
                            <p>Shoulders: {currentHero.shoulders.name} ({currentHero.shoulders.protection}) {currentHero.shoulders.name !== "Bare Shoulders" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.shoulders)}>UnEquip</button> : <></>}</p>
                            <p>Chest: {currentHero.chest.name} ({currentHero.chest.protection}) {currentHero.chest.name !== "Bare Chest" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.chest)}>UnEquip</button> : <></>}</p>
                            <p>Hands: {currentHero.hands.name} ({currentHero.hands.protection}) {currentHero.hands.name !== "Bare Hands" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.hands)}>UnEquip</button> : <></>}</p>
                            <p>Wrists: {currentHero.wrists.name} ({currentHero.wrists.protection}) {currentHero.wrists.name !== "Bare Wrists" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.wrists)}>UnEquip</button> : <></>}</p>
                            <p>Waist: {currentHero.waist.name} ({currentHero.waist.protection}) {currentHero.waist.name !== "Bare Waist" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.waist)}>UnEquip</button> : <></>}</p>
                            <p>Legs: {currentHero.legs.name} ({currentHero.legs.protection}) {currentHero.legs.name !== "Bare Legs" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.legs)}>UnEquip</button> : <></>}</p>
                            <p>Feet: {currentHero.feet.name} ({currentHero.feet.protection}) {currentHero.feet.name !== "Bare Feet" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.feet)}>UnEquip</button> : <></>}</p>
                        </div>
                    </div>
                    <div className="stats-container">
                        <h3>Accessories</h3>
                        <div className="stats">
                            <p>Neck: {currentHero.neck.name}{currentHero.neck.name !== "Bare Neck" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.neck)}>UnEquip</button> : <></>}</p>
                            <p>Back: {currentHero.back.name}{currentHero.back.name !== "Bare Back" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.back)}>UnEquip</button> : <></>}</p>
                            <p>Finger: {currentHero.finger.name}{currentHero.finger.name !== "Bare Finger" ? <button className="use-equip-button" onClick={() => handleUnEquipItem(currentHero.finger)}>UnEquip</button> : <></>}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="area-options">
                <h3>Area Options</h3>
                <button className='area-button' onClick={() => back()}>Back</button>
            </div>
            <div className="game-content-bottom">
                <h3>Placeholder</h3>
                <p>Placeholder for Bottom Panel</p>
            </div>
        </div>
    );
}

export default Equipment;