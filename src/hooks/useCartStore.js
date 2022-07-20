import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist((set, get) => ({
        cart: [],
        lastCartUpdate: null,
        addItem: (id, count) => set((state) => ({
            cart: [...state.cart, { id: id, count: count }],
            lastCartUpdate: Date.now()
        })),
        updateItemCount: (index, count) => set((state) => {
            const cart = [...state.cart];
            cart[index].count += count;
            state.lastCartUpdate = Date.now();
            return cart;
        }),
        removeItem: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
        clearCart: () => set({ cart: [], lastCartUpdate: null })
    }), { name: 'cart-storage' })
)