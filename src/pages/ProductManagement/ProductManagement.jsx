import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import useModal from '../../hooks/useModal';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import AddProductForm from '../../components/AddProductForm/AddProductForm';
import { handleDelete } from '../../utils/handleDelete';
import './ProductManagement.scss';

export default function ProductManagement({ BASE_URL }) {

    const [pageNum, setPageNum] = useState(1);
    const [paginationData, setPaginationData] = useState(null);
    const [products, setProducts] = useState(null);
    const { callFetch, fetchState } = useFetch();
    const { addProductModal: { isOpen, toggleModal } } = useModal();

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
            setProducts(fetchState.data.products);
            setPaginationData(fetchState.data.paginationData);
        }
    }, [fetchState])

    return (
        <>
            <Modal isOpen={isOpen} toggleModal={toggleModal}>
                <AddProductForm BASE_URL={BASE_URL} />
            </Modal>
            <header className="product-management-header">
                Product Management
            </header>
            <div className='add-btn-container'>
                <button className='add-btn-container__add-btn' onClick={() => toggleModal()}>Add</button>
            </div>
            <div className='products-container'>
                {products && products.length > 0 ? products.map((product) => {
					return (
						<React.Fragment key={product.id}>
							<details className='product'>
                                <summary className="product__summary">
                                    <div className='product__innersummary'>
                                        <div className='product__summary__id'>{product.id}</div>
                                        <div className='product__summary__stock'>Stock: {product.stock}</div>
                                    </div>
                                    <div className='product__summary__name'>{product.prod_name}</div>
                                </summary>
                                <div className='product__infobox'>
                                    <img src={product.image_url} className="product__infobox__img" />
                                    <div className='product__infobox__price'>{product.price}</div>
                                    <div className='product__infobox__category'>{product.category_id}</div>
                                    <div>
                                        <button className='product__infobox__del-btn' onClick={() => handleDelete({
                                            id: product.id,
                                            route: `${BASE_URL}/admin/products/delete`,
                                            fetchFunc: callFetch,
                                            message: `Are you sure you want to delete product ${product.id}?`,
                                            stateFunc: setProducts,
                                            state: products
                                        })}>
                                            Delete
                                        </button>
                                    </div>
                                    <p className='product__infobox__description'>{product.description}</p>
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