import React from "react";
import StarRating from "../StarRating/StarRating";
import ReadMoreComponent from "../ReadMoreComponent/ReadMoreComponent";
import './FlipCard.scss';

export default function FlipCard({ item, cartFunc }) {

    const handleAddOneToCart = () => {
        cartFunc(item.id, 1);
    }

    return (
        <>
            <div className="flipcard">
                <div className="flipcard__inner">
                    <div className="flipcard__side flipcard__side--front">
                        <img src={item.image_url} className="flipcard__side__img" />
                        <div className="flipcard__side__heading--front">
                            {item.prod_name}
                        </div>
                        <b className="flipcard__side__text--front">{item.price}</b>
                        <div className="flipcard__side__review-score">
                            <StarRating ratingValue={item.avg_rating} isDisabled={true} size={30} />
                            <p className="flipcard__side__review-score__text">({item.reviews_count})</p>
                        </div>
                    </div>
                    <div className="flipcard__side flipcard__side--back">
                        <div className="flipcard__side__heading">
                            {item.prod_name}
                        </div>
                        <b className="flipcard__side__text">{item.price}</b>
                        <ReadMoreComponent expandable={false} textClassName="flipcard__side__text--back">
                            {item.description}
                        </ReadMoreComponent>
                        <button onClick={() => handleAddOneToCart()} className="flipcard__side__button">
                            Add to basket
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}