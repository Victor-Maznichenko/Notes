import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INote } from './notes';
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';

interface INoteState {
    note: INote,
    isLoading: boolean,
    isSuccess: boolean
}

const initialState: INoteState = {
    note: {
        id: '',
        title: '',
        aviableColors: [],
        activeColor: '',
        textHTML: '',
        themeID: '',
    },
    isLoading: true,
    isSuccess: false

};

export const getNote = createAsyncThunk(
    'note/getNote',

    async ({ uid, themeID, noteID }: { uid: string, themeID: string, noteID: string }) => {
        const noteRef = doc(db, "notes", uid, themeID, noteID);
        const note = await getDoc(noteRef);
        return <INote>note.data();
    }
);

export const changeNote = createAsyncThunk(
    'note/changeNote',

    async ({ uid, themeID, newNote }: { uid: string, themeID: string, newNote: INote }) => {
        const noteRef = doc(db, 'notes', uid, themeID, newNote.id);
        await setDoc(noteRef, newNote);
        return newNote.textHTML;
    }
);

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNote.fulfilled, (state, { payload }) => {
                state.note = payload;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(changeNote.fulfilled, (state, { payload }) => {
                state.textHTML = payload;
            });
    }
});


export default noteSlice.reducer;