/* eslint-disable no-empty-pattern */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Hero } from "../Models/CharacterModel"
import { Item } from "../Models/ItemModel"
import { addItemToInventory, removeItemFromInventory } from '../Utils/InventoryUtils';
interface GameState {
    hero: Hero;
}

const initialState: GameState = {
    hero: new Hero("hero")

}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        updateHero(state, action: PayloadAction<Hero>) {
            state.hero = action.payload;
        },
        addIventoryItem(state, action: PayloadAction<Item>) {
            addItemToInventory(state.hero.inventory, action.payload, 1);
        },
        removeInventoryItem(state, action: PayloadAction<Item>) {
            removeItemFromInventory(state.hero.inventory, action.payload, 1);
        }
    }
});

export const {
    updateHero, addIventoryItem, removeInventoryItem
} = gameSlice.actions;

export default gameSlice.reducer;