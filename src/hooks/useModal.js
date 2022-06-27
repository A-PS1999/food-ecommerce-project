import { useContext } from "react";
import { ModalContext } from "../utils/ModalContextProvider";

export default function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal is missing its ModalContextProvider")
    }
    return context;
}