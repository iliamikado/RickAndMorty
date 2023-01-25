import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import charactersReducer from '../components/characterList/charactersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    characters: charactersReducer
  },
});
