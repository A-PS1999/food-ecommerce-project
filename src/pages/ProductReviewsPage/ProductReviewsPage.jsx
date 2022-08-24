import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import StarRating from "../../components/StarRating/StarRating";
import ReadMoreComponent from "../../components/ReadMoreComponent/ReadMoreComponent";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";
import './ProductReviewsPage.scss';

export default function ProductReviewsPage({ BASE_URL }) {

    const [pageNum, setPageNum] = useState(1);
    const [paginationData, setPaginationData] = useState(null);
    const [productReviews, setProductReviews] = useState(null);
    const [productDetails, setProductDetails] = useState(null);
    const { callFetch, fetchState } = useFetch();
    const { productId } = useParams();

    useEffect(() => {
        const fetchProductReviews = async () => {
            try {
                await callFetch(`${BASE_URL}/get-product-reviews/${productId}/${pageNum}`, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error);
            }
        }

        fetchProductReviews();
    }, [pageNum])

    useEffect(() => {
        if (fetchState.data) {
            setProductDetails(fetchState.data.productDetails);
            setProductReviews(fetchState.data.reviews);
            setPaginationData(fetchState.data.paginationData);
        }
    }, [fetchState])

    return (
        <>
            <header className="product-reviews-header">
                <h1 className="product-reviews-header__title">{productDetails && productDetails.prod_name}</h1>
                {productDetails && (
                    <img src={productDetails.image_url} className="product-reviews-header__img" />
                )}
            </header>
            <section className="product-reviews">
                {productReviews && productReviews.length > 0 ? productReviews.map((review) => {
                    return (
                        <React.Fragment key={review.id}>
                            <div className="product-reviews__review">
                                <h4 className="product-reviews__review__name">{review.name}</h4>
                                <StarRating isDisabled={true} ratingValue={review.rating} />
                                <ReadMoreComponent textClassName={"product-reviews__review__text"}>
                                    {review.review_body}
                                </ReadMoreComponent>
                            </div>
                        </React.Fragment>
                    )
                }) : <Spinner />}
            </section>
            {paginationData ? (
                <Pagination pageData={paginationData} changePageNum={setPageNum} />
            ) : null}
        </>
    )
}