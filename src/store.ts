import { configureStore } from '@reduxjs/toolkit';
import substancesSlice, { ISubstancesSlice } from './slices/substances';

export interface IAppState {
    substances: ISubstancesSlice;
}

export const store = configureStore({
    reducer: {
        substances: substancesSlice.reducer
    }
})
