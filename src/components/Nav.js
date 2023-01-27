import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

function Nav({cartItems, itemCount, chosenItems, total, incrementItem, decrementItem}) {

    const [activeOrNot, setActiveOrNot] = useState("inactive");
    const [cartClicked, setCartClicked] = useState(false);

    useEffect(() => {
        if(itemCount != 0) {
            setActiveOrNot("active");
        }
        else {
            setActiveOrNot("inactive");
        }
    }, [itemCount]);

    function handleClick() {
        setCartClicked(!cartClicked);
    }

    return (
        <div className="nav-container">
            <Link to="/">
                <p id="logo">&#128717;</p>
            </Link>
            <ul className="nav-shop">
                <li>
                    <Link to="/shop">
                        Shop
                    </Link>
                </li>
                <li id="cart-count">
                    <div id="cart" onClick={handleClick}>
                        &#128722;
                    </div>
                    <div id="count" className={activeOrNot}>
                            {itemCount}
                    </div>
                </li>
            </ul>
            <div className={`items-in-cart ${cartClicked}`}>
                <p onClick={handleClick} id="x">&#10006;</p>
                <p id="your-shopping-cart">Your Shopping Cart</p>
                <div className="item-in-cart-container">
                    {chosenItems.map((item) => {
                        return (
                            <div className="item-in-cart" key={`item-in-cart${item.id}`}>
                                <img className="item-image-in-cart" key={`img${item.id}`} src={item.image} />
                                <p className="item-title-in-cart" key={`title${item.id}`}>{item.title}</p>
                                <p className="item-price-in-cart" key={`price${item.id}`}>${item.price}</p>
                                <div className="item-count-increment-decrement" key={`item-count-increment-decrement${item.id}`}>
                                    <span className="item-count" key={`item-count${item.id}`}>{cartItems[item.id]}</span>
                                    <div className="increment-decrement-btns" key={`increment-decrement-btn${item.id}`}>
                                        <button className="increment-count" onClick={decrementItem} data={item.id} key={`increment-count${item.id}`}>&#8595;</button>
                                        <button className="decrement-count" onClick={incrementItem} data={item.id} key={`decrement-count${item.id}`}>&#8593;</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div id="total-checkout">
                    <p id="total">Total: ${total.toFixed(2)}</p>
                    <button id="checkout">Checkout</button>
                </div>
            </div>
            <div className={`overlay ${cartClicked}`} onClick={handleClick}></div>
        </div>
    )
}

export default Nav;