import React, { useEffect, useContext } from "react";
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../../utils/AuthContextProvider";
import useFetch from '../../hooks/useFetch';
import './Login.scss';

export default function Login({ BASE_URL }) {

    const { register, handleSubmit } = useForm();
    const { callFetch, fetchState } = useFetch();
    const { setLoggedIn, setUserData } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (fetchState.status === 'success') {
            setUserData(fetchState.data.user);
            setLoggedIn(true);
            if (location.state.from) {
                console.log(location.state.from, { replace: true })
                navigate(location.state.from);
            }
            navigate('/');
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