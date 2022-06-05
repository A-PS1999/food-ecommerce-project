import React, { useState, useEffect } from 'react';
import './Pagination.scss';

export default function Pagination({ pageData, changePageNum }) {

    const [pageNum, setPageNum] = useState(pageData.currentPage);
    const pagesArray = Array.from(Array(pageData.lastPage), (e,i)=>i+1)

    const toNextPage = () => setPageNum(pageNum + 1);
    const toPrevPage = () => setPageNum(pageNum - 1);
    const toSelectedPage = (num) => setPageNum(num);

    useEffect(() => {
        console.log(pageData);
        changePageNum(pageNum);
    }, [pageNum]);

    return (
        <>
            {pageData && pageData.lastPage > 1 ? (
                <div className='pagination'>
                    <button onClick={toPrevPage} disabled={pageNum <= 1} className="pagination__end-btn">🞀</button>
                    {pagesArray.map((num) => (
                        <button key={num} onClick={() => toSelectedPage(num)} className={num === pageNum ? "pagination__curr-page" : "pagination__num-btn"}>
                            {num}
                        </button>
                    ))}
                    <button onClick={toNextPage} disabled={pageNum === pageData.lastPage} className="pagination__end-btn">🞂</button>
                </div>
                ) : null}
        </>
    )
}