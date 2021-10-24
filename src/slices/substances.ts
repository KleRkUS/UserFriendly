import { createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { ISubstance } from "../types";

export type ISubstancesSlice = ISubstance[];

const initialState: ISubstancesSlice = [];

const save = (state: ISubstancesSlice, action: PayloadAction<ISubstancesSlice>) => action.payload;

const substancesSlice = createSlice<ISubstancesSlice, SliceCaseReducers<ISubstancesSlice>, 'substances'>({
    name: 'substances',
    initialState,
    reducers: {
        saveSubstances: save
    }
});

export default substancesSlice;
export const { saveSubstances } = substancesSlice.actions;
