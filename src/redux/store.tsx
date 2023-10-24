import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import themes from './themes'
import notes from './notes'


export const store = configureStore({
    reducer: {
        themes,
        notes
    },
    devTools: true
});


export const useStoreDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>;