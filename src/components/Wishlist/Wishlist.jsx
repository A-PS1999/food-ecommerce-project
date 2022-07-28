import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import convertPrice from '../../utils/convertPrice';
import convertCatId from '../../utils/convertCatId';
import useFetch from "../../hooks/useFetch";
import { useCartStore } from "../../hooks/useCartStore";
import { AuthContext } from "../../utils/AuthContextProvider.jsx";
import Pagination from "../Pagination/Pagination";
import './Wishlist.scss';

const addItemSelector = (state) => state.addItem;

export default function Wishlist({ BASE_URL }) {

    const [wishlist, setWishlist] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [paginationData, setPaginationData] = useState(null);
    const { userId } = useParams();
    const addItem = useCartStore(addItemSelector);
    const navigate = useNavigate();
    const { callFetch, fetchState } = useFetch();
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        if (userData && userData.is_admin === false && (userData.id != userId)) {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                await callFetch(`${BASE_URL}/user/${userId}/wishlist/${pageNum}`, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error);
            }
        }

        fetchWishlist();
    }, [pageNum]);

    useEffect(() => {
        if (fetchState.data.wishlist) {
            setWishlist(fetchState.data.wishlist);
            setPaginationData(fetchState.data.paginationData);
        }
        console.log(fetchState.data.wishlist)
    }, [fetchState]);

    const handleAddToCart = (id) => {
        addItem(id, 1);
    }

    const clearWishlist = async () => {
        try {
            await callFetch(`${BASE_URL}/user/${userId}/wishlist/clear`, {
                method: 'post'
            })
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteWishlistItem = async (id) => {
        try {
            await callFetch(`${BASE_URL}/user/${userId}/wishlist/delete`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ toDelete: id })
            })
            let updatedItems = wishlist.filter((item) => item.id !== id);
            setWishlist(updatedItems);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <header className="wishlist-header">
                Your Wishlist
            </header>
            <section className="wishlist">
                {(wishlist && wishlist.length > 0) && (
                    <div className="wishlist__btn-container">
                        <button type="button" className="wishlist__btn-container__clear-btn" onClick={() => clearWishlist()}>
                            Clear Wishlist
                        </button>
                    </div>
                )}
                <div className="wishlist__list">
                    {wishlist && wishlist.length > 0 ? wishlist.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                                <div className="wishlist__list__item">
                                    <Link to={`/products/${item.product_id}`} className="wishlist__list__item__img-link">
                                        <img src={item.image_url} className="wishlist__list__item__img-link__img" />
                                    </Link>
                                    <div className="wishlist__list__item__infobox">
                                        <Link to={`/products/${item.product_id}`} className="wishlist__list__item__infobox__name">{item.prod_name}</Link>
                                        <p className="wishlist__list__item__infobox__price">{convertPrice(item.price)}</p>
                                        <p className="wishlist__list__item__infobox__category">Category: {convertCatId(item.category_id)}</p>
                                    </div>
                                    <div className="wishlist__list__item__btn-group">
                                        <button className="wishlist__list__item__btn-group__cart" onClick={() => handleAddToCart(item.product_id)}>
                                            Add to basket
                                        </button>
                                        <button className="wishlist__list__item__btn-group__del" onClick={() => deleteWishlistItem(item.id)}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })
                    : <>
                        <div className="wishlist-empty">
                            It looks like your wishlist is empty.
                        </div>
                    </>
                    }
                </div>
            </section>
            {paginationData ? (
                <Pagination pageData={paginationData} changePageNum={setPageNum} />
            ) : null}
        </>
    )
}