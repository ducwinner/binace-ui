import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAxios from "../api/auth";


export const login = createAsyncThunk('user/login', async(payload: { email: string, password: string }, thunkApi) => {
    try {
        const userData: any = await authAxios.post('',payload)
        return userData
    } catch (error) {
        console.log(error)
    }
})


interface AuthUser {
    id: number,
    email: string,
    phoneNumber: string,
    password: string,
    fullName: string,
    image: any,
    adress: any,
    roleid: any,
    createdAt: any,
    updatedAt: any
}

interface AuthState {
    loading: boolean,
    authUser?: AuthUser
}

const initialState: AuthState = {
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(login.fulfilled,(state: any,action) => {
            state.authUser = action.payload
        })
    },
})

const {reducer: userReducer} = userSlice

export default userReducer