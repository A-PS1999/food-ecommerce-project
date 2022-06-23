import React, { useState } from 'react';

export const ModalContext = React.createContext({});

export default function ModalContextProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);
    const modals = {
        addProductModal: { isOpen, toggleModal },
    }

    return (
        <ModalContext.Provider value={modals}>
            {children}
        </ModalContext.Provider>
    )
}