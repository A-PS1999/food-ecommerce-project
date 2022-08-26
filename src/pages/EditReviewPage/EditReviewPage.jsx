import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import StarRating from "../../components/StarRating/StarRating";
import useFetch from "../../hooks/useFetch";
import './EditReviewPage.scss';

export default function EditReviewPage({ BASE_URL }) {

    const location = useLocation();
    const navigate = useNavigate();
    const { userId, reviewId } = useParams();
    const { callFetch, fetchState } = useFetch();
    const { register, handleSubmit, control } = useForm();

    const postEditedReview = async (data) => {
        try {
            await callFetch(`${BASE_URL}/user/${userId}/reviews/${reviewId}/update`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rating: data.rating, body: data.review })
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (fetchState.status === 'success') {
            navigate(`/user/${userId}/reviews`);
        }
    }, [fetchState])

    return (
        <>
            <header className="editreview-header">
                Edit Review
            </header>
            <form className="editreview-form" onSubmit={handleSubmit(postEditedReview)}>
                <h4 className="editreview-form__rating-label">New Rating:</h4>
                <Controller 
                    control={control}
                    name="rating"
                    required
                    render={({ field: { onChange } }) => (
                        <StarRating value={String(location.state.review_rating)} onChange={onChange} />
                    )}
                />
                <textarea 
                    {...register("review", { required: true })} 
                    className="editreview-form__textbox" 
                    defaultValue={location.state.review_body} 
                />
                <button type="submit" className="editreview-form__submit-btn">Submit</button>
            </form>
        </>
    )
}