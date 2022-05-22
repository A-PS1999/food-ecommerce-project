import React from "react";
import { Link } from "react-router-dom";
import './Navbar.scss';

export default function Navbar() {
    return (
        <nav>
            <Link to="/" className="navbar__link">
                WorldFoods
            </Link>
            <input type="checkbox" id="navbar-toggle-burg" />
            <div className="navbar__hamburger">
                <label htmlFor="navbar-toggle-burg">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>
            <div className="navbar__link-group">
                <Link to="/log-in">
                    <div>Hello!</div>
                    <span>Your Account</span>
                </Link>
                <Link to="/cart">
                    <div>
                        <img src="/basket.svg" alt="Shopping basket" className="navbar__basket" />
                    </div>
                </Link>
            </div>
        </nav>
    )
}