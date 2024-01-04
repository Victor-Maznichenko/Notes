import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';

export interface ITheme {
    id: number,
    title: string,
    aviableColors: Array<string>,
    activeColor: string
}

export interface IThemeState {
    list: Array<ITheme>
}

const initialState: IThemeState = {
    list: []
};

export const getThemes = createAsyncThunk(
    'getThemes',

    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${BASE_URL}/themes`);
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);


export const changeTheme = createAsyncThunk(
    "changeTheme",
    async (payload: ITheme, thunkAPI) => {
        try {
            const res = await axios.put(`${BASE_URL}/themes/${payload.id}`, payload);
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);


export const addTheme = createAsyncThunk(
    "addTheme",
    async (payload: ITheme, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/themes/`, payload);
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getThemes.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(changeTheme.fulfilled, (state: IThemeState, action: PayloadAction<ITheme>) => {
            const currentTheme = state.list.find((theme: ITheme) => theme.id === action.payload.id);
            if (currentTheme !== undefined)
                currentTheme.activeColor = action.payload.activeColor;
        });
        builder.addCase(addTheme.fulfilled, (state: IThemeState, action: PayloadAction<ITheme>) => {
            state.list.push(action.payload);
        });
        builder.addCase(deleteTheme.fulfilled, (state, action: PayloadAction<number>) => {
            const index = state.list.findIndex(theme => theme.id === action.payload);
            state.list.splice(index, 1)
        });
    },
});


export default themesSlice.reducer;