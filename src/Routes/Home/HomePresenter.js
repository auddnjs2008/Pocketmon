import React, { useRef, useState } from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import GetPokemon from "../../Components/GetPokemon";
import ColorThief from "colorthief";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

const FlexWrapper =styled.div`
    height:95vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;


const Container =styled.div`
  width:100%;
  height:250px;
  padding:20px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background-color:${props => `rgba(${props.colorArray[0]},${props.colorArray[1]},${props.colorArray[2]})`};  
  margin-bottom:20px;
  margin-top:50px;
img{
    width:auto;
    height:auto;
    min-width:120px;
    min-height:120px;
    object-fit:cover;
}
    
`;

const Title =styled.h1`
    margin-bottom:50px;
`;

const Name=styled.div`
    font-size:20px;
    font-weight:600;
`;

const SLink=styled(Link)`
    position:absolute;
    bottom:50px;
    right:50px;
    text-decoration:none;
    color:black;
    font-size:50px;

`;


const HomePresenter = ({pokemon,setPokemon,colorArray,setColor})=>
{  
    
    const Images=useRef();
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
    
    return(!localStorage.getItem("myPoketmon")  ?
    <GetPokemon setPokemon={setPokemon}/> : 
    <>
        <FlexWrapper>
            <Title>Your Pokemon</Title>
            <Container colorArray={colorArray}>
                <img  crossOrigin ="anonymous" ref={Images} src={pokemon[0].color === 0 ? googleProxyURL +pokemon[0].commonUrl : googleProxyURL+pokemon[0].shinyUrl}
                    alt={"example"}
                    onLoad={()=>{
                        const colorThief = new ColorThief();
                        const img = Images.current;
                        setColor(colorThief.getColor(img));
                    }}
            
                />
            </Container>
            <Name>{pokemon[0].name}</Name>
        </FlexWrapper>
        <SLink to="/navi">Go to <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></SLink>
    </> 
    )   
}

export default HomePresenter;

HomePresenter.propTypes={
    pokemon:PropTypes.array,
    setPokemon:PropTypes.func,
    colorArray:PropTypes.array,
    setColor:PropTypes.func
}