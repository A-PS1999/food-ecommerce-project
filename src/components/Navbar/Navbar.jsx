import React, { useEffect, useContext } from "react";
import useFetch from '../../hooks/useFetch';
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContextProvider";
import './Navbar.scss';

export default function Navbar({ BASE_URL }) {

    const { callFetch, fetchState } = useFetch();
    const { loggedIn, setLoggedIn, setUserData, userData } = useContext(AuthContext);

    useEffect(() => {
        const checkSession = async () => {
            try {
                await callFetch(`${BASE_URL}/authenticate`, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error);
            }
        }

        checkSession();
    }, []);

    useEffect(() => {
        if (!loggedIn && fetchState.status === 'success') {
            setLoggedIn(true);
            setUserData(fetchState.data);
        }
    }, [fetchState]);

    const handleLogOut = async () => {
        try {
            await callFetch(`${BASE_URL}/log-out`, {
                method: 'post'
            })
            setUserData(null);
            setLoggedIn(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar__link">
                    <img src="/logo.svg" alt="WorldFoods" />
                </Link>
                <input type="radio" name="menu-toggle" id="navbar-open-burg" className="navbar__toggle" />
                <label htmlFor="navbar-open-burg" className="navbar__hamburger-container">
                    <div className="navbar__hamburger-container__hamburger" />  
                </label>
                <div className="navbar__link-group">
                    {userData && userData.is_admin ?
                        <Link to="/admin" className="navbar__link-group__admin-container">
                            <img src="/crown.svg" alt="Crown" className="navbar__link-group__admin-container__crown" />
                            Admin
                        </Link>
                    : null}
                    <Link to="/log-in" className="navbar__link-group__acc-link">
                        {!userData ? <div>Hello!</div> : <div>Hello, {userData.name}</div>}
                        <span>Your Account ▼</span>
                    </Link>
                    <div className="navbar__dropdown-menu">
                        {!loggedIn ? 
                        <>
                            <Link to="/log-in" className="navbar__dropdown-menu__main-link">Log In</Link>
                        </> 
                        : <>
                            <Link to="/" className="navbar__dropdown-menu__main-link" onClick={() => handleLogOut()}>Log Out</Link>
                        </>
                        }
                        <div>No account? <Link to="/register">Register now</Link></div>
                    </div>
                    <Link to="/cart" className="navbar__link-group__cart-container">
                        <img src="/basket.svg" alt="Shopping basket" className="navbar__link-group__cart-container__basket" />
                    </Link>
                </div>
                <div className="navbar__mobile-menu">
                    <input name="menu-toggle" type="radio" id="navbar-close-burg" className="navbar__mobile-menu__toggle"/>
                    <label htmlFor="navbar-close-burg" className="navbar__mobile-menu__close">✖</label>
                    <Link to="/admin" className="navbar__mobile-menu__admin-container">
                        <img src="/crown.svg" alt="Crown" className="navbar__mobile-menu__admin-container__crown" />
                        Admin
                    </Link>
                    <div className="navbar__mobile-menu__button-group">
                        <Link to="/register" className="navbar__mobile-menu__button-group__button">Register</Link>
                        {!loggedIn ? <Link to="/log-in" className="navbar__mobile-menu__button-group__button">Log In</Link>
                        : <Link to="/" onClick={() => handleLogOut()} className="navbar__mobile-menu__button-group__button">Log Out</Link>
                        }
                    </div>
                    <div className="navbar__mobile-menu__cart-container">
                        <img src="/basket.svg" alt="Shopping basket" className="navbar__mobile-menu__cart-container__basket" />
                    </div>
                </div>
            </nav>
        </>
    )
}