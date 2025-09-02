import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { Product } from "@/types";
import { toast } from "react-hot-toast";

interface CartState {
    items: Product[];
}

const initialState: CartState = {
    items: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const product = action.payload;
            const isAlreadyExists = state.items.some((item) => item?.id === product?.id);
            
            if(isAlreadyExists){
                toast("Item already exists.");
            } else {
                state.items.push(product);
                toast.success("Item added to cart.");
            }
        },
        removeItem: (state, action) => {
            const product = action.payload;
            state.items = state.items.filter((item) => item?.id !== product?.id)
            toast.success("Item removed from cart.")
        },
        removeAll: (state) => {
            state.items = [];
        }
    }
})

export const { addItem, removeItem, removeAll } = cartSlice.actions;
export default cartSlice.reducer;