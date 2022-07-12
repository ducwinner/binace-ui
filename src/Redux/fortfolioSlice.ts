import { createSlice } from "@reduxjs/toolkit";


// Interface Action 

interface AddInterFace {
    payload: { idcoin: string, quantity: number, priceInput: number},
    type: any
}

interface editInterFace {
    payload: {idcoin: string, value: number}
    type: any
}

//------------

export interface DataInterFace {
    idcoin: string,
    quantity: number,
    priceInput: number,
}

interface InitialStateInterFace {
    userId: number,
    data: DataInterFace[]
}

const initialState: InitialStateInterFace = {
    userId: 1,
    data: [
      {
        idcoin: "bitcoin",
        quantity: 3,
        priceInput: 22000,
      },
      {
        idcoin: "ethereum",
        quantity: 10,
        priceInput: 2500,
      },
      {
        idcoin: "dogecoin",
        quantity: 100000,
        priceInput: 0.1,
      },
    ],
}

const fortfolioSlice = createSlice({
    name: 'fortfolio',
    initialState,
    reducers: {
        addCoin(state, actions: AddInterFace) {
            const newCoin: DataInterFace  = {
                idcoin: actions.payload.idcoin,
                quantity: actions.payload.quantity || 0,
                priceInput: actions.payload.priceInput || 0,
            }
            state.data.push(newCoin)
        },
        removeCoin(state, actions: {payload: string,type: any}) {
            let indexCoin: any
            state.data.forEach((e: any, index: any) => {
                if(e.idcoin === actions.payload) {
                    indexCoin = index
                }
            })
            state.data.splice(indexCoin, 1)
        },
        editQuantity(state, actions: editInterFace) {
            let indexCoin: any
            state.data.forEach((e: any, index: any) => {
                if(e.idcoin === actions.payload.idcoin) {
                    indexCoin = index
                }
            })
            state.data[indexCoin].quantity = actions.payload.value
        },
        editPriceInput(state, actions: editInterFace) {
            let indexCoin: any
            state.data.forEach((e: any, index: any) => {
                if(e.idcoin === actions.payload.idcoin) {
                    indexCoin = index
                }
            })
            state.data[indexCoin].priceInput = actions.payload.value
        }
    }
})

const {reducer, actions} = fortfolioSlice
export const {addCoin,removeCoin,editQuantity,editPriceInput} = actions
export default reducer