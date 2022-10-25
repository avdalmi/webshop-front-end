import React from 'react';
import "./styles.css";
import Banner from '../../components/Banner';
import ProductCard from '../../components/ProductCard';
import axios from 'axios';
import { useState, useEffect } from 'react';


function Homepage() {
    let [responseData, setResponseData] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/products");
            console.log(response.data);
            setResponseData(response.data);
        } catch (error) {
            console.log("error test:");
        }
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <>
            { responseData.map(data => {
                <>
                    <p></p>
                </>;
            }) }

            {/* { responseData.map((data) => {
                    <ProductCard
                        key={ data.id }
                        image={ data.mainImage }
                        price={ data.price }
                        rating={ data.rating }
                        description={ data.description }
                    />;
                }) } */}
        </>
    );
}

export default Homepage;