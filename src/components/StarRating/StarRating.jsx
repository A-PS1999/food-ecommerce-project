import React, { useEffect, useReducer, useMemo } from "react";
import useIsTouchDevice from '../../hooks/useIsTouchDevice';
import Star from "./Star";
import './StarRating.scss';

function calculatePosition(starsNum, positionX, width) {
    const starWidth = width/starsNum; // width of individual star
    let currentVal = starsNum;

    for (let i=0; i < starsNum; i++) {
        if (positionX <= starWidth * i + starWidth/4) {
            if (i === 0 && positionX < starWidth/2) {
                currentVal = 0;
            } else currentVal = i;
            break;
        }
    }
    return currentVal;
}

export default function StarRating({ onClick,
    ratingValue=0,
    starCount=5, 
    isDisabled=false, 
    mainClassName="star-rating", 
    noStarsClassName="star-rating__empty-star-group", 
    starsClassName="star-rating__star-group",
    allowHalfStars=true, 
    size=40 }) {

    const { isTouchDevice } = useIsTouchDevice();

    const [{ defaultValue, hoverValue }, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'POINTER_HOVER':
                return { ...state, hoverValue: action.payload };
            case 'POINTER_LEAVE':
                return { defaultValue: state.defaultValue, hoverValue: null };
            case 'POINTER_CLICK':
                return { ...state, defaultValue: action.payload };
            default:
                return state;
        }
    }, { defaultValue: ratingValue, hoverValue: null })

    useEffect(() => {
        dispatch({ type: 'POINTER_CLICK', payload: ratingValue })
    }, [ratingValue]);

    const totalStars = useMemo(() => (allowHalfStars ? starCount * 2 : starCount), [allowHalfStars, starCount]);

    const onPointerHover = (e) => {
        const { clientX, currentTarget } = e;
        const { left, width } = currentTarget.children[0].getBoundingClientRect();

        const positionX = clientX - left;

        const currentValue = calculatePosition(totalStars, positionX, width);

        if (currentValue > 0 && hoverValue !== currentValue) {
            dispatch({ type: 'POINTER_HOVER', payload: currentValue * 100 / totalStars })
        }
    }

    const onMobilePointer = (e) => {
        if (!isTouchDevice()) {
            return;
        }

        onPointerHover(e);
    }

    const onPointerLeave = () => {
        dispatch({ type: 'POINTER_LEAVE' })
    }

    const setRating = () => {
        if (hoverValue) {
            dispatch({ type: 'POINTER_CLICK', payload: hoverValue });
            if (onClick) onClick(hoverValue);
        }
    }

    const valueToPercentage = useMemo(() => // sets width percentage, calculated earlier
        (!isDisabled && hoverValue && hoverValue) || (defaultValue && defaultValue), 
        [isDisabled, hoverValue, defaultValue]
    );

    return (
        <>
            <span style={{ display: 'inline-block' }}>
                <span 
                    className={mainClassName}
                    onPointerMove={isDisabled ? undefined : onPointerHover}
                    onPointerEnter={isDisabled ? undefined : onMobilePointer}
                    onPointerLeave={isDisabled ? undefined : onPointerLeave}
                    onClick={isDisabled ? undefined : setRating}
                >
                    <span className={noStarsClassName}>
                        {[...Array(5)].map((_, idx) => (
                            <React.Fragment key={idx}>
                                <Star size={size} />
                            </React.Fragment>
                        ))}
                    </span>
                    <span style={{ width: `${valueToPercentage}%` }} className={starsClassName}>
                        {[...Array(5)].map((_, idx) => (
                            <React.Fragment key={idx}>
                                <Star size={size} />
                            </React.Fragment>
                        ))}
                    </span>
                </span>
            </span>
        </>
    )
}