import React, { useEffect, useRef, useState } from "react";
import PropTypes, { string } from "prop-types";
import styled from "styled-components";
import Menu from "../../Components/Menu";
import LongMenu from "../../Components/LongMenu";
import MyPokemon from "../../Components/MyPokemon";

const Container = styled.div`
   
    
    display:grid;
    /* grid-auto-flow:column;
    grid-auto-columns:1fr; */
    grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
    grid-auto-rows:300px;
    gap:5px;
    height:90%;
    width:100%;  
    margin-top:${props=>props.windowSize >810 ? "350px" :"50px"};
    justify-items:center;
    padding:20px;
`;

const Header = styled.div`
   //position:fixed;
   position:absolute;
   color:white;
   top:0;
   background-color:rgba(20,20,20,0.8);
   //background-color:black;
   z-index:1;
   padding:5px;
   margin-top:${props=>props.windowSize >810 ? "90px" :"20px"};
   height:250px;
   width:100%;
   display:grid;
   grid-template-rows:1fr 3fr 1fr;
   gap:10px;
   h1{
      justify-self:center;
      font-weight:600;
   }
   button{
      width:100px;
      justify-self:center;
   }

`;

const BattlePokemon = styled.ul`
   display:flex;
   width:100%;
   height:1fr;
   justify-content:space-around;
   align-items:center;
   li{
      width:100%;
      height:100%;
      margin-right:30px;
      display:flex;
      flex-direction:column;
      justify-content:space-around;
      align-items:center;      
      font-size:20px;
      font-weight:600;
      padding:5px;
      img{
         width:auto;
         height:auto;
         max-width:170px;
         max-height:170px;
      }
  
      
   }

`;



const MyPokePresenter = ({windowSize,pokemons,handlePokemonClick,battlePokemons,changeBtn,changePossible}) =>{
  
   return( 
    <>
     {windowSize > 810 ? <LongMenu></LongMenu> : <Menu></Menu>}
    <Header windowSize={windowSize}>
       <h1>Battle Pokemons</h1>
       <BattlePokemon>
         {battlePokemons[0] && battlePokemons[0].specialUrl ===undefined ?  
            <li><img src={battlePokemons[0] ? (battlePokemons[0].color === 0 ? battlePokemons[0].commonUrl : battlePokemons[0].shinyUrl) :""}/><div>Cp {battlePokemons[0] ? battlePokemons[0].cp : ""}</div> </li>
            : <li><img src={battlePokemons[0] ? (battlePokemons[0].color === 0 ? battlePokemons[0].specialUrl : battlePokemons[0].specialShinyUrl) :""}/><div>Cp {battlePokemons[0] ? battlePokemons[0].cp : ""}</div> </li>
          }
          {battlePokemons[1] && battlePokemons[1].specialUrl ===undefined ?
            <li> <img src={battlePokemons[1] ? (battlePokemons[1].color === 0 ? battlePokemons[1].commonUrl :battlePokemons[1].shinyUrl ):""}/><div>Cp {battlePokemons[1] ? battlePokemons[1].cp :""}</div></li>
            : <li> <img src={battlePokemons[1] ? (battlePokemons[1].color === 0 ? battlePokemons[1].specialUrl :battlePokemons[1].specialShinyUrl ):""}/><div>Cp {battlePokemons[1] ? battlePokemons[1].cp :""}</div></li>   
          }
          {battlePokemons[2] && battlePokemons[2].specialUrl ===undefined ?
            <li><img src={battlePokemons[2] ? (battlePokemons[2].color === 0 ? battlePokemons[2].commonUrl : battlePokemons[2].shinyUrl): ""}/><div>Cp {battlePokemons[2] ? battlePokemons[2].cp : ""}</div></li>
            :<li><img src={battlePokemons[2] ? (battlePokemons[2].color === 0 ? battlePokemons[2].specialUrl : battlePokemons[2].specialShinyUrl): ""}/><div>Cp {battlePokemons[2] ? battlePokemons[2].cp : ""}</div></li>
          } 
      </BattlePokemon>
       <button onClick={changeBtn}>Change Off</button>
    </Header>
    <Container windowSize={windowSize}>
      {pokemons.map((item,index) => item ? <MyPokemon id={item.myId} border={battlePokemons.length !==0 ? battlePokemons.map(item=>item.myId).includes(index+1) : false}  changePossible={changePossible} item={item} handlePokemonClick={handlePokemonClick}></MyPokemon>
      : "")}
    </Container>
    </>
   )
}

export default MyPokePresenter;