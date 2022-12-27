import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCartStore } from '../../hooks/useCartStore';
import FlipCard from '../../components/FlipCard/FlipCard';
import Pagination from '../../components/Pagination/Pagination';
import useFetch from '../../hooks/useFetch';
import './CategoryPage.scss';

const addItemSelector = (state) => state.addItem;

export default function ResultsPage({ BASE_URL }) {

    const [pageNum, setPageNum] = useState(1);
    const [categoryProds, setCategoryProds] = useState(null);
    const [paginationData, setPaginationData] = useState(null);
    const { categoryId } = useParams();
    const { callFetch, fetchState } = useFetch();
    const addItem = useCartStore(addItemSelector);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                await callFetch(`${BASE_URL}/categories/${categoryId}/${pageNum}`, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error);
            }
        }

        fetchResults();
    }, [pageNum])

    useEffect(() => {
        if (fetchState.data.categoryProds) {
            setCategoryProds(fetchState.data.categoryProds);
            setPaginationData(fetchState.data.paginationData);
        }
    }, [fetchState])

    return (
        <>
            <div className='category-prods'>
                <section className="category-prods__container">
                    {categoryProds && categoryProds.length > 0 ? categoryProds.map((categoryProd) => {
                        return (
                            <React.Fragment key={categoryProd.id}>
                                <FlipCard item={categoryProd} cartFunc={addItem} />
                            </React.Fragment>
                        )
                    })
                    : <>
                        <div className="no-category-prods">
                            It seems there are no products in this category.
                        </div>
                    </>
                    }
                </section>
            </div>
            {paginationData ? (
                <Pagination pageData={paginationData} changePageNum={setPageNum} />
            ) : null}
        </>
    )
}