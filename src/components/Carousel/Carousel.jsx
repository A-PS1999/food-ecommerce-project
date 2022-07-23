import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import useFetch from '../../hooks/useFetch';
import './Carousel.scss';

export default function Carousel({ apiCall, numToDisplay, gutter, start=0, wishlist=false }) {

    const [carouselWidth, setCarouselWidth] = useState(0);
    const [items, setItems] = useState(null);
    const [itemWidth, setItemWidth] = useState(null);
    const [showArrow, setShowArrow] = useState(true);
    const { callFetch, fetchState } = useFetch();

    const carouselRef = useRef(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                await callFetch(apiCall, {
                    method: 'get'
                })
            } catch (error) {
                console.log(error);
            }
        }

        fetchItems()
    }, []);

    useEffect(() => {
        if (fetchState.data.items) {
            setItems(fetchState.data.items);
        }
    }, [fetchState]);

    const scroll = useCallback((direction) => {
        carouselRef.current.scrollBy({
            top: 0,
            left: direction === 'right' ? itemWidth : -itemWidth,
            behavior: "smooth"
        })
    }, [itemWidth]);

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            setCarouselWidth(carouselRef.current.offsetWidth)
        })
        observer.observe(carouselRef.current);

        return () => observer.disconnect();
    });

    const getItemWidth = useCallback(() => {
        setItemWidth(Math.floor(
            Math.floor(carouselRef.current.offsetWidth -1) / numToDisplay - Math.floor((gutter * (numToDisplay-1)) / numToDisplay)
        ))
    }, [gutter, numToDisplay]);

    const scrollToPosition = useCallback(() => {
        carouselRef.current.scrollLeft = start > 0 ? start * itemWidth - gutter : 0;
    }, [start, itemWidth, gutter]);

    useLayoutEffect(() => {
        getItemWidth()
    }, [carouselWidth, getItemWidth, gutter, numToDisplay]);

    useLayoutEffect(() => {
        scrollToPosition()
    }, [scrollToPosition]);

    return (
        <>
            <div className="carousel">
                {showArrow && items && 
                    <button className="carousel__button--left" onClick={() => scroll('left')}>
                        <img alt="Left" src="/chevron-left.svg" />
                    </button>
                }
                <ul className="carousel__item-list" ref={carouselRef} style={{ gap: `${gutter}px` }}>
                    {items && items.length > 0 ? items.map((item) => {
                        return (
                            <React.Fragment key={item.id}>
                                <li className="carousel__item-list__item" style={{ width: itemWidth, scrollSnapAlign: 'start' }}>
                                    <Link to={`/products/${item.id}`}>
                                        <img className="carousel__item-list__item__img" 
                                            src={item.image_url} 
                                            style={{ maxWidth: itemWidth, maxHeight: itemWidth }} 
                                        />
                                    </Link>
                                </li>
                            </React.Fragment>
                        )
                    }) : <>
                        {wishlist ? 
                            <li className="carousel__none-message">Looks like you haven't added anything to your wishlist.</li>
                            :
                            <li className="carousel__none-message">An error occurred.</li>
                        }
                    </>}
                </ul>
                {showArrow && items &&
                    <button className="carousel__button--right" onClick={() => scroll('right')}>
                        <img alt="Right" src="/chevron-right.svg" />
                    </button>
                }
            </div>
        </>
    )
};