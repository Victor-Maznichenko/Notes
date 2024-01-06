import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AVIABLE_COLORS, BASE_URL } from '../utils/constants';
import axios from 'axios';
import { RootState } from './store';

export interface ITheme {
    id: number,
    title: string,
    aviableColors: Array<string>,
    activeColor: string
}

export interface IThemeState {
    list: Array<ITheme>,
    isLoading: boolean
}

const initialState: IThemeState = {
    list: [],
    isLoading: true
};

export const changeTheme = createAsyncThunk(
    "changeTheme",
    async (theme: ITheme, thunkAPI) => {
        try {
            const res = await axios.put(`${BASE_URL}/themes/${theme.id}`, theme);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const addTheme = createAsyncThunk<ITheme, undefined, { state: RootState }>(
    "addTheme",
    async (_, thunkAPI) => {
        try {
            const newTheme = {
                title: '',
                aviableColors: AVIABLE_COLORS,
                activeColor: AVIABLE_COLORS[0]
            }
            const res = await axios.post(`${BASE_URL}/themes/`, newTheme);
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);


export const deleteTheme = createAsyncThunk(
    "deleteTheme",
    async (id: number, thunkAPI) => {
        try {
            const res = await axios.delete(`${BASE_URL}/themes/${id}`);
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);


const themesSlice = createSlice({
    name: 'themes',
    initialState,
    reducers: {
        getThemes(state, { payload }) {
            state.list = payload ?? [];
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(changeTheme.fulfilled, (state: IThemeState, action: PayloadAction<ITheme>) => {
            const currentTheme = state.list.find((theme: ITheme) => theme.id === action.payload.id);
            if (currentTheme !== undefined)
                currentTheme.activeColor = action.payload.activeColor;
        });
        builder.addCase(addTheme.fulfilled, (state: IThemeState, action: PayloadAction<ITheme>) => {
            state.list.push(action.payload);
        });
        builder.addCase(deleteTheme.fulfilled, (state, action: PayloadAction<number>) => {
            console.log(action)
            const index = state.list.findIndex(theme => theme.id === action.payload);
            state.list.splice(index, 1)
        });
    },
});


export const { getThemes } = themesSlice.actions;
export default themesSlice.reducer;