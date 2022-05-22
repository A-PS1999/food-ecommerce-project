import React from "react";
import { Link } from "react-router-dom";
import './Footer.scss';

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

export default function Footer() {
    return (
        <>
            <button onClick={() => scrollToTop()} className="to-top-button">Back to top</button>
            <footer>
                <Link to="/" className="footer-logo-link">
                    <img src="/logo.svg" alt="WorldFoods" className="footer-logo" />
                </Link>
                <div className="footer-link-container">
                    <h3 className="footer-link-container__heading">Get Started</h3>
                    <Link to="/log-in" className="footer-link-container__link--first">
                        Log In
                    </Link>
                    <Link to="/register" className="footer-link-container__link">
                        Register
                    </Link>
                </div>
                <div className="footer-link-container--rightmost">
                    <h3 className="footer-link-container__heading">About</h3>
                    <a href="https://github.com/A-PS1999/food-ecommerce-project" className="footer-link-container__link--first">Repository</a>
                    <a href="https://www.linkedin.com/in/samuel-arnold-parra-2899721b6/" className="footer-link-container__link">LinkedIn</a>
                </div>
            </footer>
        </>
    )
}