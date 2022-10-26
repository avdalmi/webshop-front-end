import React, { useState, useMemo } from "react";
import Product from "../../components/Cart/Product";
import "./styles.css";

function Cart(p) {
    const { shoppingCart, setShoppingCart } = p;
    const renderCart = () => {
        if (!shoppingCart)
            return <h1>You have no items in your shopping cart.</h1>;
        const renderedCart = shoppingCart.map((i) => {
            return (
                <>
                    <Product
                        setShoppingCart={setShoppingCart}
                        shoppingCart={shoppingCart}
                        key={`P${i.id}`}
                        info={i}
                    />
                </>
            );
        });
        return renderedCart;
    };
    const renderCheckOut = () => {
        if (shoppingCart === undefined) return;
        const getTotalPrice = () => {
            const totalValue = shoppingCart.map((i) => {
                return i.count * i.price;
            });
            const total = totalValue.reduce((i, j) => {
                return i + j;
            });
            return total.toFixed(2);
        };
        return (
            <>
                Total: {getTotalPrice()}
                <br />
                <button>Place order</button>
            </>
        );
    };
    return (
        <>
            <div className="cart">{renderCart()}</div>;
            <div className="checkout">{renderCheckOut()}</div>;
        </>
    );
}

export default Cart;
