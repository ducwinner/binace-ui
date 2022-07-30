import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAxios from "../api/auth";




export const getFortfolio = createAsyncThunk('fortfolio/getFortfolio', async(payload: {userId: string}, thunkApi) => {
        try {
            const data: any = await authAxios.post('/fortfolio',payload)
            return data
        } catch (error) {
            console.log(error)
        }
})

export const updateDataUser = createAsyncThunk('fortfolio/updateDataUser', async(payload: {
    userId: string | null;
    coinId: string;
    priceInput: number;
    quantity: number;
  }, thunkApi) => {
    try {
        const data: any = await authAxios.post('/fortfolio/update-coin',payload)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const deleteCoinUser = createAsyncThunk('fortfolio/deleteCoinUser', async(payload: {
    userId: string | null;
    coinId: string;
  }, thunkApi) => {
    try {
        const data: any = await authAxios.post('/fortfolio/delete-coin',payload)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const addNewCoin = createAsyncThunk('fortfolio/addNewCoin', async(payload: {
    userId: string | null;
    coinId: string;
  }, thunkApi) => {
    try {
        const data: any = await authAxios.post('/fortfolio/create-coin',payload)
        return data
    } catch (error) {
        console.log(error)
    }
})



export interface DataInterFace {
    userId?: string | null,
    coinId: string,
    quantity: number,
    priceInput: number,
    createdAt?: any,
    updatedAt?: any
}

interface InitialStateInterFace {
    loading: boolean
    data: DataInterFace[]
    stateFortfolio: boolean
}

const initialState: InitialStateInterFace = {
    loading: false,
    stateFortfolio: true,
    data: [],
}

const fortfolioSlice = createSlice({
    name: 'fortfolio',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFortfolio.pending, (state: any, action) => {
                state.loading = true
            })
            .addCase(getFortfolio.fulfilled, (state: any, action) => {
                state.loading = false
                if(action.payload.fortfolioData.data) {
                    state.data = action.payload.fortfolioData.data
                    state.stateFortfolio = true
                } else {
                    state.stateFortfolio = false
                }
            })
            .addCase(getFortfolio.rejected, (state: any, action) => {
                state.loading = false
            })
            .addCase(updateDataUser.pending, (state: any, action) => {
                state.loading = true
            })
            .addCase(updateDataUser.fulfilled, (state: any, action) => {
                state.loading = false
                if(!action.payload.fortfolioData.fortfolio) {
                    console.log(action.payload.fortfolioData.message)
                }
            })
            .addCase(updateDataUser.rejected, (state: any, action) => {
                state.loading = false
            })
            .addCase(deleteCoinUser.pending, (state: any, action) => {
                state.loading = true
            })
            .addCase(deleteCoinUser.fulfilled, (state: any, action) => {
                state.loading = false
                if(action.payload.error !== 0) {
                    console.log(action.payload.message)
                }
            })
            .addCase(deleteCoinUser.rejected, (state: any, action) => {
                state.loading = false
            })
            .addCase(addNewCoin.pending, (state: any, action) => {
                state.loading = true
            })
            .addCase(addNewCoin.fulfilled, (state: any, action) => {
                state.loading = false
                if(action.payload.error !== 0) {
                    console.log(action.payload.message)
                }
            })
            .addCase(addNewCoin.rejected, (state: any, action) => {
                state.loading = false
            })
    }
})

const {reducer} = fortfolioSlice
export default reducer