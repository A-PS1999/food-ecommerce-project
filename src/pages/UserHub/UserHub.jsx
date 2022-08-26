import React from "react";
import { Link } from 'react-router-dom';
import './UserHub.scss';

export default function UserHub() {

    return (
        <>
            <header className="userhub-header">
                Your Account
            </header>
            <div className="userhub-grid">
                <Link to="wishlist" className="userhub-grid__link-container">
                    <img src="/sparkle.svg" className="userhub-grid__link-container__img" />
                    Wishlist
                </Link>
                <Link to="reviews" className="userhub-grid__link-container">
                    <img src="/megaphone.svg" className="userhub-grid__link-container__img" />
                    Your Reviews
                </Link>
                <Link to="/" className="userhub-grid__link-container--details">
                    <img src="/address.svg" className="userhub-grid__link-container__img" />
                    Manage Details
                </Link>
            </div>
        </>
    )
}