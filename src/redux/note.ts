import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { INote } from './notes';

const initialState:INote = {
    themeId: 0,
    id: 0,
    title: '',
    aviableColors: [],
    activeColor: '',
    textHTML: ''
};

export const getNote = createAsyncThunk(
    'getNote',

    async (id:number, thunkAPI) => {
        try {
            const res = await axios.get(`${BASE_URL}/notes?id=${id}`);
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);


// export const changeNote = createAsyncThunk(
//     "changeNote",
//     async (payload:INote, thunkAPI) => {
//         try {
//             const res = await axios.put(`${BASE_URL}/note/${payload.id}`, payload);
//             return res.data;
//         } catch (err) {
//             console.log(err);
//             return thunkAPI.rejectWithValue(err);
//         }
//     }
// );


export const addNote = createAsyncThunk(
    "addNote",
    async (payload:INote, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/note/`, payload);
            return res.data;
        } catch (err) {
            console.log(err);
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
            state.list = action.payload;
        });
        // builder.addCase(changeNote.fulfilled, (state:INotetate, action:PayloadAction<INote>) => {
        //     const currentNote = state.list.find((Note:INote) => Note.id === action.payload.id);
        //     if (currentNote !== undefined)
        //         currentNote.activeColor = action.payload.activeColor;
        // });
    },
});


export default noteSlice.reducer;