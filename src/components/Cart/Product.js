import React from "react";
import "./styles.css";

export default function Product(p) {
    const removeItem = () => {
        const { shoppingCart, setShoppingCart } = p;
        console.log(shoppingCart);
        if (!shoppingCart) {
            return;
        }
        const productInCart = shoppingCart.find((i) => {
            if (i.id === p.info.id) {
                return true;
            }
        });
        if (productInCart !== undefined) {
            if (productInCart.count >= 2) {
                const newProduct = {
                    ...productInCart,
                    count: productInCart.count - 1,
                };
                setShoppingCart(
                    shoppingCart.map((i) => {
                        if (i.id !== productInCart.id) return i;
                        return newProduct;
                    })
                );
                return;
            }
            if (productInCart.count <= 1) {
                const returnArray = shoppingCart;
                const newArray = returnArray.filter((i) => {
                    if (i === productInCart) return false;
                    return true;
                });
                if (newArray.length !== 0) {
                    setShoppingCart(newArray);
                    return;
                }
                setShoppingCart(undefined);
                return;
            }
        }
    };

    //OnClick event of add to cart button
    const addItem = () => {
        const { shoppingCart, setShoppingCart } = p;
        console.log(p);
        const productToAdd = {
            id: p.info.id,
            image: p.info.mainImage,
            title: p.info.title,
            price: p.info.price,
            count: 1,
        };
        if (!shoppingCart) {
            setShoppingCart([productToAdd]);
            return;
        }
        const productInCart = shoppingCart.find((i) => {
            if (i.id === p.info.id) {
                return true;
            }
        });
        if (productInCart !== undefined) {
            const newProduct = {
                ...productInCart,
                count: productInCart.count + 1,
            };
            setShoppingCart(
                shoppingCart.map((i) => {
                    if (i.id !== productInCart.id) return i;
                    return newProduct;
                })
            );
            return;
        }
        setShoppingCart([...shoppingCart, productToAdd]);
    };

    const calculateTotalCost = () => {
        return (p.info.count * p.info.price).toFixed(2);
    };
    return (
        <div>

            <div key={ p.info.id } className="cartDisplay">

                <div className="cartImgs">
                    <img className="cartImg" src={ p.info.image } />
                </div>

                <div className="cartInfoTitle">{ p.info.title }</div>

                <div className="cartInfoPrice">€{ p.info.price }</div>

                <div className="addBtns">
                    <button className="addButton" onClick={ () => removeItem() }>-</button>
                    <div className="countItem">{ p.info.count }</div>
                    <button className="addButton" onClick={ () => addItem() }>+</button>
                </div>
                <div className="cartInfoPrice"> €{ calculateTotalCost() }</div>
            </div>
            <hr className="cartLiner" />


        </div >
    );
}
