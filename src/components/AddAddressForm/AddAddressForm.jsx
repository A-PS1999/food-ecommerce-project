import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import AutocompleteInput from "./AutocompleteInput";
import CountryOptions from "../CountryOptions/CountryOptions";
import './AddAddressForm.scss';

export default function AddAddressForm({ BASE_URL }) {

    const { callFetch, fetchState } = useFetch();
    const { register, handleSubmit, control, setValue } = useForm();
    const [townCitySelection, setTownCitySelection] = useState("");
    const setTownOrCity = (value) => setValue("town/city", value);

    const submitData = async (data) => {
        try {
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {townCitySelection}
            <form className="address-form" onSubmit={handleSubmit(submitData)}>
                <label htmlFor="address-main" className="address-form__label">Address Line 1:</label>
                <Controller 
                    control={control}
                    name="address-main"
                    required
                    render={({ field: { onChange } }) => (
                        <AutocompleteInput onChange={onChange} className={"address-form__input"} setCity={setTownOrCity} />
                    )}
                />
                <label htmlFor="address-secondary" className="address-form__label">Address Line 2 (optional):</label>
                <input {...register("address-secondary")} className="address-form__input" />
                <label htmlFor="town/city" className="address-form__label">Town/City:</label>
                <input {...register("town/city", { 
                        required: true, 
                        onChange: (e) => setTownCitySelection(e.target.value),
                    })} 
                    className="address-form__input" 
                />
                <label htmlFor="postcode" className="address-form__label">Postcode:</label>
                <input {...register("postcode", { required: true })} className="address-form__input" />
                <label htmlFor="country" className="address-form__label">Country:</label>
                <select {...register("country", { required: true })} className="address-form__select" value={"United Kingdom"}>
                    <CountryOptions />
                </select>
                <label htmlFor="phone-no" className="address-form__label">Phone number:</label>
                <input {...register("phone-no", { required: true, pattern: [0-9] })} className="address-form__input" />
                <button type="submit" className="address-form__submit-btn">Submit</button>
            </form>
        </>
    )
}