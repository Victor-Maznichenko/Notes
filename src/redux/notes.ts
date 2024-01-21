import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore/lite';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AVIABLE_COLORS } from '../utils/constants';
import { db } from '../firebase';

export interface INote {
    id: string,
    themeID: string,
    title: string,
    aviableColors: Array<string>,
    activeColor: string,
    textHTML: string,
}

export interface INoteState {
    list: Array<INote>,
    isLoading: boolean
}

const initialState: INoteState = {
    list: [],
    isLoading: true
};


export const getNotes = createAsyncThunk(
    'notes/getNotes',

    async ({ uid, themeID }: { uid: string, themeID: string }) => {
        const notesRef = await getDocs(collection(db, "notes", uid, themeID));
        const notesList: Array<INote> = [];

        notesRef.forEach((noteRef) => {
            notesList.push({ ...<INote>noteRef.data(), id: noteRef.id });
        });

        return notesList;
    }
);

export const addNote = createAsyncThunk(
    'notes/addNote',

    async ({ uid, themeID }: { uid: string, themeID: string }) => {
        const newNote = {
            title: '',
            themeID: themeID,
            aviableColors: AVIABLE_COLORS,
            activeColor: AVIABLE_COLORS[0],
            textHTML: ''
        }
        const { id } = await addDoc(collection(db, "notes", uid, themeID), newNote);
        await setDoc(doc(db, "notes", uid, themeID, id), { ...newNote, id });
        return { ...newNote, id };
    }
);

export const changeNote = createAsyncThunk(
    'notes/changeNote',

    async ({ uid, themeID, newNote }: { uid: string, themeID: string, newNote: INote }) => {
        const noteRef = doc(db, `notes`, uid, themeID, newNote.id);
        await setDoc(noteRef, newNote);
        return newNote;
    }
);

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',

    async ({ uid, themeID, id }: { uid: string, themeID: string, id: string }) => {
        const noteRef = doc(db, `notes`, uid, themeID, id);
        await deleteDoc(noteRef);
        return id;
    }
);



const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getNotes.fulfilled, (state, { payload }) => {
                state.list = payload;
                state.isLoading = false;
            })
            .addCase(addNote.fulfilled, (state, { payload }) => {
                state.list.push(payload);
            })
            .addCase(changeNote.fulfilled, (state, { payload }) => {
                const currentNote = state.list.find(note => note.id === payload.id);
                if (currentNote) {
                    currentNote.activeColor = payload.activeColor;
                    currentNote.title = payload.title;
                }
            })
            .addCase(deleteNote.fulfilled, (state, { payload }) => {
                const index = state.list.findIndex(note => note.id === payload);
                state.list.splice(index, 1)
            });
    },
});


export default notesSlice.reducer;