import React from "react";
import DetailPresenter from "./DetailPresenter";
import Pokemon from "pokemon-go-pokedex";
import movePoke from "pokedex";
const pokedex = new movePoke(); 

const DetailContainer = ()=>{
    const number =parseInt(window.location.href.split("navi/")[1]);
    const thisPokemon = Pokemon.pokemon.filter(item=>item.id === number);
    const thisGif = pokedex.pokemon(thisPokemon[0].name.toLowerCase()).sprites.animated;
    const PokeObject={...thisPokemon[0],pokeGif:thisGif};
    return <DetailPresenter pokemon={PokeObject}></DetailPresenter>
}

export  default DetailContainer;