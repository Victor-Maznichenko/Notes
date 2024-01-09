import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { child, get, getDatabase, push, ref, remove, update } from 'firebase/database';
import { AVIABLE_COLORS } from '../utils/constants';
export interface ITheme {
    id: string,
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

export const getThemes = createAsyncThunk(
    'themes/getThemes',

    async (uid: string) => {
        const db = getDatabase();
        const dbRef = ref(db, `user-themes/${uid}`);
        const result = await get(dbRef).then((snapshot: { val: () => { [s: string]: ITheme; }, exists: () => boolean }) => {
            if (snapshot.exists()) {
                return Object.values(snapshot.val());
            }
        }).catch((error) => {
            console.error(error);
        });

        return result ?? [];
    }
);

export const addTheme = createAsyncThunk(
    'themes/addTheme',

    async (uid: string) => {
        const db = getDatabase();
        const id = push(child(ref(db), `user-themes/${uid}`)).key ?? '';
        const newTheme = {
            id,
            title: '',
            aviableColors: AVIABLE_COLORS,
            activeColor: AVIABLE_COLORS[0]
        }
        const updates = { [`user-themes/${uid}/${id}`]: newTheme };

        await update(ref(db), updates);
        return newTheme;
    }
);

export const changeTheme = createAsyncThunk(
    'themes/changeTheme',

    async ({ uid, newTheme }: { uid: string, newTheme: ITheme }) => {
        const db = getDatabase();
        const updates = { [`user-themes/${uid}/${newTheme.id}`]: newTheme };

        await update(ref(db), updates);
        return newTheme;
    }
);

export const deleteTheme = createAsyncThunk(
    'themes/deleteTheme',

    async ({ uid, themeID }: { uid: string, themeID: string }) => {
        const db = getDatabase();
        const dbRefTheme = ref(db, `user-themes/${uid}/${themeID}`);
        const dbRefNotes = ref(db, `user-notes/${uid}/${themeID}`);
        await remove(dbRefTheme);
        await remove(dbRefNotes);
        return themeID;
    }
);


const themesSlice = createSlice({
    name: 'themes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getThemes.fulfilled, (state, { payload }) => {
                state.list = payload;
                state.isLoading = false;
            })
            .addCase(addTheme.fulfilled, (state, { payload }) => {
                state.list.push(payload);
            })
            .addCase(changeTheme.fulfilled, (state, { payload }) => {
                const currentTheme = state.list.find(theme => theme.id === payload.id);
                if (currentTheme)
                    currentTheme.activeColor = payload.activeColor;
            })
            .addCase(deleteTheme.fulfilled, (state, { payload }) => {
                const index = state.list.findIndex(theme => theme.id === payload);
                state.list.splice(index, 1)
            });
    },
});


export default themesSlice.reducer;