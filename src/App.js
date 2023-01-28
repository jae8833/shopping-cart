import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from "./components/Nav";
import Home from './components/Home';
import Shop from './components/Shop';
import Item from './components/Item';

function App() {

  const numOfProducts = 30;
  const arr = new Array(numOfProducts).fill(0);
  
  const [page, setPage] = useState("home");
  const [cartItems, setCartItems] = useState(arr);
  const [itemCount, setItemCount] = useState(0);
  const [chosenItems, setChosenItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
      let tmp = chosenItems.reduce((prev, next) => {
        return prev + next.price * cartItems[next.id];
      }, 0);
      setTotal(tmp);
  }, [itemCount]);

  function changePage(pg) {
    setPage(pg);
  }

  function addCartItem(cartItem) {
    let id = cartItem.id;
    let copy = cartItems;
    copy[id]++;
    setCartItems(copy);
    if (chosenItems.findIndex(item => { return item.id == id}) == -1) {
      setChosenItems(chosenItems.concat(cartItem))
    }
  }

  function incrementCount() {
    setItemCount(itemCount + 1);
  }

  function incrementItem(e) {
    let id = e.target.getAttribute("data");
    let copy = cartItems;
    copy[id]++;
    setCartItems(copy);
    setItemCount(itemCount + 1);
  }

  function decrementItem(e) {
    let id = e.target.getAttribute("data");
    let copy = cartItems;
    copy[id]--;
    setCartItems(copy);
    setItemCount(itemCount - 1);
    if (copy[id] === 0) {
      let copy2 = chosenItems.filter((item) => {
        return item.id != id;
      });
      console.log(copy2);
      setChosenItems(copy2);
    }
  }

  return (
    <BrowserRouter basename="basename={process.env.PUBLIC_URL}">
      <div className={`container ${page}`} >
          <Nav cartItems={cartItems} itemCount={itemCount} chosenItems={chosenItems} total={total} incrementItem={incrementItem} decrementItem={decrementItem}/>
          <Routes>
            <Route path="/" element={<Home changePage={changePage} />} />
            <Route path="/shop" element={<Shop changePage={changePage} />} />
            <Route path="/shop/:id" element={<Item changePage={changePage} addCartItem={addCartItem} incrementCount={incrementCount} />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
