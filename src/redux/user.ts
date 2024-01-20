import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    isLoading: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInUser(state, { payload }) {
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.uid = payload.uid;
            state.isLoading = false;
        },
        signOutUser(state) {
            state.email = '';
            state.displayName = '';
            state.photoURL = '';
            state.uid = '';
            state.isLoading = false
        },
        setNotLoading(state) {
            state.isLoading = false
        }
    }
})

export const { signInUser, signOutUser, setNotLoading } = userSlice.actions;
export default userSlice.reducer;