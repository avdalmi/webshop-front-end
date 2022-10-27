import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Routes, Route, NavLink, Link } from "react-router-dom";
import {
    Description,
    AdditionalInfo,
    Reviews,
} from "../../components/DetailCard";
import "./styles.scss";
import { SocialIcon } from "react-social-icons";


function DetailsPage(p) {
    const [product, setProduct] = useState(undefined);
    const [showReview, setShowReview] = useState(false);

    //Retrieve productId
    const params = useParams();
    const productId = params.id;

    //Retrieve productData
    const getData = () => {
        const getProductById = async () => {
            const productData = await axios.get(
                `http://localhost:4000/products/${productId}`
            );
            setProduct(productData.data);
        };
        getProductById();
    };
    useEffect(() => {
        getData();
    }, []);

    //OnClick event of add to cart button
    const addProduct = () => {
        const { shoppingCart, setShoppingCart } = p;
        console.log(shoppingCart);
        const productToAdd = {
            id: product.id,
            image: product.mainImage,
            title: product.title,
            price: product.price,
            count: 1,
        };
        if (!shoppingCart) {
            setShoppingCart([productToAdd]);
            return;
        }
        const productInCart = shoppingCart.find((i) => {
            if (i.id === product.id) {
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



    //Display review input on detail page
    const [reviews, setReviews] = useState([]);
    const [stars, setStars] = useState(0);
    const [message, setMessage] = useState('');

    const { id } = useParams();

    const getReviewData = () => {
        const getReviewById = async () => {
            const reviewData = await axios.get(`http://localhost:4000/review/all/${id}`);
            // console.log(reviewData);
            setReviews(reviewData.data);
        };
        getReviewById();
    };

    useEffect(() => {
        getReviewData();
    }, []);


    const addReviewHandler = async (event) => {
        event.preventDefault();

        const reviewToAdd = {
            id: reviews.id,
            stars: stars,
            message: message
        };

        await axios.post(`http://localhost:4000/review/${id}`, reviewToAdd);
        // console.log("reviews to add:", reviewToAdd);
        // console.log("reviews and sars", reviewToAdd.stars, reviewToAdd.message);
        setMessage('');
        setStars(0);
    };



    const displayReviewsEvent = (event) => {
        setShowReview(true);
    };
    const hideReviewsEvent = (event) => {
        setShowReview(false);
    };
    //Display product based on productData
    const displayProduct = () => {
        if (!product) {
            return (
                <>
                    <h1>Loading...</h1>
                </>
            );
        }
        return (
            <>
                <div className="containerDes">
                    <img className="photo" src={ product.mainImage } />

                    <div className="description">
                        <div className="title">{ product.title }</div>

                        <div className="reviews">
                            <div className="rating">{ product.rating }</div>
                            <button onClick={ displayReviewsEvent } className="reviewButton">Add Review</button>

                            { showReview && (
                                <div className="reviewContainer">
                                    <form onSubmit={ addReviewHandler }>

                                        <div className="revTitleCnt">
                                            <button onClick={ hideReviewsEvent } class="hideReviewBtn">x</button>
                                            <h1 className="addReviewTitle">Add Review</h1>
                                        </div>
                                        {/* <label htmlFor="review">Name</label>
                                <input
                                    type="text"
                                    id="review"
                                    required
                                /> */}
                                        <label htmlFor="review">Rating</label>
                                        <br />
                                        <input
                                            type="number"
                                            id="stars"
                                            required
                                            max="5"
                                            min="1"
                                            value={ stars }
                                            onChange={ (event) => setStars(event.target.value) }
                                            className="numberInput"
                                        />
                                        <br />
                                        <label htmlFor="message">Review</label>
                                        <br />
                                        <textarea
                                            id="message"
                                            name="message"
                                            placeholder='Write a review...'
                                            required
                                            value={ message }
                                            onChange={ (event) => setMessage(event.target.value) }
                                        />
                                        <br />
                                        <button className="submitBtn" type="submit">Submit</button>
                                    </form>
                                </div>
                            ) }

                        </div>

                        <div className="price">€{ product.price }</div>

                        <div className="buttons">
                            <button
                                className="cartButton"
                                onClick={ () => addProduct() }
                            >
                                <svg
                                    className="cartIcon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={ 1.5 }
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                    />
                                </svg>
                                Add to Cart
                            </button>

                            <button className="favButton">
                                <svg
                                    className="favIcon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={ 1.5 }
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                    />
                                </svg>
                                Favourite
                            </button>
                        </div>

                        <div className="category">
                            Category: { product.category.title }
                        </div>

                        <div className="socialsShop">
                            <h4>Share</h4>
                            <SocialIcon
                                className="sicon"
                                url="https://facebook.com"
                                bgColor="#000000"
                                style={ { maxHeight: 20, width: 20 } }
                            />
                            <SocialIcon
                                className="sicon"
                                url="https://instagram.com"
                                bgColor="#000000"
                                style={ { maxHeight: 20, width: 20 } }
                            />
                            <SocialIcon
                                className="sicon"
                                url="https://twitter.com"
                                bgColor="#000000"
                                style={ { maxHeight: 20, width: 20 } }
                            />
                        </div>
                    </div>
                </div>

                <div className="info">
                    <div className="displayLink">
                        <Link to="." className="displayLinks">
                            Description
                        </Link>
                        <Link to="info" className="displayLinks">
                            Additional Info
                        </Link>
                        <Link to="reviews/all" className="displayLinks">
                            Review
                        </Link>
                    </div>
                    <Routes>
                        <Route
                            path={ `/` }
                            element={
                                <Description
                                    className="routeLink"
                                    description={ product.description }
                                />
                            }
                        />
                        <Route
                            path="/info"
                            element={ <AdditionalInfo className="routeLink" /> }
                        />
                        <Route
                            path="/reviews/all"
                            element={
                                <Reviews
                                    className="routeLink"
                                    reviews={ reviews }
                                /> }
                        />
                    </Routes>
                </div>
            </>
        );
    };
    return <div>{ displayProduct() }</div>;
}

export default DetailsPage;
