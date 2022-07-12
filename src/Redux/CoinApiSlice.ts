import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import CryptoApi from "../api/CryptoApi"


type coinApi = Object[] | any


export const fethchLstCoinVolume = createAsyncThunk('coin/fethchLstCoinVolum',  async (params, thunkApi ) => {
    const paramsApi = {
        per_page: 200,
        order: 'volume_desc'
    }
    const lstCoinVolume: coinApi = await CryptoApi.getAll(paramsApi)
    return lstCoinVolume
})

export const fethchLstCoinMKC = createAsyncThunk('coin/fethchLstCoinMKC',  async (params, thunkApi ) => {
    const paramsApi = {
        per_page: 200,
        order: 'market_cap_desc'
    }
    const lstCoinMKC: coinApi = await CryptoApi.getAll(paramsApi)
    return lstCoinMKC
})

export const fethchCoinID = createAsyncThunk('coin/fethchCoinID',  async (params: string, thunkApi ) => {
    const paramsApi = {
        ids: 'bitcoin,ethereum,dogecoin'
    }
    const coinDetail: coinApi = await CryptoApi.getAll(paramsApi)
    return coinDetail
})

interface initialStateInterFace  {
    loading: boolean
    lstCoinMkc: any[]
    lstCoinVolume: any[]
    detailCoin: any[]
}

const initialState: initialStateInterFace = {
    loading: false,
    lstCoinMkc: [],
    lstCoinVolume: [],
    detailCoin: [],
}

const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fethchCoinID.fulfilled, (state, action) => {
          // Add user to the state array
          state.detailCoin = action.payload
        })
        builder.addCase(fethchLstCoinMKC.fulfilled, (state, action) => {
            // Add user to the state array
            state.lstCoinMkc = action.payload
          })
        builder.addCase(fethchLstCoinVolume.fulfilled, (state, action) => {
            // Add user to the state array
            state.lstCoinVolume = action.payload
        })
      },
})

const {reducer: coinReducer} = coinSlice
export default coinReducer