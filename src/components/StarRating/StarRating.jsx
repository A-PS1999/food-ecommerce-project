import React, { useState } from "react";
import './StarRating.scss';

export default function StarRating({ onChange, value=null, isDisabled=false }) {

    const [selected, setSelected] = useState(value);

    const handleRatingChange = (e) => {
        setSelected(e.target.value);
        onChange(Number(e.target.value));
    }

    return (
        <>
            <div className="star-rating">
                <input value="0" type="radio" id="rating-0" name="rating" 
                    disabled={isDisabled} className="star-rating__input" checked={selected === null} onChange={handleRatingChange}
                />
                <label aria-label="0 stars" htmlFor="rating-0" className="star-rating__star-label" />
                <label aria-label="0.5 stars" htmlFor="rating-05" className="star-rating__star-label--half">
                    <span className="star-rating__star-icon fa fa-star-half"></span>
                </label>
                <input id="rating-05" value="0.5" type="radio" name="rating" 
                    disabled={isDisabled} className="star-rating__input" checked={selected === "0.5"} onChange={handleRatingChange}
                />
                <label aria-label="1 star" htmlFor="rating-1" className="star-rating__star-label">
                    <span className="star-rating__star-icon fa fa-star"></span>
                </label>
                <input id="rating-1" value="1" type="radio" name="rating" 
                    disabled={isDisabled} className="star-rating__input" checked={selected === "1"} onChange={handleRatingChange}
                />
                <label aria-label="1.5 stars" htmlFor="rating-15" className="star-rating__star-label--half">
                    <span className="star-rating__star-icon fa fa-star-half"></span>
                </label>
                <input id="rating-15" value="1.5" type="radio" name="rating" 
                    disabled={isDisabled} className="star-rating__input" checked={selected === "1.5"} onChange={handleRatingChange}
                />
                <label aria-label="2 stars" htmlFor="rating-2" className="star-rating__star-label">
                    <span className="star-rating__star-icon fa fa-star"></span>
                </label>
                <input id="rating-2" value="2" type="radio" name="rating" 
                    disabled={isDisabled} className="star-rating__input" checked={selected === "2"} onChange={handleRatingChange}
                />
                <label aria-label="2.5 stars" htmlFor="rating-25" className="star-rating__star-label--half">
                    <span className="star-rating__star-icon fa fa-star-half"></span>
                </label>
                <input id="rating-25" value="2.5" type="radio" name="rating" 
                    disabled={isDisabled} className="star-rating__input" checked={selected === "2.5"} onChange={handleRatingChange}
                />
                <label aria-label="3 stars" htmlFor="rating-3" className="star-rating__star-label">
                    <span className="star-rating__star-icon fa fa-star"></span>
                </label>
                <input id="rating-3" value="3" type="radio" name="rating" 
                    disabled={isDisabled} className="star-rating__input" checked={selected === "3"} onChange={handleRatingChange}
                />
                <label aria-label="3.5 stars" htmlFor="rating-35" className="star-rating__star-label--half">
                    <span className="star-rating__star-icon fa fa-star-half"></span>
                </label>
                <input id="rating-35" value="3.5" type="radio" name="rating" 
                    disabled={isDisabled} className="star-rating__input" checked={selected === "3.5"} onChange={handleRatingChange}
                />
                <label aria-label="4 stars" htmlFor="rating-4" className="star-rating__star-label">
                    <span className="star-rating__star-icon fa fa-star"></span>
                </label>
                <input id="rating-4" value="4" type="radio" name="rating" 
                    disabled={isDisabled} className="star-rating__input" checked={selected === "4"} onChange={handleRatingChange}
                />
                <label aria-label="4.5 stars" htmlFor="rating-45" className="star-rating__star-label--half">
                    <span className="star-rating__star-icon fa fa-star-half"></span>
                </label>
                <input id="rating-45" value="4.5" type="radio" name="rating" 
                    disabled={isDisabled} className="star-rating__input" checked={selected === "4.5"} onChange={handleRatingChange}
                />
                <label aria-label="5 stars" htmlFor="rating-5" className="star-rating__star-label">
                    <span className="star-rating__star-icon fa fa-star"></span>
                </label>
                <input id="rating-5" value="5" type="radio" name="rating" 
                    disabled={isDisabled} className="star-rating__input" checked={selected === "5"} onChange={handleRatingChange}
                />
            </div>
        </>
    )
}