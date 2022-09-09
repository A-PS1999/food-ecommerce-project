import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import AutocompleteInput from "./AutocompleteInput";
import CountryOptions from "../CountryOptions/CountryOptions";
import './AddAddressForm.scss';

export default function AddAddressForm({ BASE_URL, userId, mode="add", address=null }) {

    const { callFetch } = useFetch();
    const { register, handleSubmit, control, setValue, reset } = useForm();
    const [townCitySelection, setTownCitySelection] = useState("");
    const setTownOrCity = (value) => setValue("townOrCity", value);

    useEffect(() => {
        if (mode === "edit") {
            reset({
                addressMain: address.address_line1,
                addressSecondary: address.address_line2,
                townOrCity: address.city,
                postcode: address.post_code,
                country: address.country,
                phoneNo: address.phone_no
            })
        }
    }, [mode, address])

    const submitData = async (data) => {
        const submitRoute = mode === "add" ? `${BASE_URL}/user/${userId}/addresses/add` :
                                            `${BASE_URL}/user/${userId}/addresses/${address.id}/edit`;
        try {
            await callFetch(submitRoute, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form className="address-form" onSubmit={handleSubmit(submitData)}>
                <label htmlFor="addressMain" className="address-form__label">Address Line 1:</label>
                <Controller 
                    control={control}
                    name="addressMain"
                    required
                    render={({ field: { onChange } }) => (
                        <AutocompleteInput onChange={onChange} className={"address-form__input"} setCity={setTownOrCity} />
                    )}
                />
                <label htmlFor="addressSecondary" className="address-form__label">Address Line 2 (optional):</label>
                <input {...register("addressSecondary")} className="address-form__input" />
                <label htmlFor="townOrCity" className="address-form__label">Town/City:</label>
                <input {...register("townOrCity", { 
                        required: true, 
                        onChange: (e) => setTownCitySelection(e.target.value),
                    })} 
                    className="address-form__input" 
                />
                <label htmlFor="postcode" className="address-form__label">Postcode:</label>
                <input {...register("postcode", { required: true, setValueAs: (val) => val.toUpperCase() })} className="address-form__input" />
                <label htmlFor="country" className="address-form__label">Country:</label>
                <select {...register("country", { required: true })} className="address-form__select" value={"United Kingdom"}>
                    <CountryOptions />
                </select>
                <label htmlFor="phoneNo" className="address-form__label">Phone number:</label>
                <input {...register("phoneNo", { required: true, pattern: [0-9] })} className="address-form__input" />
                <button type="submit" className="address-form__submit-btn">Submit</button>
            </form>
        </>
    )
}