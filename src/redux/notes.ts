import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AVIABLE_COLORS, BASE_URL } from '../utils/constants';
import axios from 'axios';
import { RootState } from './store';


export type Status = 'pending' | 'fulfilled' | 'rejected';
export interface INote {
    themeId: number,
    id: number,
    title: string,
    aviableColors: Array<string>,
    activeColor: string,
    textHTML: string,
}

export interface INoteState {
    list: Array<INote>,
    saved: boolean
}

const initialState: INoteState = {
    list: [],
    saved: false
};

export const getNotes = createAsyncThunk(
    'getNotes',

    async (id: number, thunkAPI) => {
        try {
            const res = await axios.get(`${BASE_URL}/notes?themesId=${id}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const deleteNote = createAsyncThunk(
    "deleteNote",
    async (id: number, thunkAPI) => {
        try {
            const res = await axios.delete(`${BASE_URL}/notes/${id}`);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);



export const changeNote = createAsyncThunk(
    "changeNote",
    async (note: INote, thunkAPI) => {
        try {
            const res = await axios.put(`${BASE_URL}/notes/${note.id}`, note);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);


export const addNote = createAsyncThunk<INote, number, { state: RootState } >(
    "addNote",
    async (themeId: number, thunkAPI) => {
        try {
            const newNote = {
                themeId: themeId,
                title: "",
                aviableColors: AVIABLE_COLORS,
                activeColor: AVIABLE_COLORS[0],
                textHTML: ""
            };
            const res = await axios.post(`${BASE_URL}/notes/`, newNote);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setUnsaved: state => {
            state.saved = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNotes.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(changeNote.fulfilled, (state: INoteState, action: PayloadAction<INote>) => {
            const currentNote = state.list.find((Note: INote) => Note.id === action.payload.id);
            if (currentNote !== undefined)
                currentNote.activeColor = action.payload.activeColor;
            state.saved = true
        });
        builder.addCase(addNote.fulfilled, (state: INoteState, action: PayloadAction<INote>) => {
            state.list.push(action.payload);
        });
        builder.addCase(deleteNote.fulfilled, (state: INoteState, action: PayloadAction<number>) => {
            const index = state.list.findIndex(theme => theme.id === action.payload);
            state.list.splice(index, 1)
        });
    },
});


export default notesSlice.reducer;
export const { setUnsaved } = notesSlice.actions;