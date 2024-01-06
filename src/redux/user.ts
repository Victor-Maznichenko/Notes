import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const initialState = {
    email: null,
    displayName: null,
    photoURL: null,
    isLoading: true,
    uid: ''
};

// export const getThemes = createAsyncThunk(
//     'getThemes',

//     async (_, thunkAPI) => {
//         try {
//             const res = await axios.get(`${BASE_URL}/themes`);
//             return res.data;
//         } catch (err) {
//             console.log(err);
//             return thunkAPI.rejectWithValue(err);
//         }
//     }
// );

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInUser(state, { payload }) {
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.uid = payload.uid;
            state.isLoading = false
        },
        signOutUser(state) {
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.uid = '';
            state.isLoading = false
        },
        notLoading(state) {
            state.isLoading = false
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(getThemes.fulfilled, (state, action) => {
    //         state.list = action.payload;
    //     });
    // },
})

export const { signInUser, signOutUser, notLoading } = userSlice.actions;
export default userSlice.reducer;