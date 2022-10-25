import React from 'react';
import axios from 'axios';
import { useState, useParams } from "react-router-dom";

function DetailsPage() {
    const [product, setProduct] = useState(null)
    const params = useParams()
    const productId = params.id
    console.log(productId)
    const getProductById = async () =>{
    const productData = await axios.get(`http://localhost:4000/products/${productId}`)
    return productData
}
const productData = getProductById()
console.log(productData)
    return (
        <div></div>
    );
}

export default DetailsPage;