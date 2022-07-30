import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAxios, { setTokenHeaderAxios } from "../api/auth";


export const login = createAsyncThunk('user/login', async(payload: { email: string, password: string }, thunkApi) => {
    try {
        const userData: any = await authAxios.post('/login',payload)
        return userData
    } catch (error) {
        console.log(error)
    }
})

export const register = createAsyncThunk('user/register', async(payload: {name: string, email: string, phone: string, password: string, confirmPassword: string, roleId: string}, thunkApi) => {
    try {
        const result: any = await authAxios.post('/register',payload)
        return result
    } catch (error) {
        console.log(error)
    }
})

export const getMe = createAsyncThunk('user/getMe', async(payload: {userId: any},thunkApi) => {
    try {
        const result: any = await authAxios.post('/get-user-info',payload)
        return result
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
    errCode?: any
    errCodeRegister?: any
    message?: any
    messageRegister?: any
    token?: any
}

const initialState: AuthState = {
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.authUser = undefined
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending,(state: any,action) => {
                state.loading = true
            })
            .addCase(login.fulfilled,(state: any,action) => {
                state.loading = false
                state.token = action.payload.token
                localStorage.setItem('token', action.payload.token)
                localStorage.setItem('userId', action.payload.userId)
                localStorage.setItem('roleId', action.payload.roleId)
                setTokenHeaderAxios(action.payload.token)
            })
            .addCase(login.rejected,(state: any,action) => {
                state.loading = false
                state.error = action?.error.message || ''
            })
            .addCase(register.pending,(state: any,action) => {
                state.loading = true
            })
            .addCase(register.fulfilled,(state: any,action) => {
                state.loading = false
                state.messageRegister = action.payload.message
                state.errCodeRegister = action.payload.errCode
            })
            .addCase(register.rejected,(state: any,action) => {
                state.loading = false
                state.error = action?.error.message || ''
            })
            .addCase(getMe.pending,(state: any,action) => {
                state.loading = true
            })
            .addCase(getMe.fulfilled,(state: any,action) => {
                state.loading = false
                if(action.payload.dataUser) {
                    state.authUser = action.payload.dataUser
                }   else {
                    state.message = action.payload
                }
            })
            .addCase(getMe.rejected,(state: any,action) => {
                state.loading = false
            })

    },
})

export const {logout} = userSlice.actions

const {reducer: userReducer} = userSlice

export default userReducer