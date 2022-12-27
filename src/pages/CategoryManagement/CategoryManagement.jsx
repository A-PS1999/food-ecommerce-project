import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import useModal from "../../hooks/useModal";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import AddCategoryForm from '../../components/AddCategoryForm/AddCategoryForm';
import { handleDelete } from "../../utils/handleDelete";
import './CategoryManagement.scss';

export default function CategoryManagement({ BASE_URL }) {

    const [pageNum, setPageNum] = useState(1);
    const [paginationData, setPaginationData] = useState(null);
    const [categories, setCategories] = useState(null);
    const { callFetch, fetchState } = useFetch();
    const { addCategoryModal: { addCatOpen, toggleCatModal } } = useModal();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                await callFetch(`${BASE_URL}/admin/categories/${pageNum}`, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchCategories()
    }, [pageNum])

    useEffect(() => {
        if (fetchState.data.categories) {
            setCategories(fetchState.data.categories);
            setPaginationData(fetchState.data.paginationData);
        }
    }, [fetchState])

    return (
        <>
            <Modal isOpen={addCatOpen} toggleModal={toggleCatModal}>
                <AddCategoryForm BASE_URL={BASE_URL} />
            </Modal>
            <header className="category-management-header">
                Category Management
            </header>
            <div className='add-btn-container'>
                <button className='add-btn-container__add-btn' onClick={() => toggleCatModal()}>Add</button>
            </div>
            <div className="categories-container">
                {categories && categories.length > 0 ? categories.map((category) => {
                    return (
                        <React.Fragment key={category.id}>
                            <details className="category">
                                <summary className="category__summary">
                                    <div className="category__summary__id">{category.id}</div>
                                    <div className="category__summary__cat-name">{category.cat_name}</div>
                                </summary>
                                <div className="category__infobox">
                                    {category.parent_id != null &&
                                        <div className="category__infobox__parent">Parent Category: {category.parent_id}</div>
                                    }
                                    <div>
                                        <button className="category__infobox__del-btn" onClick={() => handleDelete({
                                            id: category.id,
                                            route: `${BASE_URL}/admin/categories/delete`,
                                            fetchFunc: callFetch,
                                            message: `Are you sure you want to delete category ${category.id}?`
                                        })}>
                                            Delete
                                        </button>
                                    </div>
                                    {category.children[0] != null ? 
                                        <>
                                            <h4 className="category__infobox__children-header">Children</h4>
                                            <div className="category__infobox__child-container">
                                                {category.children.map((child, index) => {
                                                    return (
                                                        <div className="category__infobox__child-container__child" key={index}>
                                                            {child}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </>
                                        : <>
                                            <p className="category__infobox__no-children">This category has no children.</p>
                                        </>
                                    }
                                </div>
                            </details>
                        </React.Fragment>
                    )
                })
                : <>
                    <div>
                        There are no product categories.
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