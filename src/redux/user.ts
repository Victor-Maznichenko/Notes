import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        uid: '',
        email: '',
        displayName: '',
        photoURL: ''
    },
    isLoading: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInUser(state, { payload }) {
            state.user.email = payload.email;
            state.user.displayName = payload.displayName;
            state.user.photoURL = payload.photoURL;
            state.user.uid = payload.uid;
            state.isLoading = false;
        },
        signOutUser(state) {
            state.user.email = '';
            state.user.displayName = '';
            state.user.photoURL = '';
            state.user.uid = '';
            state.isLoading = false
        },
        notLoading(state) {
            state.isLoading = false
        }
    }
})

export const { signInUser, signOutUser, notLoading } = userSlice.actions;
export default userSlice.reducer;