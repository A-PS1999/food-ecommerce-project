import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist((set, get) => ({
        cart: [],
        lastCartUpdate: null,
        updateItemCount: (index, count) => set((state) => {
            const cart = [...state.cart];
            cart[index].count += count;
            state.lastCartUpdate = Date.now();
            return cart;
        }),
        addItem: (id, count) => set((state) => {
            const alreadyInCart = state.cart.findIndex((item) => item.id === id);

            if (alreadyInCart === -1) {
                state.cart = [...state.cart, { id: id, count: count }],
                state.lastCartUpdate = Date.now();
            } else {
                state.updateItemCount(alreadyInCart, count);
            }
        }),
        removeItem: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
        clearCart: () => set({ cart: [], lastCartUpdate: null })
    }), { name: 'cart-storage' })
)