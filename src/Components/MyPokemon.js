import React, { useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "styled-components";
import ColorThief from "colorthief";
import {Link} from "react-router-dom";

const PokemonWrapper = styled(Link)`

padding:10px;

background-color:  ${props => `rgba(${props.colors[0]},${props.colors[1]},${props.colors[2]})`};

border:${props=>props.border ? "10px solid yellow" :""};

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
height:100%;
position:relative;
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-between;
color:white;

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
   width:150px;
   height:25px;
   background-color:white;
   position:relative;
    border:1px solid black;
 
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
const PhyscialBox=styled.div`
   width:150px;
   height:25px;
   background-color:white;
   position:relative;
    border:1px solid black;
 

     .physicalTitle{
        position:absolute;
        bottom:0;
        font-size:15px;
        margin-bottom:5px;
        span{
           margin-right:5px;
        }
     }

`;


const InnerBox = styled.div`
    
     height:100%;
     background-color:black;
    
     background:${props => `linear-gradient(to right,rgba(${props.colors[0]},${props.colors[1]},${props.colors[2]}),black)`};
     width:${props => `${props.cp}%`};
 
`;

const PhysicalInnerBox =styled.div`
    height:100%;

     position:absolute;
     bottom:0; 
     background:${props => `linear-gradient(to right,rgba(${props.colors[0]},${props.colors[1]},${props.colors[2]}),black)`};
     width:${props => `${props.health}%`};
  
   /* @keyframes health{
      0%{
         width:0;
      }
      100%{
        width:${props=>props.health ? `${props.health}%` : ""};
      }
   }
   animation: health 1s linear forwards; */

`;



const MyPokemon =({id,border,changePossible,item,handlePokemonClick})=>{


    const Images= useRef();
    const [colorArray, setColor] = useState([]);
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
   

    return <PokemonWrapper border={border} id={id} onClick={handlePokemonClick}  to={changePossible ? "/mine" : `/navi/${item.id}`}colors={colorArray}>
    <PokeProfile >
      <PokeImg  crossOrigin="anonymous" ref={Images} src={googleProxyURL +encodeURIComponent(item.commonUrl)}
         alt={"example"}
         onLoad={()=>{
            const colorThief =new ColorThief();
            const img =Images.current;
            setColor(colorThief.getColor(img));
          
         }}
      />  
      <Circle colors={colorArray}></Circle>   
      <h1>{item.name}</h1>
      <CpBox>
        <InnerBox colors={colorArray} cp={parseInt(String(item.cp)[0] + String(item.cp)[1])}></InnerBox>   
        <div className="cpTitle"><span>CP</span>{item.cp}</div>   
     </CpBox>
    <PhyscialBox>
      <PhysicalInnerBox colors={colorArray} health={Math.floor(item.health)}></PhysicalInnerBox>   
      <div className="physicalTitle"><span>Health</span>{Math.floor(item.health)}</div>   
    </PhyscialBox>     
    </PokeProfile>
    
   </PokemonWrapper> 
}

export default MyPokemon;