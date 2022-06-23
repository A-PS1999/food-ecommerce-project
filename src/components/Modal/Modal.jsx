import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import './Modal.scss';

export default function Modal({ children, isOpen, toggleModal }) {

    useEffect(() => {
        const handleClick = (e) => {
            if (e.target && e.target.className === "modal--visible") {
                toggleModal();
            }
        }
        if(isOpen) {
            window.addEventListener('click', handleClick)
        }
    }, [isOpen])

    return createPortal(
        <div className={isOpen ? 'modal--visible' : 'modal--hidden'}>
            {isOpen && (
                <div className="modal__inner-container">
                    <button className="modal__inner-container__close-btn" onClick={() => toggleModal()}>&#x1F5D9;</button>
                    {children}
                </div>
            )}
        </div>,
        document.body
    );
};