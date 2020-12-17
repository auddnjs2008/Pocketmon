import React, { useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ColorThief from "colorthief";
import {Link} from "react-router-dom";

const PokemonWrapper = styled(Link)`
position:relative;
padding:10px;

background-color:  ${props => `rgba(${props.colors[0]},${props.colors[1]},${props.colors[2]})`};

border:${props=>props.border ? "10px solid yellow" :""};
display:grid;
grid-template-rows:11fr 0.5fr;

   button{
      height:25px;
      margin-top:5px;
      font-size:15px;
   }
`;
const PokeImg = styled.img`
   width:auto;
   height:auto;
   min-width:50px;
   min-height:50px;
   max-height:105px;
 
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
/* display:flex;
flex-direction:column;
align-items:center;
justify-content:space-between; */

display:grid;
grid-template-rows:4fr 1fr 1fr 1fr 1fr 1fr ;
color:white;
justify-items:center;
align-items:center;
span{
   margin-right:5px;
}

`;


const CpBox =styled.div`
   width:150px;
   height:25px;
   background-color:white;
   position:relative;
 
 
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
    
     background:${props => `linear-gradient(to left,rgba(${props.colors[0]},${props.colors[1]},${props.colors[2]}),black)`};
     width:${props => `${props.cp}%`};
 
`;

const PhysicalInnerBox =styled.div`
    height:100%;

     position:absolute;
     bottom:0; 
     background:${props => `linear-gradient(to left,rgba(${props.colors[0]},${props.colors[1]},${props.colors[2]}),black)`};
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



const MyPokemon =({ sendBtnClick, id,border,changePossible,item,handlePokemonClick})=>{


    const Images= useRef();
    const [colorArray, setColor] = useState([]);
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
   





    return (
    <>
    <PokemonWrapper  border={border} id={id} onClick={handlePokemonClick}  to={changePossible ? "/mine" : `/navi/${item.id}`}colors={colorArray}>
    <PokeProfile >
      {item.specialUrl ===undefined ? 
      <PokeImg  crossOrigin="anonymous" ref={Images} src={item.color === 0 ? googleProxyURL +encodeURIComponent(item.commonUrl) : googleProxyURL +encodeURIComponent(item.shinyUrl)}
         alt={"example"}
         onLoad={()=>{
            const colorThief =new ColorThief();
            const img =Images.current;
            setColor(colorThief.getColor(img));
          
         }}
      /> :   <PokeImg  crossOrigin="anonymous" ref={Images} src={item.color === 0 ? googleProxyURL +encodeURIComponent(item.specialUrl) : googleProxyURL +encodeURIComponent(item.specialShinyUrl)}
      alt={"example"}
      onLoad={()=>{
         const colorThief =new ColorThief();
         const img =Images.current;
         setColor(colorThief.getColor(img));
       
      }}
   />
      }
      <h1>{item.name}</h1>
      <div className="cpTitle"><span>CP</span>{item.cp}</div>   
      <CpBox>
        <InnerBox colors={colorArray} cp={parseInt(String(item.cp)[0] + String(item.cp)[1])}></InnerBox>   
     </CpBox>
      <div className="physicalTitle"><span>Health</span>{Math.floor(item.health)}</div>   
    <PhyscialBox>
      <PhysicalInnerBox colors={colorArray} health={Math.floor(item.health)}></PhysicalInnerBox>   
    </PhyscialBox>     
    </PokeProfile>
    <button onClick={sendBtnClick}>Send Pokemon</button>  
   </PokemonWrapper>
   </> )
}

export default MyPokemon;

MyPokemon.propTypes={
 sendBtnClick:PropTypes.func, 
  border:PropTypes.bool,
  changePossible:PropTypes.number,
  item:PropTypes.object,
  handlePokemonClick:PropTypes.func
}