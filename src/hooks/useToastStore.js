import { create } from "zustand";
import { generateToastId } from '../utils/generateToastId';

const types = { add: 'ADD', remove: 'REMOVE' };

const reducer = (state, action) => {
    switch (action.type) {
        case types.add:
            const newTimeout = setTimeout(() => {
                state.dispatch({ type: 'REMOVE', id: action.toast.id })
            }, action.toast.duration)
            return { ...state, 
                toastArray: [action.toast, ...state.toastArray],
                toastTimers: new Map(state.toastTimers).set(action.toast.id, newTimeout)
            }
        case types.remove:
            const newMap = new Map(state.toastTimers)
            newMap.delete(action.id)
            return {
                ...state,
                toastArray: state.toastArray.filter((toast) => toast.id !== action.id),
                toastTimers: newMap,
            }
    }
}

export const useToastStore = create((set, get) => ({
    toastArray: [],
    toastTimers: new Map(),
    dispatch: (args) => set((state) => reducer(state, args)),
    generateToast: (message, type, options=undefined) => ({
        type: type,
        message: message,
        ...options,
        duration: options ? options.duration : 5000,
        id: options ? options.id : generateToastId()
    }),
    createToast: (message, type, options=undefined) => {
        const toast = get().generateToast(message, type, options);
        get().dispatch({ type: 'ADD', toast });
    }
}))