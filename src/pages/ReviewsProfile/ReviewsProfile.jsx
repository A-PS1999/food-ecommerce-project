import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import StarRating from "../../components/StarRating/StarRating";
import Pagination from "../../components/Pagination/Pagination";
import { useParams, useNavigate } from "react-router-dom";
import './ReviewsProfile.scss';

export default function ReviewsProfile({ BASE_URL }) {

    const { userId } = useParams();
    const navigate = useNavigate();
    const [pageNum, setPageNum] = useState(1);
    const [paginationData, setPaginationData] = useState(null);
    const [userReviews, setUserReviews] = useState(null);
    const { callFetch, fetchState } = useFetch();

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                await callFetch(`${BASE_URL}/user/${userId}/reviews/${pageNum}`, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error);
            }
        }

        fetchUserReviews();
    }, [pageNum])

    useEffect(() => {
        if (fetchState.data.reviews) {
            setUserReviews(fetchState.data.reviews);
            setPaginationData(fetchState.data.paginationData);
        }
        console.log(fetchState.data)
    }, [fetchState])

    const handleDeleteReview = async (id) => {
        if (window.confirm(`Are you sure you want to delete review ${id}?`)) {
            try {
                await callFetch(`${BASE_URL}/user/${userId}/reviews/delete`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ toDelete: id })
                })
                let updatedReviews = userReviews.filter((review) => review.id !== id);
                setUserReviews(updatedReviews);
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleEditButtonClick = (reviewId, rating, body) => {
        navigate(`/user/${userId}/reviews/${reviewId}/edit`, { state: { review_body: body, review_rating: rating } });
    }

    return (
        <>
            <header className="reviewsprofile-header">
                Your Reviews
            </header>
            <div className="reviewsprofile">
                {userReviews && userReviews.length > 0 ? userReviews.map((review) => {
                    return (
                        <React.Fragment key={review.id}>
                            <details className="reviewsprofile__review">
                                <summary className="reviewsprofile__review__summary">
                                    <div className="reviewsprofile__review__innersummary">
                                        <div className="reviewsprofile__review__innersummary__id">{review.id}</div>
                                    </div>
                                    <p className="reviewsprofile__review__summary__prodname">{review.prod_name}</p>
                                </summary>
                                <div className="reviewsprofile__review__infobox">
                                    <img src={review.image_url} className="reviewsprofile__review__infobox__img" />
                                    <div className="reviewsprofile__review__infobox__btn-group">
                                        <button type="button" className='reviewsprofile__review__infobox__del-btn'
                                            onClick={() => handleDeleteReview(review.id)}>
                                            Delete
                                        </button>
                                        <button type="button" className="reviewsprofile__review__infobox__edit-btn"
                                            onClick={() => handleEditButtonClick(review.id, review.rating, review.review_body)}>
                                            Edit
                                        </button>
                                    </div>
                                    <StarRating value={String(review.rating)} isDisabled={true} />
                                    <h2 className="reviewsprofile__review__infobox__review-header">Review Text:</h2>
                                    <div className="reviewsprofile__review__infobox__review-container">
                                        <p className="reviewsprofile__review__infobox__review-container__review">{review.review_body}</p>
                                    </div>
                                </div>
                            </details>
                        </React.Fragment>
                    )
                }) : <>
                    <div className="no-reviews">
                        Looks like you haven't written any reviews.
                    </div>
                </>
                }
            </div>
            {paginationData ? (
                <Pagination pageData={paginationData} changePageNum={setPageNum} />
            ) : null}
        </>
    )
}