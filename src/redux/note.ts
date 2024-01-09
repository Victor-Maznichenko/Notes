import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { INote } from './notes';
import { get, getDatabase, ref, update } from 'firebase/database';

const initialState: INote = {
    id: '0',
    title: '',
    aviableColors: [],
    activeColor: '',
    textHTML: '',
};

export const getNote = createAsyncThunk(
    'note/getNote',

    async ({ uid, themeID, noteID }: { uid: string, themeID:string, noteID: string }) => {
        const db = getDatabase();
        const dbRef = ref(db, `user-notes/${uid}/${themeID}/${noteID}`);

        const result = await get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
        }).catch((error) => {
            console.error(error);
        });

        return result;

    }
);

export const changeNote = createAsyncThunk(
    'note/changeNote',

    async ({ uid, themeID, newNote }: { uid: string, themeID:string, newNote: INote }) => {
        const db = getDatabase();
        const updates = { [`user-notes/${uid}/${themeID}/${newNote.id}`]: newNote };
        await update(ref(db), updates);
        return newNote;
    }
);

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getNote.fulfilled, (state, { payload }) => {
            payload && Object.assign(state, payload);
        })
        .addCase(changeNote.fulfilled, (state, { payload }) => {
            state.textHTML = payload.textHTML;
        });
    },

});


export default noteSlice.reducer;