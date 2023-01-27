import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home({changePage}) {

    useEffect(() => {
        changePage('home');
    }, []);

    return (
        <div className="home-container">
            <div className="home-main">
                <div className="btn">
                    <Link to="/shop">
                        <button id="shop-now-btn">Shop Now</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;