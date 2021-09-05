import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoadingPageCSS.css';
import styled from 'styled-components';
import "../Component/Carousel/carousel.css";
import Carousel from "react-elastic-carousel";
import { Link } from "react-router-dom";

function LoadingPage({ products, onAdd, onRemove, cardItem }) {

  /***********CAROUSELL***********/
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];

  var myArray = [...products];
  var myNewArray = [];
  for (var i = 0; i < 8; i++) {
    myNewArray.push(myArray.splice(Math.random() * (myArray.length - 1), 1).pop());
  }

  const currentCImage = (curImg) => {
    setCurrentImg(curImg);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const listArr = myNewArray.map(product => {
    return (
      <div className="itemC"> <Link to={`/products/${product.typeProduct}/${product.id}`} onClick={() => { currentCImage(product.img) }}><img src={product.img} alt="img"></img><br /> <span>{product.name}</span></Link></div>
    )
  })

  /***********END CAROUSELL***********/

  const { id } = useParams();

  const currentIndex = products.filter(product => {
    return product.id == id;
  })
  const el = currentIndex.map(x => x.img);
  const [currentImg, setCurrentImg] = useState(el);

  const changeImg = (src) => {
    setCurrentImg(src);
  }



  const MainDivGall = styled.div`
background: url(${currentImg});
width:100%;
height:350px;
background-repeat:no-repeat;
background-position:center;
background-size: 90%;
`;

  const images = document.querySelectorAll(".img-gall img");


  function addBorder(e) {
    const el = e.target;
    if (el.nodeName == "IMG") {
      const oneGall = document.querySelector("#one-gall-img");
      oneGall.classList.remove("borderImg");

      el.classList.add("borderImg");
      for (var i = 0; i < images.length; i++) {
        images[i].classList.remove("borderImg");
      }
      el.classList.add("borderImg");
    }
  }


  return (
    <div>
      {currentIndex.map(product => (
        <div className="loading-page">
          <div className="div">{product.fullName}</div>
          <div className="main-loading-page">
            <div className="gallery-product">
              <MainDivGall />
              <div className="img-gall" onClick={addBorder}>
                <img src={product.img} id="one-gall-img" alt="gall-img" className="borderImg" onClick={() => { changeImg(product.img) }}></img>
                {product.img2 === "" ? null : <img src={product.img2} alt="gall-img" onClick={() => { changeImg(product.img2) }}></img>}
                {product.img3 === "" ? null : <img src={product.img3} alt="gall-img" onClick={() => { changeImg(product.img3) }}></img>}
                {product.img4 === "" ? null : <img src={product.img4} alt="gall-img" onClick={() => { changeImg(product.img4) }}></img>}
              </div>
            </div>
            <div className="description-product">
              <span>{product.description1}</span>
              <span>{product.description2}</span>
              <span>{product.description3}</span>
              <span>{product.description4}</span>
              <span>{product.description5}</span>
              <span>{product.description6}</span>

              <div className="price-menu-loading">

                <div className="price-div">
                  <div className="price-item">
                    <span>RSD</span>
                    <span>{product.price}</span>
                  </div>
                  <div className="savings-item">
                    <span>Usteda:</span>
                    <span className="savings">{product.savings} RSD</span>
                  </div>
                </div>
                <div className="qty-loading">
                  <span>Kolicina: <h2>{cardItem.map(x => x.id === product.id ? x.qty : null)}</h2></span>
                  <div className="add-remove">
                    <div className="add" onClick={() => { onAdd(product) }}>+</div>
                    <div className="remove" onClick={() => { onRemove(product) }}>-</div>
                  </div>
                </div>
                <div className="addProduct-loadingP" onClick={() => { onAdd(product) }}>
                  Add product
                </div>
              </div>
            </div>

          </div>
          <div className="carousel">
          <h1 style={{ textAlign: "center" }}>Predlozeni proizvodi</h1>
          <div className="carouselItem">
            <Carousel breakPoints={breakPoints}>
              {listArr}
            </Carousel>
          </div>
          </div>

        </div>
      ))}

    </div>
  )
}

export default LoadingPage;
