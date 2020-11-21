import React, { useEffect, useState } from "react";
import MyPokePresenter from "./MyPokePresenter";

const MyPokeContainer =()=>{

    const [windowSize,setWindow]=useState(window.innerWidth);
    const [pokemons,setPokemon]=useState(JSON.parse(localStorage.getItem("myPoketmon")));
    const [colorArray, setColor]=useState([]);
    useEffect(()=>{
        window.addEventListener("resize",()=>setWindow(window.innerWidth));
        return window.removeEventListener("resize",()=>setWindow(window.innerWidth));
    },[]);

    const handlePokemonClick=(e)=>{
        e.target.classList.add("touch");
        setTimeout(()=>e.target.classList.remove("touch"),500);
    }


    return <MyPokePresenter
        windowSize={windowSize}
        pokemons={pokemons}
        colorArray={colorArray}
        setColor={setColor}
        handlePokemonClick={handlePokemonClick}    
    ></MyPokePresenter>
}

export default MyPokeContainer;