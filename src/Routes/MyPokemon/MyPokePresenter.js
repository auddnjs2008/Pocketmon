import React, { useEffect, useRef, useState } from "react";
import PropTypes, { string } from "prop-types";
import styled from "styled-components";
import Menu from "../../Components/Menu";
import LongMenu from "../../Components/LongMenu";
import ColorThief from "colorthief";

const Container = styled.div``;
const PokemonWrapper = styled.section`
border: 20px solid ${props => `rgba(${props.colors[0]},${props.colors[1]},${props.colors[2]})`};  
display:grid;
grid-template-columns:1fr 3fr;

`;
const PokeImg = styled.img`
   width:auto;
   height:auto;
   min-width:50px;
   min-height:50px;

   @keyframes  touch {
      0%{

      }25%{
         transform:scale(1,0.6);
      }   
      100%{
         transform:scale(1,1);
      }
   }
   &.touch{
   animation: touch 1s linear;
   }   
`;

const PokeProfile = styled.div`
position:relative;
display:flex;
flex-direction:column;
align-items:center;

`;

const PokeInfo = styled.ul`
   display:grid;
   grid-auto-rows:1fr;
   
   li{
      display:grid;
      grid-template-columns:2fr 3fr;
      text-align:center;
     
   }

`;

const Circle = styled.div`
   width:150px;
   height:50px;
   border:1px solid black;
   border-radius:30%;
  
   background:${props => `linear-gradient(to top,rgba(${props.colors[0]},${props.colors[1]},${props.colors[2]}),white)`};
   transform:perspective(350px) rotateX(40deg);

`;

const CpBox =styled.div`
   width:50px;
   height:100px;
   position:relative;
   border:1px solid black;
 
`
const InnerBox = styled.div`
     height:${props=>props.cp ? `${props.cp}%` : ""};
     width:100%;
     
     background-color:black;
     position:absolute;
     bottom:0;
`;




const MyPokePresenter = ({windowSize,pokemons,colorArray,setColor,handlePokemonClick}) =>{
   const Images= useRef();
   const Wave=useRef();
   let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
   

   return( 
    <>
     {windowSize > 810 ? <LongMenu></LongMenu> : <Menu></Menu>}
    <Container>
      {pokemons.map(item => item ? <PokemonWrapper colors={colorArray}>
       <PokeProfile>
         <PokeImg onClick={handlePokemonClick} crossOrigin="anonymous" ref={Images} src={googleProxyURL +encodeURIComponent(item.commonUrl)}
            alt={"example"}
            onLoad={()=>{
               const colorThief =new ColorThief();
               const img =Images.current;
               setColor(colorThief.getColor(img));
            }}
         />  
         <Circle colors={colorArray}></Circle>   
         <h1>{item.name}</h1>
       </PokeProfile>
      <PokeInfo>
         <li><span>CP</span>{item.cp}</li>
         <li><span>Type</span><span>{item.type.map(item=>item ? <span>{item}</span>:"")}</span></li>
         <li><span>weight</span>{item.weight}</li>
         <li><span>height</span>{item.height}</li>
         <li><span>multipliers</span>{item.multipliers}</li>
         <li><span>weaknesses</span><span>{item.weaknesses.map(item=>item ?<span>{item}</span> :"")}</span></li>   
         {item.candy_count !== null ? <li><span>Candy-Number to evolve</span>{item.candy_count}</li> : <li>Can't Evolve</li>}      

      </PokeInfo>
      <CpBox>
    
         <InnerBox ref={Wave}cp={parseInt(String(item.cp)[0] + String(item.cp)[1])}></InnerBox>   
         <InnerBox ref={Wave}cp={parseInt(String(item.cp)[0] + String(item.cp)[1])}></InnerBox>      
      </CpBox>  
      </PokemonWrapper> 
      : "")}
    </Container>
    </>
   )
}

export default MyPokePresenter;