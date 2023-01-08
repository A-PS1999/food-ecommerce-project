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
    const [sortSelection, setSortSelection] = useState("name-asc");
    const { categoryName, categoryId } = useParams();
    const { callFetch, fetchState } = useFetch();
    const addItem = useCartStore(addItemSelector);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                await callFetch(`${BASE_URL}/categories/${categoryId}/${pageNum}/order=${sortSelection}`, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error);
            }
        }

        fetchResults();
    }, [pageNum, categoryId, sortSelection])

    useEffect(() => {
        setPageNum(1);
    }, [categoryId])

    useEffect(() => {
        if (fetchState.data.categoryProds) {
            setCategoryProds(fetchState.data.categoryProds);
            setPaginationData(fetchState.data.paginationData);
        }
    }, [fetchState])

    return (
        <>
            <header className='category-prods-header'>
                {categoryName}
            </header>
            <div className='category-prods'>
                {categoryProds && categoryProds.length > 0 ? (
                    <section className='category-prods__sort'>
                        <label htmlFor="sort-options" className='category-prods__sort__label'>Sort by:</label>
                        <div className='category-prods__sort__select-wrap'>
                            <select name="sort-options" id="sort-options" value={sortSelection} onChange={(e) => setSortSelection(e.target.value)}
                                className="category-prods__sort__select"
                            >
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="price-desc">Price (High to low)</option>
                                <option value="price-asc">Price (Low to high)</option>
                            </select>
                        </div>
                    </section>
                ) : null}
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