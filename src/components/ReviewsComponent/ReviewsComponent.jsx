import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import StarRating from "../StarRating/StarRating";
import ReadMoreComponent from '../ReadMoreComponent/ReadMoreComponent';
import { Link } from "react-router-dom";
import './ReviewsComponent.scss';

export default function ReviewsComponent({ queryString, productId }) {

    const [reviewData, setReviewData] = useState(null);
    const { callFetch, fetchState } = useFetch();

    useEffect(() => {
        const fetchProductReviewSample = async () => {
            if (!reviewData) {
                await callFetch(queryString, {
                    method: 'get'
                })
            }
        }

        fetchProductReviewSample();
    }, [])

    useEffect(() => {
        if (fetchState.data.reviews) {
            setReviewData(fetchState.data.reviews);
        }
    }, [fetchState]);

    return (
        <>
            <div className="reviews">
                {reviewData ? (
                    <>
                        {reviewData.slice(0, 8).map((review) => {
                            return (
                                <div className="reviews__item" key={review.id}>
                                    <h4 className="reviews__item__title">{review.name}</h4>
                                    <div className="reviews__item__rating-container">
                                        <StarRating 
                                            isDisabled={true}
                                            ratingValue={review.rating}
                                        />
                                    </div>
                                    <ReadMoreComponent
                                        textClassName="reviews__item__paragraph"
                                    >
                                        {review.review_body}
                                    </ReadMoreComponent>
                                </div>
                            )
                        })}
                    </>
                    ) : null
                }
                {reviewData && reviewData.length > 8 ? 
                    <Link to={`/products/${productId}/reviews`} className="reviews__link-btn">
                        See all reviews
                    </Link> 
                : null}
            </div>
        </>
    )
}