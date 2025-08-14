/* eslint-disable no-empty-pattern */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Hero } from "../Models/CharacterModel"
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
        setHero(state, action: PayloadAction<Hero>) {
            state.hero = action.payload;
        }
    }
});

export const {
    setHero
} = gameSlice.actions;

export default gameSlice.reducer;