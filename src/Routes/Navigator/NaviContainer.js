import React, { useEffect, useState } from "react";
import NaviPresenter from "./NaviPresenter";
import Pokemon from "pokemon-go-pokedex";


const NaviContainer = () =>{
    const [pokemons,setPokemons]=useState(Pokemon.pokemon);
    const [windowSize,setWindow]=useState(window.innerWidth);
    
    const handleWindowSize =()=>{
        setWindow(window.innerWidth);
    }

    useEffect(()=>{
        window.addEventListener("resize",handleWindowSize);        
        return ()=>window.removeEventListener("resize",handleWindowSize);    
    },[]);

    return <NaviPresenter
        pokemons={pokemons}
        windowSize={windowSize}
    ></NaviPresenter>
}

export default NaviContainer;