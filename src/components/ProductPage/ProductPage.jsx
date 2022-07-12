import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import convertPrice from '../../utils/convertPrice';
import Spinner from '../Spinner/Spinner';
import './ProductPage.scss';

export default function ProductPage({ BASE_URL }) {

    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const { callFetch, fetchState } = useFetch();

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

    return (
        <>
            <div className="product-page">
                {productDetails ? (
                    <>
                        <section className="product-page__image">
                            <img src={productDetails.image_url} className="product-page__image__img" />
                        </section>
                        <h1 className="product-page__product-name">{productDetails.prod_name}</h1>
                        <p className="product-page__stock">{productDetails.stock}</p>
                        <p className="product-page__price">{convertPrice(productDetails.price)}</p>
                        <section className="product-page__basket-section">Placeholder</section>
                        <section className="product-page__description-section">
                            <h2 className="product-page__description-section__title">Description</h2>
                            <p>{productDetails.description}</p>
                        </section>
                        <p className="product-page__category">Category: {productDetails.cat_name}</p>
                    </>
                ) : <Spinner/>}
            </div>
        </>
    )
}