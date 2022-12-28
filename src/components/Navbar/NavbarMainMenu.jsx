import React, { useEffect, useState } from "react";
import RecursiveMenu from "./RecursiveMenu";
import './Navbar.scss';

export default function NavbarMainMenu({ categories }) {

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleClick = (e) => {
            if (e.target && e.target.className === "navbar__main-menu__backing--open") {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            window.addEventListener('click', handleClick);
            document.getElementById("root").style.overflowY = 'hidden';
        }

        return () => {
            window.removeEventListener('click', handleClick);
            document.getElementById("root").style.overflowY = 'scroll';
        }
    }, [menuOpen])

    return (
        <>
            <div className="navbar__span-burger__outer">
                <button className="navbar__span-burger" type="button" title="Hamburger menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span className={menuOpen ? "navbar__span-burger__span--open" : "navbar__span-burger__span--closed"} />
                    <span className={menuOpen ? "navbar__span-burger__span--open" : "navbar__span-burger__span--closed"} />
                    <span className={menuOpen ? "navbar__span-burger__span--open" : "navbar__span-burger__span--closed"} />
                </button>
            </div>
            <div className={menuOpen ? "navbar__main-menu__backing--open" : "navbar__main-menu__backing"}>
                <div className="navbar__main-menu" style={{ transform: menuOpen ? "translateX(0)" : "translateX(-100%)" }}>
                    <h2 className="navbar__main-menu__heading">Categories</h2>
                    <div className="navbar__main-menu__categories-inner">
                        <RecursiveMenu categories={categories} />
                    </div>
                </div>
            </div>
        </>
    )
}