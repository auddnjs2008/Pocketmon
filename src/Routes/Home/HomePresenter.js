import React, { useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import GetPokemon from "../../Components/GetPokemon";
import ColorThief from "colorthief";


const FlexWrapper =styled.div`
    height:95vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;


const Container =styled.div`
  width:500px;
  padding:20px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background-color:${props => `rgba(${props.colorArray[0]},${props.colorArray[1]},${props.colorArray[2]})`};  
  
img{
    width:auto;
    height:auto;
    min-width:120px;
    min-height:120px;
    object-fit:cover;
    margin-bottom:20px;
}
    div{
        font-size:20px;
        font-weight:600;
    }

`;

const Title =styled.h1`
    margin-bottom:50px;
`;


const HomePresenter = ({pokemon,setPokemon,colorArray,setColor})=>
{  
    
    const Images=useRef();
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
    
    return(!localStorage.getItem("myPoketmon")  ?
    <GetPokemon setPokemon={setPokemon}/> : 
    <FlexWrapper>
        <Container colorArray={colorArray}>
            <Title>Your Pokemon</Title>
            <img  crossOrigin ="anonymous" ref={Images} src={pokemon.pokeGif}
                alt={"example"}
                onLoad={()=>{
                    const colorThief = new ColorThief();
                    const img = Images.current;
                    setColor(colorThief.getColor(img));
                }}
        
            />
            <div>{pokemon.name}</div>
        </Container>
    </FlexWrapper> 
    )   
}

export default HomePresenter;