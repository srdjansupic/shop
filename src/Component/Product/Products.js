import React from 'react';
import { Link } from "react-router-dom";


function Products({ prod, onAdd, resetLaptopDatafil }) {


    const toTop = () => {
        window.scrollTo({
            top: 0
        });
    }

    return (
        <div className="products">
            <Link to={`/products/${prod.typeProduct}/${prod.id}`} onClick={toTop} >
                <div className="product-img"><img src={prod.img} alt="img"></img></div>
            </Link><br />
            <span>
                <h1>{prod.name}</h1>
                <span className="oldPrice">MP cena: {prod.priceOld} din</span>
                <div className="price-div">
                    <div className="price-item">
                        <span>RSD</span>
                        <span>{prod.price}</span>
                    </div>
                    <div className="savings-item">
                        <span>Usteda:</span>
                        <span className="savings">{prod.savings} RSD</span>
                    </div>
                </div>
            </span>
            <br />
            <button onClick={() => { onAdd(prod) }}>Add product</button>
        </div>
    )
}

export default Products
