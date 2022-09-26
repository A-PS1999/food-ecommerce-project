import React from "react";
import { Link } from "react-router-dom";
import './Navbar.scss';

export default function NavbarMobileMenu({props}) {

    const { loggedIn, handleLogOut, userData, numCartItems } = props

    return (
        <div className="navbar__mobile-menu">
            <input name="menu-toggle" type="radio" id="navbar-close-burg" className="navbar__mobile-menu__toggle"/>
            <label htmlFor="navbar-close-burg" className="navbar__mobile-menu__close">✖</label>
            {userData && userData.is_admin ?
                <Link to="/admin" className="navbar__mobile-menu__admin-container">
                    <img src="/crown.svg" alt="Crown" className="navbar__mobile-menu__admin-container__crown" />
                    Admin
                </Link>
            : null}
            <div className="navbar__mobile-menu__button-group">
                {!loggedIn 
                    ? (
                    <>
                        <Link to="/register" className="navbar__mobile-menu__button-group__button">Register</Link>
                        <Link to="/log-in" className="navbar__mobile-menu__button-group__button">Log In</Link>
                    </>
                    ) : (
                    <>
                        <Link to={`/user/${userData.id}`} className="navbar__mobile-menu__button-group__button">Account</Link>
                        <Link to="/" onClick={() => handleLogOut()} className="navbar__mobile-menu__button-group__button">Log Out</Link>
                    </>
                    )
                }
            </div>
            <Link to="/cart" className="navbar__mobile-menu__cart-container">
                <span className="navbar__mobile-menu__cart-container__item-num">{numCartItems}</span>
                <img src="/basket.svg" alt="Shopping basket" className="navbar__mobile-menu__cart-container__basket" />
            </Link>
            <ul className="navbar__mobile-menu__categories">
                <div className="navbar__mobile-menu__categories__title">Categories</div>
                <li className="navbar__mobile-menu__categories__li">Seasonings</li>
                <li className="navbar__mobile-menu__categories__li">Condiments</li>
                <li className="navbar__mobile-menu__categories__li">Grains & Pulses</li>
                <li className="navbar__mobile-menu__categories__li">Snacks & Sweets</li>
                <li className="navbar__mobile-menu__categories__li">Pasta & Noodles</li>
                <li className="navbar__mobile-menu__categories__li">Preserved Foods</li>
                <li className="navbar__mobile-menu__categories__li">Tea, Coffee & Hot Drinks</li>
                <li className="navbar__mobile-menu__categories__li">Soft Drinks</li>
            </ul>
        </div>
    )
}