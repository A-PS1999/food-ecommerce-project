import React from "react";
import { useCartStore } from "../../hooks/useCartStore";
import './CartPage.scss';

const cartSelector = (state) => state.cart;
const removeItemSelector = (state) => state.removeItem;
const clearCartSelector = (state) => state.clearCart;

export default function CartPage() {

    const cart = useCartStore(cartSelector);
    const removeCartItem = useCartStore(removeItemSelector);
    const clearCart = useCartStore(clearCartSelector);

    return (
        <>
            <div>
                <div>
                    <button onClick={clearCart}>Clear cart</button>
                </div>
                <div>
                    {cart && cart.length > 0 ? cart.map((item) => {
                        return (
                            <div>
                                {item.id}
                            </div>
                        )
                    }) : <>
                        <h1>Your cart is empty.</h1>
                    </>
                    }
                </div>
            </div>
        </>
    )
}