import React from "react";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import CategoryOptions from "../CategoryOptions/CategoryOptions";
import './AddProductForm.scss';

export default function AddProductForm({ BASE_URL }) {

    const { register, handleSubmit } = useForm();
    const { callFetch } = useFetch();
    const categoryRef = register("category", { required: true });
    const imagesRef = register("images", { required: true });

    const submitData = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('stock', data.stock)
        formData.append('category', data.category)
        for (let i=0; i < data.images.length; i++) {
            formData.append('images', data.images[i])
        }
        await callFetch(`${BASE_URL}/admin/products/create`, {
            method: 'post',
            body: formData
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitData)} className="add-prod-form">
                <input {...register("name", { required: true })} placeholder="Product Name" className="add-prod-form__input" />
                <label htmlFor="description" className="add-prod-form__label--description">Description:</label>
                <textarea 
                    {...register("description", { required: true })} 
                    className="add-prod-form__input" 
                    rows="5"
                    cols="33"
                />
                <input {...register("price", { required: true })} placeholder="Price (integer)" className="add-prod-form__input" />
                <input {...register("stock", { required: true })} placeholder="Stock" className="add-prod-form__input" />
                <label htmlFor="category" className="add-prod-form__label">Select category:</label>
                <select ref={categoryRef.ref} name={categoryRef.name} onChange={categoryRef.onChange}>
                    <CategoryOptions BASE_URL={BASE_URL} />
                </select>
                <label htmlFor="images" className="add-prod-form__label">Upload images:</label>
                <input 
                    type="file" 
                    name={imagesRef.name} 
                    onChange={imagesRef.onChange}
                    ref={imagesRef.ref}  
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                />
                <button type="submit" className="add-prod-form__button">Submit</button>
            </form>
        </>
    )
}