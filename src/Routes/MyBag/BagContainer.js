import React, { useEffect, useRef, useState } from "react";
import BagPresenter from "./BagPresenter";


const BagContainer=()=>{
    const [windowSize,setWindow]=useState(window.innerWidth);
    const [bag,setBag]=useState(JSON.parse(localStorage.getItem("myBag")))
    
    
    useEffect(()=>{
        window.addEventListener("resize",()=>setWindow(window.innerWidth));
        return window.removeEventListener("resize",()=>setWindow(window.innerWidth));
    },[]);

    return <BagPresenter windowSize={windowSize} bag={bag} ></BagPresenter>
}

export default BagContainer;