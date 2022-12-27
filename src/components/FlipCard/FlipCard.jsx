import React from "react";
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
                        <div className="flipcard__side__heading">
                            {item.prod_name}
                        </div>
                        <b className="flipcard__side__text">{item.price}</b>
                    </div>
                    <div className="flipcard__side flipcard__side--back">
                        <div className="flipcard__side__heading">
                            {item.prod_name}
                        </div>
                        <b className="flipcard__side__text">{item.price}</b>
                        <ReadMoreComponent textClassName="flipcard__side__text">
                            {item.description}
                        </ReadMoreComponent>
                        <button onClick={() => handleAddOneToCart()}>
                            Add to basket
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}