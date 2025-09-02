"use client";

import { addItem, removeItem, removeAll } from "@/redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Product } from "@/types";
import { useCallback } from "react";

interface UseCartReturn {
    // State
    items: Product[];
    isLoading: boolean;

    // Actions
    addItemToCart: (product: Product) => void;
    removeItemFromCart: (product: Product) => void;
    clearCart: () => void;

    // Utilities
    getItem: (id: string) => Product | undefined;
    isInCart: (id: string) => boolean;
    itemCount: number;
    isEmpty: boolean;
    totalPrice: number;
}

export const useCart = () => {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state) => state.cart);

    const isRehydrated = useAppSelector((state) => {
        // @ts-ignore
        return state._persist?.rehydrated ?? true;
    });

    const isLoading = !isRehydrated;

    // Action handlers
    const addItemToCart = useCallback((product: Product) => {
        dispatch(addItem(product))
    }, [dispatch]);

    const removeItemFromCart = useCallback((product: Product) => {
        dispatch(removeItem(product));
    }, [dispatch]);

    const clearCart = useCallback(() => {
        dispatch(removeAll());
    }, [dispatch]);

    // Utilities
    const getItem = useCallback((id: string) => {
        return items.find((item) => item?.id === id);
    }, [items]);

    const isInCart = useCallback((id: string) => {
        return items.some((item) => item?.id === id);
    }, [items]);

    const itemCount = items?.length;
    const isEmpty = items.length === 0;

    const totalPrice = items?.reduce((total, item) => {
        return total + (Number(item?.price) || 0)
    }, 0);

    return {
        // State
        items,
        isLoading,

        // Actions
        addItemToCart,
        removeItemFromCart,
        clearCart,

        // Utilities
        getItem,
        isInCart,
        itemCount,
        totalPrice,
        isEmpty,
    };
};