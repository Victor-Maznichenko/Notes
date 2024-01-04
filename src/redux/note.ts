import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { INote } from './notes';

const initialState: INote = {
    themeId: 0,
    id: 0,
    title: '',
    aviableColors: [],
    activeColor: '',
    textHTML: '',
};

export const getNote = createAsyncThunk(
    'getNote',

    async (id: number, thunkAPI) => {
        try {
            const res = await axios.get(`${BASE_URL}/notes?id=${id}`);
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);


export const changeNote = createAsyncThunk(
    "changeNote",
    async (note:INote, thunkAPI) => {
        try {
            const res = await axios.put(`${BASE_URL}/notes/${note.id}`, note);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNote.fulfilled, (state, action) => {
            Object.assign(state, action.payload[0]);
        });
        builder.addCase(changeNote.fulfilled, (state, action) => {
            Object.assign(state, action.payload);
        });
    },
});


export default noteSlice.reducer;