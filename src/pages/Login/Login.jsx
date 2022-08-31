import React, { useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../utils/AuthContextProvider";
import { useToastStore } from "../../hooks/useToastStore";
import useFetch from '../../hooks/useFetch';
import './Login.scss';

const createToastSelector = (state) => state.createToast;

export default function Login({ BASE_URL }) {

    const { register, handleSubmit } = useForm();
    const { callFetch, fetchState } = useFetch();
    const { setLoggedIn, setUserData } = useContext(AuthContext);
    const navigate = useNavigate();
    const createToast = useToastStore(createToastSelector);

    useEffect(() => {
        if (fetchState.status === 'success') {
            setUserData(fetchState.data.user);
            setLoggedIn(true);
            navigate('/');
        }
        if (fetchState.status === 'error') {
            createToast(
                "Login failed. Please check if your username and password are correct.",
                "error"
            )
        }
    }, [fetchState]);

    const submitData = async (data) => {
        await callFetch(`${BASE_URL}/log-in`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    }

    return (
        <>
            <header className="login-header">
                <Link to="/" className="login-header__link">
                    <img src="/logo.svg" alt="WorldFoods" />
                </Link>
            </header>
            <div className="form-container">
                <form onSubmit={handleSubmit(submitData)} className="login-form">
                    <input {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} placeholder="Email" className="login-form__input" />
                    <input {...register("password", { required: true })} placeholder="Password" type="password" className="login-form__input" />
                    <button type="submit" className="login-form__button">Log In</button>
                </form>
            </div>
            <div className="register-note">
                Don't have an account? <Link to="/register" className="register-note__link">Register now</Link>
            </div>
        </>
    )
}