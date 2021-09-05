import React from 'react';
import emailjs from "emailjs-com";
import "./Pages.css";
import {Link} from "react-router-dom";

function BasketPage({ cardItem, onAdd, onRemove,  removeItemCard }) {
  



    const listProduct = cardItem.map(x => {
      
        return (
            <div className="ordered-product" key={x.id}>
                <div className="ord-item-img"><img src={x.img} alt="img"></img></div>
                <span>
                    <div className="ord-name">{x.name}</div>
                    <div className="ord-price">{x.price}din</div>
                </span>
                <span>
                    <p>Kolicina:</p>
                    <div className="qty-ord">{x.qty}</div>
                </span>
                <div className="remove-add-ord">
                    <div className="add-ord" onClick={() => { onAdd(x) }}>+</div>
                    <div className="remove-ord" onClick={() => { onRemove(x) }}>-</div>
                </div>
            </div>
        )
    })

    function orderingNotice() {
        document.querySelector('.orderingNotice').classList.add('blockorderingNotice');
    }

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('srdjansupic', 'template_mjb1sd7', e.target, 'user_lwWI3ArtP2cue5Dhz792Q')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            orderingNotice();
    }

    function funk(e){
        console.log(e.target.value);
        let card = JSON.stringify(cardItem);
        console.log(card);
        document.querySelector("#prazan").value = "Drzava: " + e.target.value + "Products: "+ card;
    }
    function removeDiv(){
        document.querySelector('.orderingNotice').classList.remove('blockorderingNotice');
        removeItemCard();
    }


    return (
        <div>
            <div className="orderingNotice"> <span>Hvala na ukazanom povjerenju!</span> <span>Vratite se <Link to="/products" onClick={removeDiv}>NATRAG</Link></span></div>
            <div className="list-ordered-product">
                {listProduct}
            </div>
            <form id="basketForm" action=""  onSubmit={sendEmail}>
            <input type="text" id="prazan" name="countryAndProducts"></input>
                <div className="label"><input type="text" placeholder="Name" name="name"></input></div>
                <div className="label"><input type="text" placeholder="Lastname" name="lastname"></input></div>
                <div className="label"><input type="email" placeholder="Email" name="email"></input></div>
                <div className="label"><input type="text" placeholder="City" name="city"></input></div>
                <div className="label">
                    <select onChange={funk}>
                    <option value="Slect a country">Select a country</option>
                    <option value="Serbia" >Serbia</option>
                    <option value="BiH" >BiH</option>
                    <option value="Macedonia" >Macedoina</option>
                    <option value="Croatia">Croatia</option>
                </select>
                </div>
                <div className="label"><input type="text" placeholder="Street and number" name="streetnumber"></input></div>
                <div className="sub-btn-div"><button id="orderd-sub-btn" type="submit">Naruci</button></div> 
        </form>
        
        </div >
    )
}

export default BasketPage;
