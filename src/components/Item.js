import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import '../styles/Item.css';

function Item({changePage, addCartItem, incrementCount}) {

    const match = useParams();
    const [item, setItem] = useState({
        rating: {rate: 0}
    });

    useEffect(() => {
        changePage('item');
        getItem();
    }, []);

    async function getItem() {
        let storeAPI = await fetch(`https://fakestoreapi.com/products/${match.id}`);
        storeAPI = await storeAPI.json();
        setItem(storeAPI);
    }

    function handleClick() {
        addCartItem(item);
        incrementCount();
    }

    return (
        <div className="item-page">
            <div className="item-left">
                <img className="specific-item-image" src={item.image} />
            </div>
            <div className="item-right">
                <div className="item-text">
                    <p id="item-title">{item.title}</p>
                    <p id="item-price">${item.price}</p>
                    <p id="item-description">Description: {item.description}</p>
                    <p id="item-rating">Rating: {item.rating.rate}</p>
                    <div className="button-container">
                        <button id="add-item" onClick={handleClick}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;