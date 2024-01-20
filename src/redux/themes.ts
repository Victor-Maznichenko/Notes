import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore/lite';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AVIABLE_COLORS } from '../utils/constants';
import { db } from '../firebase';


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
        const themesRef = await getDocs(collection(db, "themes", uid, "list"));
        const themesList: Array<ITheme> = [];

        themesRef.forEach((themeRef) => {
            themesList.push({ ...<ITheme>themeRef.data(), id: themeRef.id });
        });

        return themesList;
    }
);

export const addTheme = createAsyncThunk(
    'themes/addTheme',

    async (uid: string) => {
        const newTheme = {
            title: '',
            aviableColors: AVIABLE_COLORS,
            activeColor: AVIABLE_COLORS[0]
        }
        const { id } = await addDoc(collection(db, "themes", uid, "list"), newTheme);
        await setDoc(doc(db, "themes", uid, "list", id), { ...newTheme, id });
        return { ...newTheme, id };
    }
);

export const changeTheme = createAsyncThunk(
    'themes/changeTheme',

    async ({ uid, newTheme }: { uid: string, newTheme: ITheme }) => {
        const themeRef = doc(db, `themes`, uid, "list", newTheme.id);
        await setDoc(themeRef, newTheme);
        return newTheme;
    }
);

export const deleteTheme = createAsyncThunk(
    'themes/deleteTheme',

    async ({ uid, id }: { uid: string, id: string }) => {
        const themeRef = doc(db, `themes`, uid, "list", id);
        await deleteDoc(themeRef);
        return id;
    }
);


const themesSlice = createSlice({
    name: 'themes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getThemes.fulfilled, (state, { payload }) => {
                console.log(payload)
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
                state.list = state.list.filter((theme) => theme.id !== payload);
            });
    },
});


export default themesSlice.reducer;