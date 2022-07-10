import React, { useContext, useEffect } from "react";
import Carousel from "../Carousel/Carousel";
import ItemLinkCard from "../ItemLinkCard/ItemLinkCard";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContextProvider";
import './HomePage.scss';

export default function HomePage({ BASE_URL }) {

    const { userData } = useContext(AuthContext);

    return (
        <>
            <header className="homepage-header">
                <img src="/logo.svg" alt="WorldFoods" className="homepage-header__logo" />
                <h2 className="homepage-header__subtext">Delicious foods from around the world</h2>
            </header>
            <section className="homepage-body">
                <div className="homepage-body__cards-container">
                    <div className="homepage-body__cards-container__subgroup">
                        <div className="card">
                            <p className="card__header-text">Feeling thirsty?</p>
                            <div className="card__link-group">
                                <Link to="/" className="card__link-group__link">
                                    <img src="https://res.cloudinary.com/ducbh1hqd/image/upload/v1656870823/product-images/tea-img_ayjxwg.webp" 
                                        alt="Hot Drinks" 
                                        className="card__link-group__link__img"
                                    />
                                    <p className="card__link-group__link__text">Hot Drinks</p>
                                </Link>
                                <Link to="/" className="card__link-group__link">
                                    <img src="https://res.cloudinary.com/ducbh1hqd/image/upload/v1656870823/product-images/melonsoda-softdrink_yl0ymv.jpg" 
                                        alt="Soft Drinks" 
                                        className="card__link-group__link__img"
                                    />
                                    <p className="card__link-group__link__text">Soft Drinks</p>
                                </Link>
                            </div>
                        </div>
                        <div className="card">
                        <p className="card__header-text">Need a snack?</p>
                        <div className="card__link-group">
                            <Link to="/" className="card__link-group__link">
                                <img src="https://res.cloudinary.com/ducbh1hqd/image/upload/v1657448543/product-images/chocoramo_nuk4ik.png" 
                                    alt="Sweet Snacks" 
                                    className="card__link-group__link__img"
                                />
                                <p className="card__link-group__link__text">Sweet Snacks</p>
                            </Link>
                            <Link to="/" className="card__link-group__link">
                                <img src="https://res.cloudinary.com/ducbh1hqd/image/upload/v1657448441/product-images/amanoya-senbei_kqrnfj.png" 
                                    alt="Savoury Snacks" 
                                    className="card__link-group__link__img"
                                />
                                <p className="card__link-group__link__text">Savoury Snacks</p>
                            </Link>
                        </div>
                    </div>
                    </div>
                    <ItemLinkCard headertext="Cooking Sauces & Pastes" url={`${BASE_URL}/get-product-sample/${9}/${4}`} />
                </div>
                <div className="homepage-body__assorted-products">
                    <p className="homepage-body__assorted-products__title">Some of our available products</p>
                    <Carousel apiCall={`${BASE_URL}/get-random-products/${10}`} numToDisplay={4} gutter={5} />
                </div>
                {userData && <>
                    <div className="homepage-body__wishlist">
                        <p className="homepage-body__wishlist__title">Your Wishlist</p>
                        <Carousel apiCall={`${BASE_URL}/user/simple-wishlist/${userData.id}/${10}`} numToDisplay={4} gutter={5} wishlist={true} />
                    </div>
                    </>
                }
            </section>
        </>
    )
}