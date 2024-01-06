import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import themes from './themes'
import notes from './notes'
import note from './note'
import user from './user'


export const store = configureStore({
    reducer: {
        themes,
        notes,
        note,
        user
    },
    devTools: true
});


export const useStoreDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>;