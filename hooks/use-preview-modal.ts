"use client";

import { onClose, onOpen } from "@/redux/slices/previewModalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Product } from "@/types";

export const usePreviewModal = () => {
    const dispatch = useAppDispatch();
    const { isOpen, data } = useAppSelector((state) => state.previewModal);

    return {
        isOpen,
        data,
        onOpen: (productData: Product) => dispatch(onOpen(productData)),
        onClose: () => dispatch(onClose())
    }
}