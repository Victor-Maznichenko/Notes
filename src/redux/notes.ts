import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { child, get, getDatabase, push, ref, remove, update } from 'firebase/database';
import { AVIABLE_COLORS } from '../utils/constants';
import { query } from 'firebase/database';

export interface INote {
    id: string,
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
        const db = getDatabase();
        const dbRef = query(ref(db, `user-notes/${uid}/${themeID}`));
        const result = await get(dbRef).then((snapshot: { val: () => { [s: string]: INote; }, exists: () => boolean }) => {
            if (snapshot.exists()) {
                return Object.values(snapshot.val());
            }
        }).catch((error) => {
            console.error(error);
        });
        return result ?? [];
    }
);

export const addNote = createAsyncThunk(
    'notes/addNote',

    async ({ uid, themeID }: { uid: string, themeID: string }) => {
        const db = getDatabase();
        const id = push(child(ref(db), `user-notes/${uid}/${themeID}`)).key ?? '';
        const newNote = {
            id,
            title: '',
            aviableColors: AVIABLE_COLORS,
            activeColor: AVIABLE_COLORS[0],
            textHTML: ''
        }
        const updates = { [`user-notes/${uid}/${themeID}/${id}`]: newNote };

        await update(ref(db), updates);
        return newNote;
    }
);

export const changeNote = createAsyncThunk(
    'notes/changeNote',

    async ({ uid, themeID, newNote }: { uid: string, themeID:string, newNote: INote }) => {
        const db = getDatabase();
        const updates = { [`user-notes/${uid}/${themeID}/${newNote.id}`]: newNote };
        await update(ref(db), updates);
        return newNote;
    }
);

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',

    async ({ uid, themeID, noteID }: { uid: string, themeID:string, noteID: string }) => {
        const db = getDatabase();
        const dbRef = ref(db, `user-notes/${uid}/${themeID}/${noteID}`);
        await remove(dbRef);
        return noteID;
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
                if (currentNote)
                    currentNote.activeColor = payload.activeColor;
            })
            .addCase(deleteNote.fulfilled, (state, { payload }) => {
                const index = state.list.findIndex(note => note.id === payload);
                state.list.splice(index, 1)
            });
    },
});


export default notesSlice.reducer;