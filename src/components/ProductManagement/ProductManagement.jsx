import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import Pagination from '../Pagination/Pagination';
import './ProductManagement.scss';

export default function ProductManagement({ BASE_URL }) {

    const [pageNum, setPageNum] = useState(1);
    const [paginationData, setPaginationData] = useState(null);
    const [products, setProducts] = useState(null);
    const { callFetch, fetchState } = useFetch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await callFetch(`${BASE_URL}/admin/products/${pageNum}`, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error);
            }
        }

        fetchProducts()
    }, [pageNum])

    useEffect(() => {
        if(fetchState.data.products) {
            console.log(fetchState.data.products);
            setProducts(fetchState.data.products);
            setPaginationData(fetchState.data.paginationData);
        }
    }, [fetchState])

    return (
        <>
            <header className="product-management-header">
                Product Management
            </header>
            <div className='products-container'>
                {products && products.length > 0 ? products.map((product) => {
					return (
						<React.Fragment key={product.id}>
							<details>
                                <summary>PLACEHOLDER</summary>
                                <div>
                                    ALSO PLACEHOLDER
                                </div>
                            </details>
						</React.Fragment>
						)
					})
					: <>
						<div>
							There are no products.
						</div>
					</>
				}
            </div>
            {paginationData ? (
                <Pagination pageData={paginationData} changePageNum={setPageNum} />
            ) : null}
        </>
    )
}