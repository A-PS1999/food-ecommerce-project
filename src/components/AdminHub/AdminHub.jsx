import React, { useContext } from "react";
import { AuthContext } from '../../utils/AuthContextProvider';
import { Link } from "react-router-dom";
import './AdminHub.scss';

export default function AdminHub() {

    const { userData } = useContext(AuthContext);

    return (
        <>
            <header className="admin-header">
                Welcome, {userData.name}
            </header>
            <div className="admin-grid">
                <Link to="user-management" className="admin-grid__link-container">
                    <img src="/users.svg" alt="Users" className="admin-grid__link-container--img" />
                    View/Manage Users
                </Link>
                <Link to="product-management" className="admin-grid__link-container">
                    <img src="/products.svg" alt="Users" className="admin-grid__link-container--productimg" />
                    View/Manage Products
                </Link>
                <Link to="/" className="admin-grid__link-container">
                    <img src="/categories.svg" alt="Users" className="admin-grid__link-container--categoryimg" />
                    View/Manage Categories
                </Link>
                <Link to="/" className="admin-grid__link-container--orders">
                    <img src="/orders.svg" alt="Users" className="admin-grid__link-container--img" />
                    View/Manage Orders
                </Link>
            </div>
        </>
    )
}