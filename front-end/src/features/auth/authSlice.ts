import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import { IUser } from "app/interfaces"
import * as authService from "./authService"


// load user data
export const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, thunkAPI) => {
        return await authService.loadUser()
            .catch(thunkAPI.rejectWithValue);
    }
)

// Logout user thunk
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, thunkAPI) => {
        return await authService.logout()
            .catch(thunkAPI.rejectWithValue)
    }
)


type AuthState = {
    user: null | IUser;
    isLoading: boolean;
    errorMsg: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    errorMsg: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // load user
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.errorMsg = null
                state.user = action.payload
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false
                state.errorMsg = action.payload as string
                state.user = null
            })
            // logout user
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false
                state.errorMsg = null
                state.user = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false
                state.errorMsg = action.payload as string
            })
    }
})

export default authSlice.reducer