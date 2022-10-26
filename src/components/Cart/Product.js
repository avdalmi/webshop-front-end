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
        <div key={p.info.id} className="product">
            <button onClick={() => removeItem()}>-</button>
            <button onClick={() => addItem()}>+</button>
            <h1>
                Total ({p.info.count}): €{calculateTotalCost()}
            </h1>
            <div className="image">
                <img src={p.info.image} />
            </div>
            <h5>{p.info.title}</h5>
        </div>
    );
}
