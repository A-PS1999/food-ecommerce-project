import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import useModal from '../../hooks/useModal';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import AddProductForm from '../AddProductForm/AddProductForm';
import convertPrice from '../../utils/convertPrice';
import convertCatId from '../../utils/convertCatId';
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

    const handleDeleteProduct = async (id) => {
        if (window.confirm(`Are you sure you want to delete product ${id}?`)) {
            try {
                await callFetch(`${BASE_URL}/admin/products/delete`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ toDelete: id })
                })
                let updatedProducts = products.filter((product) => product.id !== id);
                setProducts(updatedProducts);
            } catch (error) {
                console.log(error)
            }
        }
    }

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
                                    <div className='product__infobox__price'>{convertPrice(product.price)}</div>
                                    <div className='product__infobox__category'>{convertCatId(product.category_id)}</div>
                                    <div>
                                        <button onClick={() => handleDeleteProduct(product.id)} className='product__infobox__del-btn'>Delete</button>
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