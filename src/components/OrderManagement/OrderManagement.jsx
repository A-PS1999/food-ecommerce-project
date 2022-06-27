import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Pagination from "../Pagination/Pagination";
import './OrderManagement.scss';

export default function OrderManagement({ BASE_URL }) {

    const [pageNum, setPageNum] = useState(1);
    const [paginationData, setPaginationData] = useState(null);
    const [orders, setOrders] = useState(null);
    const { callFetch, fetchState } = useFetch();

    return (
        <>
            <header className="order-management-header">
                Order Management
            </header>
            <div className="orders-container">
                {orders && orders.length > 0 ? orders.map((order) => {
                    return (
                        <React.Fragment id={order.id}>
                            {order.id}
                        </React.Fragment>
                    )
                })
                : <>
                    <div className="no-orders">
                        There are currently no orders.
                    </div>
                </>
            }
            </div>
        </>
    )
}