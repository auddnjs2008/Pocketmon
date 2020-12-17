import React, { useState,useEffect } from "react";
import DetailPresenter from "./DetailPresenter";
import Pokemon from "pokemon-go-pokedex";
import movePoke from "pokedex";
const pokedex = new movePoke(); 

const DetailContainer = ()=>{
    const number =parseInt(window.location.href.split("navi/")[1]);
    const thisPokemon = Pokemon.pokemon.filter(item=>item.id === number);
    const [windowSize,setWindow]=useState(window.innerWidth);

    if(thisPokemon[0].name.includes("Female"))
        thisPokemon[0].name="nidoran_f";
    else if (thisPokemon[0].name.includes("Male"))
        thisPokemon[0].name="nidoran_m";
    else if(thisPokemon[0].name.includes("fetch'd"))
        thisPokemon[0].name="farfetchd";
    else if(thisPokemon[0].name.includes("Mime"))
        thisPokemon[0].name="mr._mime";
    
    const prevLength = thisPokemon[0].prev_evolution ? thisPokemon[0].prev_evolution.length : 0;
    const nextLength = thisPokemon[0].next_evolution ? thisPokemon[0].next_evolution.length : 0;

    let commonEvolveLength = prevLength +nextLength +1;
    if(thisPokemon[0].name === "Dragonair" || thisPokemon[0].name==="Dragonite")
        commonEvolveLength =3;

    const thisGif = pokedex.pokemon(thisPokemon[0].name.toLowerCase()).sprites
                    ? pokedex.pokemon(thisPokemon[0].name.toLowerCase()).sprites.animated :"";
    
    const PokeObject={...thisPokemon[0],pokeGif:thisGif};
    
    useEffect(()=>{
        window.addEventListener("resize",()=>setWindow(window.innerWidth));
        return ()=> window.removeEventListener("reszie",()=>setWindow(window.innerWidth));
    },[])
    

    return <DetailPresenter pokemon={PokeObject} commonLength ={commonEvolveLength} windowSize={windowSize}></DetailPresenter>
}

export  default DetailContainer;