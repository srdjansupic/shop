import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Basket({ cardItem, onAdd, onRemove }) {


    const priceItem = cardItem.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = priceItem > 100000 ? 0 : 350;
    const totalPrice = priceItem + shippingPrice;

    const quantity = cardItem.reduce((a, c) => a + c.qty, 0);


    const [toggleBasket, setToggleBasket] = useState(true);

    const addBasket = () => {
        setToggleBasket(!toggleBasket);
    }
    const closeBasket = ()=>{
        setToggleBasket(!toggleBasket);
    }

    return (
        <div>

            <button id="btn-basket" onClick={addBasket}>
                <span>{quantity === 0 ? null : quantity}</span>
                <img src="https://www.freeiconspng.com/uploads/shopping-cart-icon-2.png" alt="img"></img>
            </button>
            <aside id="basket" className={toggleBasket === false ? "open-basket" : "close-basket"}>
                <h1 id="card-item-h1">Card Item</h1>
                {cardItem.length === 0 && (<p>Card is empty</p>)}
                {cardItem.map(item => (
                    <div key={item.id} className="item">
                        <h1 className="item-h1">{item.name}</h1>
                        <div className="footer-item">
                            <div className="button-add-remove">
                                <button className="add" onClick={() => { onAdd(item) }}>+</button>
                                <button className="remove" onClick={() => { onRemove(item) }}>-</button>
                            </div>
                            <div className="price-br">
                                {item.qty} x {item.price} din
                            </div>
                        </div>
                    </div>
                ))}

                <div className="price">
                    <Link id="link-basket" to="/basket" onClick={closeBasket}>Go to Basket</Link>
                    <div className="item-price">Item price: {priceItem}din</div>
                    <div className="shipping-item">Shipping price: {shippingPrice}din</div>
                    <div className="total-price">Total price: {totalPrice}din</div>
                </div>
            </aside>
        </div>
    )
}

export default Basket
