import React from "react";

export default function Star({ size=25, className="star-rating__star" }) {

    return (
        <svg fill="currentColor" className={className} width={size} height={size} viewBox='0 0 24 24'>
            <path 
                fill="currentColor"
                strokeMiterlimit={10}
                strokeWidth={0}
                d='M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z'
            />
        </svg>
    )
}