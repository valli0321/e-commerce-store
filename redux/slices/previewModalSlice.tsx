import { createSlice } from "@reduxjs/toolkit";

import { Product } from "@/types";

interface PreviewModalState {
    isOpen: boolean;
    data?: Product | null;
}

const initialState: PreviewModalState = {
    isOpen: false,
    data: null
}

const previewModalSlice = createSlice({
    name: "previewModal",
    initialState,
    reducers: {
        onOpen: (state, action) => {
            state.isOpen = true;
            state.data = action.payload;
        },
        onClose: (state) => {
            state.isOpen = false;
            state.data = null;
        },
    }
})

export const { onOpen, onClose } = previewModalSlice.actions;
export default previewModalSlice.reducer;