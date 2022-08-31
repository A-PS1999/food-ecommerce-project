import React, { useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from "../../utils/AuthContextProvider";
import useFetch from "../../hooks/useFetch";
import { useToastStore } from "../../hooks/useToastStore";
import './Register.scss';

const createToastSelector = (state) => state.createToast;

export default function Register({ BASE_URL }) {

    const { register, handleSubmit, watch } = useForm();
    const { callFetch, fetchState } = useFetch();
    const { setLoggedIn, setUserData } = useContext(AuthContext);
    const navigate = useNavigate();
    const createToast = useToastStore(createToastSelector);
    const passwordEntry = useRef({});
    passwordEntry.current = watch("password", "");

    useEffect(() => {
        if (fetchState.status === 'success') {
            setUserData(fetchState.data.user);
            setLoggedIn(true);
            navigate('/');
        }
        if (fetchState.status === 'error') {
            createToast(
                "An error occurred. Please try again later.",
                "error"
            )
        }
    }, [fetchState]);

    const submitData = async (data) => {
        await callFetch(`${BASE_URL}/register`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
    };

    return (
        <>
            <header className="register-header">
                <Link to="/" className="register-header__link">
                    <img src="/logo.svg" alt="WorldFoods" />
                </Link>
            </header>
            <div className="form-container">
                <form onSubmit={handleSubmit(submitData)} className="register-form">
                    <input {...register("name", { required: true })} placeholder="Name" className="register-form__input" />
                    <input {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} placeholder="Email" className="register-form__input" />
                    <input {...register("password", {
                        required: true,
                        minLength: 6
                        })} 
                        placeholder="Password" 
                        type="password"
                        className="register-form__input"
                    />
                    <h4 className="register-form__note">Passwords must be at least 6 characters long</h4>
                    <input {...register("confirmPassword", {
                        required: true,
                        validate: value => value === passwordEntry.current
                        })}
                        placeholder="Confirm Password"
                        type="password"
                        className="register-form__input"
                    />
                    <button type="submit" className="register-form__button">Register</button>
                </form>
            </div>
        </>
    )
}