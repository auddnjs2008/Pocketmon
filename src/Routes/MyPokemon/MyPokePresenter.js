import React, { useEffect, useRef, useState } from "react";
import PropTypes, { string } from "prop-types";
import styled from "styled-components";
import Menu from "../../Components/Menu";
import LongMenu from "../../Components/LongMenu";
import ColorThief from "colorthief";

const Container = styled.div`
    position:absolute;
    top:0;
    display:grid;
    grid-auto-flow:column;
    grid-auto-columns:1fr;
    height:90%;
    width:100%;  
    margin-top:${props=>props.windowSize >810 ? "70px" :"0px"};
    justify-items:center;
`;
const PokemonWrapper = styled.section`
 background-color:rgba(0,0,0,0.8);
padding:10px;
border: 10px solid ${props => `rgba(${props.colors[0]},${props.colors[1]},${props.colors[2]})`};  
display:grid;
grid-template-columns:1fr 0.5fr 3fr;
justify-items:center;
align-items:center;

 

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
color:white;

`;

const PokeInfo = styled.ul`
   display:grid;
   grid-auto-rows:1fr;
   gap:5px;
   color:white;
   li.outLi{
      display:grid;
      grid-template-columns:2fr 3fr;
      text-align:center;
      span:first-child{
        font-size:20px;
        color:#e74c3c;
         padding:5px;
      }
      ul{
            display:grid;
            grid-auto-flow:column;
            grid-auto-columns:1fr;
      }
     
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
   height:120px;
   background-color:white;
   position:relative;
    border:1px solid black;
    border-top-left-radius:10px;
    border-top-right-radius:10px;

     overflow:hidden;

     .cpTitle{
        position:absolute;
        bottom:0;
        font-size:15px;
        margin-bottom:5px;
        span{
           margin-right:5px;
        }
     }
 
`
const InnerBox = styled.div`
    // height:${props=>props.cp ? `${props.cp}%` : ""};
     width:100%;
     background-color:black;
     position:absolute;
     bottom:0; 
     //background-color: ${props => `rgba(${props.colors[0]},${props.colors[1]},${props.colors[2]})`};  
     background:${props => `linear-gradient(to top,rgba(${props.colors[0]},${props.colors[1]},${props.colors[2]}),black)`};

   @keyframes fill{
      0%{
         height:0;
      }
      100%{
     height:${props=>props.cp ? `${props.cp}%` : ""};
      }
   }
   animation: fill 1s linear forwards;

`;

const InnerCircle = styled.div`
   height:${props=>props.cp ? `${105-props.cp}%` : ""};
   width:100%;
   /* width:100px;
   height:100px; */
   //border: 1px solid black;
   border-radius:50%;
   position:absolute;
   background-color:white;
   top:0;
   z-index:1;
   @keyframes spin {
      from{
         transform:rotate(360deg);
     
      }
   }

   @keyframes fillWater{
      0%{
         height:100%;
      }
      100%{
         height:${props=>props.cp ? `${105-props.cp}%` : ""};
      }
   }

   animation: fillWater 3s , spin 4s linear infinite;
   &:nth-child(1){
      
      left:-20px; 
      animation: fillWater 3s,spin 3s linear infinite;

   }
   &:nth-child(2){
      right:-20px;
   animation:fillWater 3s, spin 5s linear infinite;

   }

`;




const MyPokePresenter = ({windowSize,pokemons,colorArray,setColor,handlePokemonClick}) =>{
   const Images= useRef();
   const Wave=useRef();
   let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
   

   return( 
    <>
     {windowSize > 810 ? <LongMenu></LongMenu> : <Menu></Menu>}
    <Container windowSize={windowSize}>
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
       <CpBox>
         <InnerCircle cp={parseInt(String(item.cp)[0] + String(item.cp)[1])}></InnerCircle>      

         <InnerCircle cp={parseInt(String(item.cp)[0] + String(item.cp)[1])}></InnerCircle>      
         <InnerCircle cp={parseInt(String(item.cp)[0] + String(item.cp)[1])}></InnerCircle>      
         <InnerBox colors={colorArray}cp={parseInt(String(item.cp)[0] + String(item.cp)[1])}></InnerBox>   
         <div className="cpTitle"><span>CP</span>{item.cp}</div>   
      </CpBox>
      <PokeInfo>
         <li className="outLi"><span>Type</span><ul>{item.type.map(item=>item ?<li>{item}</li>:"")}</ul></li>
         <li className="outLi"><span>weight</span>{item.weight}</li>
         <li className="outLi"><span>height</span>{item.height}</li>
         <li className="outLi"><span>multipliers</span>{item.multipliers}</li>
         <li className="outLi"><span>weaknesses</span><ul>{item.weaknesses.map(item=>item ?<li>{item}</li> :"")}</ul></li>   
         {item.candy_count !== null ? <li className="outLi"><span>Candy-Number to evolve</span>{item.candy_count}</li> : <li>Can't Evolve</li>}      

      </PokeInfo>
       
      </PokemonWrapper> 
      : "")}
    </Container>
    </>
   )
}

export default MyPokePresenter;