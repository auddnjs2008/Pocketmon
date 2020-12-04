import React, { useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Battle from "../../Components/Battle";
import Rock from "../../../src/바위.png";
import RockWay from "../../../src/바위길.png";
import Background from "../../../src/동굴배경.jpg";
import {Link} from "react-router-dom";


const TestContainer=styled.div`
background-image:url(${Background});
background-size:cover;
background-position:bottom center;
width:100%;
height:500px;
`;

const MapContainer=styled.div`
    position:relative;
    width:100vw;
    height:100vh;
    display:grid;
    grid-template-columns:repeat(11,1fr);
    grid-template-rows:repeat(10,1fr);
    background-color:#74654F;
    
    
    &.perspective{
    transform:perspective(700px) rotateX(55deg);
    transform-style:preserve-3d; 
    }            
`;

const Navigation =styled.div`
    position:absolute;
    opacity:0.7;
    bottom:20px;
    right:50px;
    z-index:2;
    width:100px;
    height:100px;
    background-image:url("https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/compass.png");
    background-size:cover;
    background-position:center center;
    display:flex;
    a{  
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        width:50px;
        height:50px;
        border:1px solid black;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:#ff7675;
        color:white;
        opacity:0;
    }
    &:hover{
        a{  
     
            &:nth-child(1){
              
                @keyframes move1{
                    0%{

                    }
                    100%{
                        left:0;
                        opacity:1;
                    }
                }
            animation: move1 0.5s linear forwards;

            }
            &:nth-child(2){
                
                @keyframes move2{
                    0%{

                    }
                    100%{
                        top:0;
                        opacity:1;
                    }
                }
            animation: move2 0.5s linear forwards;
            }
        }
     
    }
    transition: all 5s linear;
`;




const RockWrapper = styled.img`
    width:100%;
    height:100%;
    z-index:1;  
    background-color:transparent;
`;

const RoadWrapper = styled.img`
    width:100%;
    height:100%;
    background-color:#74654F;
  

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

const ThreeD = styled.button`
    position:absolute;
    top:30px;
    right:30px;
    z-index:2;
    width:100px;
    height:30px;
    font-size:15px;

`;


const RockMapPresenter =({map,trainer,char,yard,charPosition,windowSize,frontMove,pokemon,randomPosition,battlePokemon,setBattle,battleon,run,pokemonsCp,setPokemons,setCp,setPkPosition,handleMapChange})=>{
    

    return( 
        <>  <TestContainer>
            <MapContainer ref={yard}>
                {map.map(items=>items.map(item=>item === 1 ? <RockWrapper src={Rock}></RockWrapper>:<RoadWrapper src={RockWay}></RoadWrapper>))}
                <Trainer     src={frontMove ? trainer[0] : trainer[1]} ref={char} position={charPosition} windowSize={windowSize}></Trainer>
                {pokemon.map((item,index) => item ? <Pokemon  random={randomPosition[index]} src={`https://projectpokemon.org/images/normal-sprite/${item.name.toLowerCase()}.gif`}/> : "")}
            </MapContainer>
            </TestContainer>
            {battlePokemon.length !==0 && battleon===1?<Battle color={"#74654F"}randomPosition={randomPosition} setRun={run} pokemonsCp={pokemonsCp} setBattle={setBattle} battleon={battleon} battleIndex={battlePokemon}  pokemons={pokemon} setPokemons={setPokemons} setCp={setCp} setPkPosition={setPkPosition}></Battle> : ""}
            <Navigation>
                <Link to="/navi">Home</Link>
                <Link to="/game">Map</Link>
            </Navigation>
            <ThreeD onClick={handleMapChange}>
               3D 입체보기 
            </ThreeD>
        </>
    )
}

export default RockMapPresenter;