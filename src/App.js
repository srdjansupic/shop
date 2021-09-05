import React, { useState } from 'react';
import './App.css';
import Sidebar from './Component/MenuBar/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Overview from './pages/Overview';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import Team from './pages/Team';


import Main from './Component/Product/Main';
import Basket from './Component/Basket/Basket';
///*******DATA PRODUCTS*******/////
import AllProducts from './Component/Data/AllProducts';
/***********PAGE*************/
import BasketPage from './pages/BasketPage';
import LoadingPage from './pages/LoadingPage';

function App() {
  const { products } = AllProducts;

  const mis = products.filter(x => x.typeProduct === "mis");
  const desktop = products.filter(x => x.typeProduct === "desktop");


  const [cardItem, setCardItem] = useState([]);

  const onAdd = (product) => {
    const exist = cardItem.find(x => x.id === product.id);
    if (exist) {
      setCardItem(cardItem.map(x => x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCardItem([...cardItem, { ...product, qty: 1 }]);
    }
  }


  const onRemove = (product) => {
    const exist = cardItem.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCardItem(cardItem.filter((x) => x.id !== product.id));
    } else {
      setCardItem(
        cardItem.map((x) => x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x));
    }
  };

  const removeItemCard = () => {
    setCardItem([])
  }

  /* LAPTOP DATA FILTER */

  const [productLaptop, setProductLaptop] = useState(products.filter(x => x.typeProduct === "laptop"));
  const [productLaptopAll] = useState(products.filter(x => x.typeProduct === "laptop"));
  
  const laptopDatafil = (dataLap) => {
    setProductLaptop(dataLap);
  }
  const resetLaptopDatafil = () => {
    setProductLaptop(products.filter(x => x.typeProduct === "laptop"));
  }

  /* END LAPTOP DATA FILTER */ 

  return (
    <Router>
      <Sidebar />
      <Route path="/products" exact>
        <Main onAdd={onAdd} products={products} ></Main>
      </Route>
      <Route path="/products/laptop" exact>
        <Main onAdd={onAdd} products={productLaptop} productLaptopAll={productLaptopAll} laptopData={productLaptop} laptopDatafil={laptopDatafil} resetLaptopDatafil={resetLaptopDatafil} laptop={"laptop"}></Main>
      </Route>
      <Route path="/products/mis" exact>
        <Main onAdd={onAdd} products={mis}></Main>
      </Route>
      <Route path="/products/desktop-racunari" exact>
        <Main onAdd={onAdd} products={desktop}></Main>
      </Route>
      <Basket onRemove={onRemove} onAdd={onAdd} cardItem={cardItem}></Basket>
      <Route path="/basket" exact>
        <BasketPage removeItemCard={removeItemCard} onRemove={onRemove} onAdd={onAdd} cardItem={cardItem} />
      </Route>
      <Route path="/products/:type/:id" exact>
        <LoadingPage products={products} onRemove={onRemove} onAdd={onAdd} cardItem={cardItem} />
      </Route>
      <Switch>
        <Route path='/overview' exact component={Overview} />
        <Route path='/reports' exact component={Reports} />
        <Route path='/reports/reports1' exact component={ReportsOne} />
        <Route path='/reports/reports2' exact component={ReportsTwo} />
        <Route path='/reports/reports3' exact component={ReportsThree} />
        <Route path='/team' exact component={Team} />
      </Switch>
    </Router>
  );
}

export default App;
