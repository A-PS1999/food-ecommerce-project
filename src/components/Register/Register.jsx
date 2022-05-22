import React, { useRef } from "react";
import useFetch from '../../hooks/useFetch';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import './Register.scss';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Register() {

    const { register, handleSubmit, watch } = useForm();
    const navigate = useNavigate();
    const passwordEntry = useRef({});
    passwordEntry.current = watch("password", "");

    const submitData = (data) => {
        const fetchCall = useFetch(`${BASE_URL}/register`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            credentials: 'true',
            body: data 
        })

        if (fetchCall.fetchState.status === 'success') {
            navigate("/");
        }
    };

    return (
        <>
            <header>
                <Link to="/">
                    <img src="/logo.svg" alt="WorldFoods" />
                </Link>
            </header>
            <div>
                <form onSubmit={handleSubmit(submitData)}>
                    <input {...register("name", { required: true })} placeholder="Name" />
                    <input {...register("email", { required: true })} placeholder="Email" />
                    <input {...register("password", {
                        required: true,
                        minLength: 6
                        })} 
                        placeholder="Password" 
                        type="password"
                    />
                    <input {...register("confirmPassword", {
                        required: true,
                        validate: value => value === passwordEntry.current
                        })}
                        placeholder="Confirm Password"
                        type="password"
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    )
}