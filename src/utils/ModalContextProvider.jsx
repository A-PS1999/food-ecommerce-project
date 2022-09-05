import React, { useState } from 'react';

export const ModalContext = React.createContext({});

export default function ModalContextProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [addCatOpen, setAddCatOpen] = useState(false);
    const [addressOpen, setAddressOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen);
    const toggleCatModal = () => setAddCatOpen(!addCatOpen);
    const toggleAddressModal = () => setAddressOpen(!addressOpen);
    const modals = {
        addProductModal: { isOpen, toggleModal },
        addCategoryModal: { addCatOpen, toggleCatModal },
        addressModal: { addressOpen, toggleAddressModal },
    }

    return (
        <ModalContext.Provider value={modals}>
            {children}
        </ModalContext.Provider>
    )
}