import { createSlice } from "@reduxjs/toolkit";

interface actionsInterFace {
    payload: string,
    type: any
}

const initialState : string[] = ['bitcoin','ethereum']

const coinFollowSlice = createSlice({
    name: 'coinFollow',
    initialState,
    reducers: {
        followCoin(state,actions: actionsInterFace) {
            state.push(actions.payload)
        },
        unfollowCoin(state,actions) {
            const indexItem = state.indexOf(actions.payload)
            state.splice(indexItem,1)
        }
    }
})

const {reducer, actions} = coinFollowSlice  
export const {followCoin,unfollowCoin} = actions
export default reducer