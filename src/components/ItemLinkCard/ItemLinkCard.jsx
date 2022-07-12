import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import './ItemLinkCard.scss';

export default function ItemLinkCard({ url, headertext }) {

    const [items, setItems] = useState(null);
    const { callFetch, fetchState } = useFetch();

    useEffect(() => {
        const fetchCardItems = async () => {
            try {
                await callFetch(url, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchCardItems()
    }, [])

    useEffect(() => {
        if (fetchState.data.items) {
            setItems(fetchState.data.items)
        }
    }, [fetchState])

    return (
        <>
            <div className="item-link-card">
                <div className="item-link-card__header">{headertext}</div>
                <div className="item-link-card__body">
                    {items && items.length > 0 ? items.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                                <div className="item-link-card__item">
                                    <Link to={`/products/${item.id}`} className="item-link-card__item__link">
                                        <img src={item.image_url} alt={item.prod_name} className="item-link-card__item__img" />
                                        <div className="item-link-card__item__name">{item.prod_name}</div>
                                    </Link>
                                </div>
                            </React.Fragment>
                        )
                    }) : <>
                        <div>An error occurred.</div>
                    </> }
                    <Link className="item-link-card__footer" to="/">See more</Link>
                </div>
            </div>
        </>
    )
}