import { configureStore } from '@reduxjs/toolkit';
import substancesSlice from './slices/substances';

export const store = configureStore({
    reducer: {
        substances: substancesSlice.reducer
    }
})
