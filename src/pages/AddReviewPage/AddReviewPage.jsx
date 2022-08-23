import React, { useState, useEffect, useContext } from "react";
import { useForm, Controller } from 'react-hook-form';
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AuthContext } from "../../utils/AuthContextProvider";
import StarRating from "../../components/StarRating/StarRating";
import './AddReviewPage.scss';

export default function AddReviewPage({ BASE_URL }) {

    const { callFetch, fetchState } = useFetch();
    const { register, handleSubmit, control } = useForm();
    const navigate = useNavigate();
    const { productId } = useParams();
    const location = useLocation();
    const { userData } = useContext(AuthContext);
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                await callFetch(`${BASE_URL}/products/${productId}`, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error);
            }
        }

        fetchProductDetails();
    }, [])

    useEffect(() => {
        if (fetchState.data.product) {
            setProductDetails(fetchState.data.product);
        }
    }, [fetchState])

    const submitReview = async (data) => {
        if (!userData) {
            navigate('/log-in', { state: { from: location.pathname } })
        }
        if (userData) {
            await callFetch(`${BASE_URL}/user/${userData.id}/add-review/${productId}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            navigate(`/products/${productId}`);
        }
    }

    return (
        <>
            <header className="add-review-header">
                Add Your Review
            </header>
            {productDetails && (
                <div className="add-review-product">
                    <img src={productDetails.image_url} className="add-review-product__img" />
                    <p className="add-review-product__prod-name">{productDetails.prod_name}</p>
                </div>
            )}
            <form className="review-form" onSubmit={handleSubmit(submitReview)}>
                <h4 className="review-form__rating-label">Rating:</h4>
                <Controller 
                    control={control}
                    name="rating"
                    required
                    render={({ field: { onChange } }) => (
                        <StarRating 
                            onClick={onChange}
                            mainClassName="star-rating"
                            noStarsClassName="star-rating__empty-star-group"
                            starsClassName="star-rating__star-group"
                        />
                    )}
                />
                <textarea 
                    placeholder="Please enter your review"
                    {...register("review", { required: true })}
                    className="review-form__textbox" 
                />
                <button type="submit" className="review-form__submit-btn">Submit</button>
            </form>
        </>
    )
}