import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import './NotFound.scss';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="not-found-page">
            <img src="/uh-oh.svg" alt="404: Page not found" className="not-found-page__img" />
            <h1 className="not-found-page__text">
                It looks like the page you are looking for doesn't exist.
            </h1>
            <div className="not-found-page__btn-group">
                <Link to="/" className="not-found-page__btn-group__link">
                    Return to front page
                </Link>
                <button className="not-found-page__btn-group__btn" onClick={() => navigate(-1)}>
                    Previous page
                </button>
            </div>
        </div>
    )
}