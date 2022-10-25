import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Routes, Route, NavLink, Link } from "react-router-dom";
import { Description, AdditionalInfo, Reviews } from "../../components/DetailCard";

function DetailsPage() {
    const [product, setProduct] = useState(undefined)
    
    //Retrieve productId
    const params = useParams()
    const productId = params.id

    //Retrieve productData
    const getData = () => {
        const getProductById = async () => {
            const productData = await axios.get(`http://localhost:4000/products/${productId}`)
            setProduct(productData.data)
        }
        getProductById()
    }
    useEffect(() => {
        getData()
    }, [])

    console.log(product)
    //Display product based on productData
    const displayProduct = () => {
        if (!product) {
            return (
                <><h1>Loading...</h1></>
            )
        }
        return (
            <>
            <div className='title'><h1>{product.title}</h1></div>
            <div className='price'>€{product.price}</div>
            <div className='category'>Category: {product.categoryId}</div>
            <div className='img'><img></img></div>
            <div className='info'>
            <div className='linkItems'>
                        <Link
                            to='.'
                            className='linkItems'
                        >Description</Link>
                        <Link
                            to='info'
                            className='linkItems'
                        >Additional Info</Link>
                        <Link
                            to='reviews'
                            className='linkItems'
                        >Reviews</Link>
                    </div>
            <Routes>
                <Route path={`/`} element={ <Description description={product.description}/> } />
                <Route path="/info" element={ <AdditionalInfo /> } />
                <Route path="/reviews" element={ <Reviews /> } />
            </Routes>
            </div>
            </>
        )
    }
    return (
        <div>{displayProduct()}</div>
    );
}

export default DetailsPage;