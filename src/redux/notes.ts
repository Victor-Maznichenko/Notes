import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';


export type Status = 'pending' | 'fulfilled' | 'rejected';
export interface INote {
    themeId: number,
    id: number,
    title: string,
    aviableColors: Array<string>,
    activeColor: string,
    textHTML: string,
}

export interface INotestate {
    list: Array<INote>
}

const initialState: INotestate = {
    list: []
};

export const getNotes = createAsyncThunk(
    'getNotes',

    async (id: number, thunkAPI) => {
        try {
            const res = await axios.get(`${BASE_URL}/notes?themesId=${id}`);
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);


export const deleteNote = createAsyncThunk(
    "deleteNote",
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



export const changeNote = createAsyncThunk(
    "changeNote",
    async (note: INote, thunkAPI) => {
        try {
            const res = await axios.put(`${BASE_URL}/notes/${note.id}`, note);
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);


export const addNote = createAsyncThunk(
    "addNote",
    async (payload: INote, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/notes/`, payload);
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);


const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNotes.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(changeNote.fulfilled, (state: INotestate, action: PayloadAction<INote>) => {
            const currentNote = state.list.find((Note: INote) => Note.id === action.payload.id);
            if (currentNote !== undefined)
                currentNote.activeColor = action.payload.activeColor;
        });
        builder.addCase(addNote.fulfilled, (state: INotestate, action: PayloadAction<INote>) => {
            state.list.push(action.payload);
        });
        builder.addCase(deleteNote.fulfilled, (state: INotestate, action: PayloadAction<number>) => {
            const index = state.list.findIndex(theme => theme.id === action.payload);
            state.list.splice(index, 1)
        });
    },
});


export default notesSlice.reducer;