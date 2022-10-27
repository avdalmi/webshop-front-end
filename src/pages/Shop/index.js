import React from "react";
import "./styles.css";
import Banner from "../../components/Banner";
import ProductCard from "../../components/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './styles.css';

function Shop() {
    let [responseData, setResponseData] = useState([]);
    let [categories, setCategories] = useState([]);
    let [filterSettings, setFilterSettings] = useState(undefined);

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/products");
            const categories = await axios.get(
                "http://localhost:4000/products/categories"
            );
            setResponseData(response.data);
            setCategories(categories.data);
        } catch (error) {
            console.log("error test:");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getFilterState();
        console.log(responseData);
    }, [categories]);

    const handleFilter = (p, e) => {
        const newSettings = filterSettings.map((i) => {
            if (i.id === p.id) {
                return { ...i, filtered: e };
            }
            return i;
        });
        setFilterSettings(newSettings);
    };

    const handleCheck = (p) => {
        let filterValue = false;
        if (filterSettings === undefined) {
            return filterValue;
        }
        filterSettings.map((i) => {
            if (i.id === p.id) {
                filterValue = i.filtered;
            }
        });
        return filterValue;
    };

    const renderFilter = () => {
        if (!categories) return;
        const categoryNames = categories.map((i) => {
            return (
                <div className="catItems" key={ `${i.id}` }>
                    <input className="catCheckbox"
                        key={ `${i.id}` }
                        type="checkbox"
                        onChange={ (e) => handleFilter(i, e.target.checked) }
                        checked={ handleCheck(i) }
                    ></input>
                    <h3 className="catItemTitle">{ i.title }</h3>
                </div>
            );
        });
        return categoryNames;
    };

    const getFilterState = () => {
        const stateObject = categories.map((i) => {
            return { id: i.id, filtered: true };
        });
        setFilterSettings(stateObject);
    };

    const renderProductCards = () => {
        if (!filterSettings) return;
        const products = responseData.map((data) => {
            const filterState = filterSettings.find((i) => {
                if (i.id === data.categoryId) return true;
            });
            if (!filterState || filterState.filtered === false) return;
            return (
                <ProductCard
                    title={ data.title }
                    id={ data.id }
                    key={ data.id }
                    mainImage={ data.mainImage }
                    price={ data.price }
                    rating={ data.rating }
                    description={ data.description }
                />
            );
        });
        return products;
    };
    return (
        <>
            <Banner />
            <div className="shopContainer">
                <div className="catContainer">
                    <h1 className="catTitle">Categories</h1>
                    <div className="filter">{ renderFilter() }</div>
                </div>

                <div className="productContainer">
                    <div className="products">{ renderProductCards() }</div>
                </div>
            </div>
        </>
    );
}

export default Shop;
