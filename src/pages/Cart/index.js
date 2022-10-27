import React, { useState, useMemo } from "react";
import Product from "../../components/Cart/Product";
import axios from "axios";
import "./styles.css";

function Cart(p) {
    const { shoppingCart, setShoppingCart } = p;

    const renderCart = () => {
        if (!shoppingCart)
            return <h1 className="noItemsCart">You have no items in your shopping cart.</h1>;
        const renderedCart = shoppingCart.map((i) => {
            return (
                <>
                    <Product
                        setShoppingCart={ setShoppingCart }
                        shoppingCart={ shoppingCart }
                        key={ `P${i.id}` }
                        info={ i }
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

        const getTotalTaxPrice = () => {
            const totalValue = shoppingCart.map((i) => {
                return i.count * i.price * 1.06;
            });
            const total = totalValue.reduce((i, j) => {
                return i + j;
            });
            return total.toFixed(2);
        };

        const checkOut = () => {
            console.log(shoppingCart);
            const postData = async () => {
                const productData = await axios.post(
                    `http://localhost:4000/user/purchase`,
                    { shoppingCart: shoppingCart }
                );
                return;
            };
            postData();
        };
        return (
            <>
                <div className="checkoutContainer">
                    <h1>Cart Totals</h1>
                    <div className="numContainer">
                        <div className="sepNum">
                            Subtotal: <div>{ getTotalPrice() }</div>
                        </div>

                        <hr className="cartLine" />

                        <div className="sepNum">
                            Total: <div>{ getTotalTaxPrice() }</div>
                        </div>
                        <hr className="cartLine" />
                        <div className="shipping">Shipping and taxes calculated at checkout</div>
                        <button className="cartButton" onClick={ () => checkOut() }>Place order</button>
                    </div>
                </div>
            </>
        );
    };
    return (
        <>
            <div className="mainCrtC">
                <h1 className="cartHeader">Shopping Cart</h1>

                <div className="cartTitles">
                    <p className="titleProduct">Product</p>
                    <p className="titlePrice">Price</p>
                    <p className="titleQuantity">Quantity</p>
                    <p className="titleTotal">Total</p>
                </div>
                <div className="cartMainContainer">
                    <div>



                        <div className="cart">{ renderCart() }</div>
                        <div className="updateBtn">
                            <button className="uptBtn">Update cart</button>
                            <button className="clrBtn">Clear cart </button>
                        </div>
                    </div>

                    <div className="checkout">{ renderCheckOut() }</div>
                </div>


            </div>
        </>
    );
}

export default Cart;
