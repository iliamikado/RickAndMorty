import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    characters: [],
    status: 'idle',
    filters: {
        name: '',
        gender: 'all',
        origin: -1
    },
    openedLocation: {opened: false, id: 1}
}

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        loadMoreCharacters: (state, action) => {
            state.characters = [...state.characters, ...action.payload];
        },
        loadNewCharacters: (state, action) => {
            state.characters = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = {...state.filters, ...action.payload};
        },
        openLocation: (state, action) => {
            state.openedLocation.opened = true;
            state.openedLocation.id = action.payload;
        },
        closeLocation: (state) => {
            state.openedLocation.opened = false;
        }
    }
});

export const {loadMoreCharacters, loadNewCharacters, setFilters, openLocation, closeLocation} = charactersSlice.actions;

export default charactersSlice.reducer;