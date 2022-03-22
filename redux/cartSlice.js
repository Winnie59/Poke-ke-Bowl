import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        pokes: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.pokes.push(action.payload)
            state.quantity += 1
            state.total = action.payload.price * action.payload.quantity
        },
        reset: (state) => {
            state.pokes = []
            state.quantity = 0
            state.total = 0
        }
    }
})

export const {addProduct,reset} = cartSlice.actions
export default cartSlice.reducer