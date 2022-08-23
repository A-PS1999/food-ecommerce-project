import React, { useState } from "react";
import './ReadMoreComponent.scss';

export default function ReadMoreComponent({ children, 
    charLimit=200, 
    readMoreText="Read more", 
    readLessText="Read less",
    readMoreClassName="read-more",
    readLessClassName="read-less", 
    textClassName }) {

    const [showMore, setShowMore] = useState(false);
    const shortenedText = children.substr(0, charLimit).replace(/[\s\n]+$/, "") // regexes to replace whitespace, various characters
                            .replace(/[.,\/#$%\^&\*;:{}=\-_`~()]+$/, "") + (charLimit >= children.length ? '' : '...'); // after substring with nothing ("")

    const ReadMore = () => ((charLimit >= children.length || !readMoreText) ? null : 
        <span role="presentation" onClick={() => setShowMore(true)} className={readMoreClassName}>
            {readMoreText}
        </span>
    )
    const ReadLess = () => ((charLimit >= children.length || !readLessText) ? null :
        <span role="presentation" onClick={() => setShowMore(false)} className={readLessClassName}>
            {readLessText}
        </span>
    )

    return (
        <>
            <p className={textClassName}>
                {showMore ? children : shortenedText} {showMore ? <ReadLess /> : <ReadMore />}
            </p>
        </>
    )
}