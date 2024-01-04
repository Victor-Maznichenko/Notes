/* import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';

export interface IUser {
    id: number,
    email: string,
    password: string,
}

const initialState: IUser = {
    id: 0,
    email: '',
    password: '',
};

export interface IUserForm {
    email: string;
    password: string;
}


export const registerUser = createAsyncThunk(
    "registerUser",
    async (user: IUserForm, thunkAPI) => {
        try {
            const res = await axios.post(`${BASE_URL}/register/`, user);
            return res.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const loginUser = createAsyncThunk(
    "loginUser",
    async (user: IUserForm, thunkAPI) => {
        console.log(user)
        try {
            const res = await axios.post(`${BASE_URL}/login/`, user);
            return res.data.user;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, { payload }) => {
            state.info = payload;
            state.isLogin = true;
        });
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.info = payload;
            state.isLogin = true;
        });
    },
});


export default userSlice.reducer; */