import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import '../styles/Shop.css';

function Shop({changePage}) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        changePage('shop');
        getItems();
    }, []);

    async function getItems() {
        let storeAPI = await fetch('https://fakestoreapi.com/products');
        storeAPI = await storeAPI.json();
        setItems(storeAPI);
    }

    return (
        <div className="home-container">
            {items.map((item) => {
                return (
                    <Link key={`link${item.id}`} to={`/shop/${item.id}`}>
                        <div key={item.id} className="item-container" id={`item${item.id}`}>
                            <img key={`img${item.id}`} className="item-image" src={item.image}></img>
                            <div key={`title-price${item.id}`} className="item-title-price">
                                <p key={`title${item.id}`}>{item.title}</p>
                                <p key={`price${item.id}`}>${item.price}</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default Shop;