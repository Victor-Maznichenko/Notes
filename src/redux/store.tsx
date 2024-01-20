import { configureStore } from "@reduxjs/toolkit";
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


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;