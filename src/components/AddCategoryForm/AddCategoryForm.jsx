import React from "react";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import CategoryOptions from "../CategoryOptions/CategoryOptions";
import './AddCategoryForm.scss';

export default function AddCategoryForm({ BASE_URL }) {

    const { register, handleSubmit } = useForm();
    const { callFetch } = useFetch();
    const categoryRef = register("category");

    const submitData = async (data) => {
        try {
            await callFetch(`${BASE_URL}/admin/categories/create`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitData)} className="add-cat-form">
                <input {...register("cat_name", { required: true })} placeholder="Category Name" className="add-cat-form__input" />
                <label htmlFor="category" className="add-cat-form__label">Select parent (optional):</label>
                <select ref={categoryRef.ref} name={categoryRef.name} onChange={categoryRef.onChange} className="add-cat-form__select">
                    <option label=""></option>
                    <CategoryOptions BASE_URL={BASE_URL} />
                </select>
                <button type="submit" className="add-cat-form__button">Submit</button>
            </form>
        </>
    )
}