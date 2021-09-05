import React, { useState } from 'react';
import Products from './Products';
import "./filter.css";
import * as RiIcons from 'react-icons/ri';

function Main({ products, onAdd, laptopDatafil, resetLaptopDatafil, laptop, productLaptopAll }) {

    const listOfProducts = products.map(prod => {
        return (
            <Products prod={prod} key={prod.id} onAdd={onAdd} resetLaptopDatafil={resetLaptopDatafil} />
        )
    })

    const [leptopdata, setLaptop] = useState([]);
    const [beforeLeptopdata, setBeforeLaptop] = useState([]);

    function filHP() {
        const HP = document.querySelector("#HP");
        if (HP.checked) {
            var filHP = productLaptopAll.filter(x => x.brand === "HP");
            setLaptop(leptopdata.concat(filHP));
            setBeforeLaptop(leptopdata.concat(filHP));
        } else {
            let fil = leptopdata.filter(x => x.brand === "HP");
            let index = leptopdata.indexOf(fil[0]);
            leptopdata.splice(index, fil.length);
            setLaptop(leptopdata);
            setBeforeLaptop(leptopdata);
        }
    }

    function filACER() {
        const ACER = document.querySelector("#ACER");
        if (ACER.checked) {
            let filAcer = productLaptopAll.filter(x => x.brand === "ACER");
            setLaptop(leptopdata.concat(filAcer));
            setBeforeLaptop(leptopdata.concat(filAcer));
        } else {
            let fil = leptopdata.filter(x => x.brand === "ACER");
            let index = leptopdata.indexOf(fil[0]);
            leptopdata.splice(index, fil.length);
            setLaptop(leptopdata);
            setBeforeLaptop(leptopdata);
        }
    }


    function filDELL() {
        const DELL = document.querySelector("#DELL");
        if (DELL.checked) {
            let filDell = productLaptopAll.filter(x => x.brand === "DELL");
            setLaptop(leptopdata.concat(filDell));
            setBeforeLaptop(leptopdata.concat(filDell));
        } else {
            let fil = leptopdata.filter(x => x.brand === "DELL");
            let index = leptopdata.indexOf(fil[0]);
            leptopdata.splice(index, fil.length);
            setLaptop(leptopdata);
            setBeforeLaptop(leptopdata);
        }
    }

    const [priceMinn, changePriceMin] = useState("");
    const priceMin = (e) => {
        changePriceMin(e.target.value);
    }

    const [priceMaxx, changePriceMax] = useState("");
    const priceMax = (e) => {
        changePriceMax(e.target.value);
    }

    const filwhite = () => {
        let WHITE = document.querySelector("#WHITE");
        if (WHITE.checked) {
            if (leptopdata.length === 0) {
                let fill = productLaptopAll.filter(x => x.color === "WHITE");
                setLaptop(fill);
            } else {
                let fill = leptopdata.filter(x => x.color === "WHITE");
                setLaptop(fill);
            }
        } else {
            setLaptop(beforeLeptopdata);
        }
        
    }

    console.log(leptopdata);
    
    const filblack = () => {
        let BLACK = document.querySelector("#BLACK");
        if (BLACK.checked) {
            if (leptopdata.length === 0) {
                let fill = productLaptopAll.filter(x => x.color === "BLACK");
                setLaptop(fill);
            } else {
                let fill = leptopdata.filter(x => x.color === "BLACK");
                setLaptop(fill);
            }
        } else {
            setLaptop(beforeLeptopdata);
        }
    }


    function saveFilter() {
        
        laptopDatafil(leptopdata);

        if (priceMinn !== "" || priceMaxx !== "") {
            const allFil = leptopdata.filter(x => x.price > priceMinn && x.price < priceMaxx);
            laptopDatafil(allFil);
        }
        if (leptopdata.length === 0) {
            const all = productLaptopAll.filter(x => x.price > priceMinn && x.price < priceMaxx);
            laptopDatafil(all);
        }

        setFilterPart(false);
        setFilterIcon(true);
    }


    function resetFilter() {
        let od = document.querySelector("#od");
        od.value = "20000";
        let doo = document.querySelector("#doo");
        doo.value = "300000";
        changePriceMin("20000");
        changePriceMax("300000");

        setLaptop([]);
        resetLaptopDatafil();
        let inputsBrand = document.querySelectorAll('input[type=checkbox]');
        for (let i = 0; i < inputsBrand.length; i++) {
            if (inputsBrand[i].checked) {
                inputsBrand[i].checked = false;
            }
        }
        setFilterIcon(false);
    }

    const [filterIcon, setFilterIcon] = useState(true);
    const closeFilterLap = () => {
        setFilterPart(false);
        setFilterIcon(true);
    }
    const openFilterIcon = () => {
        setFilterIcon(false);
    }

    /*
     if (leptopdata.length === 0) {
         console.log("nema");
     }*/

    const [filterPart, setFilterPart] = useState(false);
    const [filterInput, setFilterInput] = useState("");



    return (
        <main>
            <div className={laptop === "laptop" ? "filLap" : "noneFilLap"}>
                <div className="filterLap"><img className={filterIcon === true ? "filterIcon" : "noneFilterIcon"} onClick={() => { setFilterPart(!filterPart); openFilterIcon() }} src="https://image.flaticon.com/icons/png/128/3126/3126539.png" /> <div className={filterIcon === true ? "noneCloseFilterLap" : "blockCloseFilterLap"} onClick={closeFilterLap}>X</div></div>
                <div className={filterPart === false ? "closeFilterPart" : "filter-part"}>
                    <div className="fil-brend">
                        <span className="filter-span" onClick={(e) => { setFilterInput("filter1") }}>Izaberi brend: <div><RiIcons.RiArrowDownSFill /></div></span>
                        <div id="filter1" className={filterInput === "filter1" ? "filter-input" : "filter-none"}>
                            HP <input id="HP" className="inputBrand" type="checkbox" value="HP" onClick={filHP} />
                            ACER <input id="ACER" className="inputBrand" type="checkbox" value="ACER" onClick={filACER} />
                            DELL <input id="DELL" className="inputBrand" type="checkbox" value="DELL" onClick={filDELL} />
                        </div>
                    </div>
                    <div className="fil-price">
                        <span className="filter-span" onClick={(e) => { setFilterInput("filter2") }}>Filtriraj cenu:  <div><RiIcons.RiArrowDownSFill /></div></span>
                        <div id="filter2" className={filterInput === "filter2" ? "filter-input" : "filter-none"} >
                            OD:<input id="od" className="inputRangeLap" type="range" onChange={(e) => { priceMin(e) }} min="20000" max="300000" /> <span id="rangePriceMin">{priceMinn}</span><br />
                            DO:<input id="doo" className="inputRangeLap" type="range" onChange={(e) => { priceMax(e) }} min="20000" max="300000" /> <span id="rangePriceMax">{priceMaxx}</span>
                        </div>
                    </div>
                    <div className="fil-color">
                        <span className="filter-span" onClick={(e) => { setFilterInput("filter3") }}>Izaberi boju: <div><RiIcons.RiArrowDownSFill /></div></span>
                        <div id="filter3" className={filterInput === "filter3" ? "filter-input" : "filter-none"}>
                            WHITE <input id="WHITE" className="inputColorLap" type="checkbox" value="WHITE" style={{ marginRight: "15px" }} onClick={filwhite} />
                            BLACK <input id="BLACK" className="inputColorLap" type="checkbox" value="BLACK" onClick={filblack} />
                        </div>
                    </div>
                    <div className="filter-button">
                        <button className="save-filter" onClick={saveFilter}>Save filter</button>
                        <button className="reset-filter" onClick={resetFilter}>Reset filter</button>
                    </div>
                </div>
            </div>

            <h2 className={laptop === "laptop" ? "marginlaptop" : null}>Products</h2>
            <div className="roww">
                {listOfProducts}
            </div>
        </main>
    )
}

export default Main;
