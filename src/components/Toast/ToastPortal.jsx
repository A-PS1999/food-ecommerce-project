import React from "react";
import { createPortal } from "react-dom";
import { useToastStore } from "../../hooks/useToastStore";
import './ToastPortal.scss';

const toastArraySelector = (state) => state.toastArray;

export default function ToastPortal() {

    const toastArray = useToastStore(toastArraySelector);

    return createPortal(
        <div className="toast-portal">
            {toastArray.length > 0 ? toastArray.map((toast) => {
                return (
                    <div key={toast.id} className={toast.type == 'error' ? 'toast-portal__toast--error' : 'toast-portal__toast--info'}>
                        {toast.message}
                    </div>
                )
            }) : null}
        </div>,
        document.getElementById('toast-root')
    )
}