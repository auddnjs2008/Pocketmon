import React, { useEffect, useState } from "react";
import GamePresenter from "./GamePresenter";


const GameContainer = ()=>{
    const [windowSize,setWindow]=useState(window.innerWidth);


    const handleWindowSize =()=>{
        setWindow(window.innerWidth);
    }

    useEffect(()=>{
        window.addEventListener("resize",handleWindowSize);        
        return ()=>window.removeEventListener("resize",handleWindowSize);    
    },[]);

    return <GamePresenter windowSize={windowSize}></GamePresenter>
}

export default GameContainer;