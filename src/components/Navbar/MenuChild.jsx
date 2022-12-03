import React from "react";
import { Link } from "react-router-dom";

export default function MenuChild({ name, children }) {

    return (
        <div className="recursive-menu__menu-item">
            <div className="recursive-menu__menu-item__heading">
                {(children && children.length > 0) && (
                    <img src="/chevron-right.svg" alt="Right chevron" className="recursive-menu__menu-item__chevron"/>
                )}
                <Link to="/" className="recursive-menu__menu-item__heading__title">{name}</Link>
            </div>
            {children && (
                <div className="recursive-menu__menu-item__children">
                    {children}
                </div>
            )}
        </div>
    )
}