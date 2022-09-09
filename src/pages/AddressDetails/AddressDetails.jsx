import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import useModal from "../../hooks/useModal";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import AddAddressForm from "../../components/AddAddressForm/AddAddressForm";
import Pagination from "../../components/Pagination/Pagination";
import { handleDelete } from "../../utils/handleDelete";
import './AddressDetails.scss';

export default function AddressDetails({ BASE_URL }) {

    const [pageNum, setPageNum] = useState(1);
    const [paginationData, setPaginationData] = useState(null);
    const [addresses, setAddresses] = useState(null);
    const [formMode, setFormMode] = useState("add");
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { addressModal: { addressOpen, toggleAddressModal } } = useModal();
    const { callFetch, fetchState } = useFetch();
    const { userId } = useParams();

    useEffect(() => {
        const fetchUserAddresses = async () => {
            try {
                await callFetch(`${BASE_URL}/user/${userId}/addresses/${pageNum}`, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchUserAddresses();
    }, [])

    useEffect(() => {
        if (fetchState.data.addresses) {
            setAddresses(fetchState.data.addresses);
            setPaginationData(fetchState.data.paginationData);
        }
    }, [fetchState])

    const toggleAddForm = () => {
        setFormMode("add");
        toggleAddressModal();
    }

    const toggleEditForm = (address) => {
        setFormMode("edit");
        setSelectedAddress(address);
        toggleAddressModal();
    }

    return (
        <>
            <Modal isOpen={addressOpen} toggleModal={toggleAddressModal}>
                <AddAddressForm BASE_URL={BASE_URL} userId={userId} mode={formMode} address={selectedAddress} />
            </Modal>
            <header className="addresses-header">
                Your Addresses
            </header>
            <section className="addresses">
                <button onClick={() => toggleAddForm()} className="addresses__modal-btn">
                    Add
                </button>
                {addresses && addresses.length > 0 ? 
                    <div className="addresses__grid">
                        {addresses.map((address) => {
                            return (
                                <div className="addresses__grid__item" key={address.id}>
                                    <div className="addresses__grid__item__text">
                                        <p>{address.address_line1}</p>
                                        <p>{address.address_line2}</p>
                                        <p>{address.city}, {address.post_code}</p>
                                        <p>{address.country}</p>
                                        <p>Phone number: {address.phone_no}</p>
                                    </div>
                                    <div className="addresses__grid__item__option-bar">
                                        <button className="addresses__grid__item__option-bar__btn--edit" type="button" 
                                            onClick={() => toggleEditForm(address)}
                                        >
                                            Edit
                                        </button>
                                        <button className="addresses__grid__item__option-bar__btn" type="button"
                                            onClick={() => handleDelete({ id: address.id, 
                                                route: `${BASE_URL}/user/${userId}/addresses/delete`,
                                                fetchFunc: callFetch,
                                                message: "Are you sure you want to delete this address?", 
                                            })}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div> : <div className="addresses__none">
                        You have not yet saved any addresses.
                    </div>
                }
            </section>
            {paginationData ? (
                <Pagination pageData={paginationData} changePageNum={setPageNum} />
            ) : null}
        </>
    )
}