import React from "react";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import AddAddressForm from "../../components/AddAddressForm/AddAddressForm";
import './AddressDetails.scss';

export default function AddressDetails({ BASE_URL }) {

    const { addressModal: { addressOpen, toggleAddressModal } } = useModal()

    return (
        <>
            <Modal isOpen={addressOpen} toggleModal={toggleAddressModal}>
                <AddAddressForm BASE_URL={BASE_URL}/>
            </Modal>
            <header className="addresses-header">
                Your Addresses
            </header>
            <div className="addresses">
                <button onClick={() => toggleAddressModal()}>Toggle</button>
            </div>
        </>
    )
}