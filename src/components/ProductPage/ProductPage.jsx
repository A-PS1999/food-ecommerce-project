import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import convertPrice from '../../utils/convertPrice';
import Spinner from '../Spinner/Spinner';
import './ProductPage.scss';

export default function ProductPage({ BASE_URL }) {

    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [closed, setClosed] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { callFetch, fetchState } = useFetch();
    const descriptionRef = useRef();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                await callFetch(`${BASE_URL}/products/${productId}`, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchProductDetails();
    }, [])

    useEffect(() => {
        if (fetchState.data.product) {
            setProductDetails(fetchState.data.product)
        }
    }, [fetchState])

    const handleQuantityInputChange = useCallback((e) => {
        if (e.target.value >= 1) {
            setQuantity(Number(e.target.value));
        }
    }, []);

    const handleQuantityBtnChange = (direction) => {
        if (direction === 'inc' && quantity != productDetails.stock) {
            setQuantity(quantity+1);
        }
        if (direction === 'dec' && quantity > 1) {
            setQuantity(quantity-1);
        }
    }

    return (
        <>
            <div className="outer-product-page">
                <div className="product-page">
                    {productDetails ? (
                        <>
                            <section className="product-page__image">
                                <img src={productDetails.image_url} className="product-page__image__img" />
                            </section>
                            <h1 className="product-page__product-name">{productDetails.prod_name}</h1>
                            <p className="product-page__stock">Current stock: {productDetails.stock}</p>
                            <p className="product-page__price">{convertPrice(productDetails.price)}</p>
                            <section className="product-page__basket-section">
                                <div className="product-page__basket-section__btn-group">
                                    <button type="button" className="product-page__basket-section__btn-group__btn" disabled={quantity <= 1}
                                        onClick={() => handleQuantityBtnChange('dec')}>
                                        <i className="product-page__basket-section__btn-group__btn__icon--minus" />
                                    </button>
                                    <label>
                                        <input type="number" step="1" min="1" max={productDetails.stock} onChange={handleQuantityInputChange}
                                            value={quantity} pattern="[0-9]*\.?[0-9]*" className="product-page__basket-section__btn-group__input" 
                                        />
                                    </label>
                                    <button type="button" className="product-page__basket-section__btn-group__btn" disabled={quantity === productDetails.stock}
                                        onClick={() => handleQuantityBtnChange('inc')}>
                                        <i className="product-page__basket-section__btn-group__btn__icon--plus" />
                                    </button>
                                </div>
                                <button type="button" className="product-page__basket-section__add-btn">
                                    Add to basket <i className="product-page__basket-section__add-btn__basket-icon"/>
                                </button>
                            </section>
                            <section className="product-page__description-section">
                                <dl>
                                    <dt 
                                        className={closed ? "product-page__description-section__accordion-header closed" : "product-page__description-section__accordion-header"} 
                                        onClick={() => setClosed(!closed)}
                                        >
                                        <h2 className="product-page__description-section__title">Description</h2>
                                    </dt>
                                    <dd className="product-page__description-section__accordion-content" style={descriptionRef.current && { height: descriptionRef.current.clientHeight }}>
                                        <article className="product-page__description-section__accordion-content__item" ref={descriptionRef}>
                                            <p className="product-page__description-section__text">{productDetails.description}</p>
                                            <p>Product ID: {productDetails.id}</p>
                                        </article>
                                    </dd>
                                </dl>
                            </section>
                            <p className="product-page__category">Category: {productDetails.cat_name}</p>
                        </>
                    ) : <Spinner/>}
                </div>
            </div>
        </>
    )
}