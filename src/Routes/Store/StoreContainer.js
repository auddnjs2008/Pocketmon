import React, { useEffect, useState } from "react";
import StorePresenter from "./StorePresenter";

const StoreContainer = ()=>{
    const [windowSize,setWindow]=useState(window.innerWidth);
    const [scroll,setScroll]=useState(window.scrollY);
    const [name,setName]=useState("");
    const [info,setInfo]=useState("");
    const [img,setImg]=useState("");
    const [money,setMoney]=useState(0);

    const handleItemClick =(name,info,img,money) =>{
        setName(name);
        setInfo(info);
        setImg(img);
        setMoney(money);
        setScroll(window.scrollY);
        const priceWindow = document.querySelector(".InfoWrapper");
        priceWindow.style.display="grid";
    }
    
    
    const handleClose =()=>{
        const priceWindow = document.querySelector(".InfoWrapper");
        priceWindow.style.display="none";
    }

    const handleWindow =() => setWindow(window.innerWidth);

    const handleScroll=()=>setScroll(window.scrollY);

    useEffect(()=>{
        window.addEventListener("resize",handleWindow);
        window.addEventListener("scroll",handleScroll);
        return () => {
            window.removeEventListener("resize",handleWindow);
            window.removeEventListener("scroll",handleScroll);
        }    
    },[]);

    return <StorePresenter
        windowSize={windowSize}
        handleItemClick={handleItemClick}
        handleClose={handleClose}
        name={name}
        info={info}
        img={img}
        money={money}
        scroll={scroll}
    ></StorePresenter>
}

export default StoreContainer;