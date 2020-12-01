import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Tree from "../../나무.png";
import Battle from "../../Components/Battle";

const MapContainer=styled.div`
    position:relative;
    width:100vw;
    height:100vh;
    display:grid;
    grid-template-columns:repeat(11,1fr);
    grid-template-rows:repeat(10,1fr);
    background-color:#659A25;
                
`;





const TreeWrapper = styled.img`
    width:100%;
    height:100%;
    z-index:1;  
    background-color:transparent;
`;

const RoadWrapper = styled.div`
    width:100%;
    height:100%;
    background-color:#e58e26;

`;
const Trainer = styled.img`
    position:absolute;
    bottom:${props=>props.position.length !== 0 ? `${props.windowSize[1]-props.position[1]-50}px` : "0"};
    left:${props=> props.position.length !==0 ? `${props.position[0]}px` : "50%"};

`;

const Pokemon = styled.img`
    position:absolute;
    top:${props=>props.random ? `${props.random[1]}px` : ""};
    left:${props=>props.random ? `${props.random[0]}px` :""};

`;



const YardMapPresenter=({map,trainer,char,yard,charPosition,windowSize,frontMove,pokemon,randomPosition,battlePokemon,setBattle,battleon,run,pokemonsCp,setPokemons,setCp,setPkPosition})=>{

    return( 
        <>
            <MapContainer ref={yard}>
                {map.map(items=>items.map(item=>item === 1 ? <TreeWrapper src={Tree}></TreeWrapper>:<RoadWrapper></RoadWrapper>))}
                <Trainer     src={frontMove ? trainer[0] : trainer[1]} ref={char} position={charPosition} windowSize={windowSize}></Trainer>
                {pokemon.map((item,index) => item ? <Pokemon  random={randomPosition[index]} src={`https://projectpokemon.org/images/normal-sprite/${item.name.toLowerCase()}.gif`}/> : "")}
            </MapContainer>
            {battlePokemon.length !==0 && battleon===1?<Battle randomPosition={randomPosition} setRun={run} pokemonsCp={pokemonsCp} setBattle={setBattle} battleon={battleon} battleIndex={battlePokemon}  pokemons={pokemon} setPokemons={setPokemons} setCp={setCp} setPkPosition={setPkPosition}></Battle> : ""}
        
        </>
    )
}


export default YardMapPresenter;