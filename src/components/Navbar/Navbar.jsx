import React, { useEffect, useContext } from "react";
import useFetch from '../../hooks/useFetch';
import NavbarMobileMenu from "./NavbarMobileMenu";
import { useCartStore } from "../../hooks/useCartStore";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContextProvider";
import './Navbar.scss';

const numItemsSelector = (state) => state.cart.length;

export default function Navbar({ BASE_URL }) {

    const { callFetch, fetchState } = useFetch();
    const numCartItems = useCartStore(numItemsSelector);
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
                        <div className="navbar__dropdown-menu__no-acct-link">No account? <Link to="/register">Register now</Link></div>
                        {loggedIn && (
                            <>
                                <h2 className="navbar__dropdown-menu__loggedin-title">Your Account</h2>
                                <div className="navbar__dropdown-menu__link-group">
                                    <Link to={`/user/${userData.id}`} className="navbar__dropdown-menu__link-group__link">Your User Hub</Link>
                                    <Link to={`/user/${userData.id}/wishlist`} className="navbar__dropdown-menu__link-group__link">Your Wishlist</Link>
                                </div>
                            </>
                        )}

                    </div>
                    <Link to="/cart" className="navbar__link-group__cart-container">
                        <span className="navbar__link-group__cart-container__item-num">{numCartItems}</span>
                        <img src="/basket.svg" alt="Shopping basket" className="navbar__link-group__cart-container__basket" />
                    </Link>
                </div>
                <NavbarMobileMenu props={{ loggedIn, handleLogOut, userData, numCartItems }} />
            </nav>
        </>
    )
}