import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Link,withRouter} from "react-router-dom";

const Container =styled.div`
 position:fixed;
 background-color:white;
 z-index:2;
 top:0;
 width:100%;
 display:grid;
 grid-template-columns:repeat(6,1fr);
 justify-items:center;
 box-shadow: 0px 5px 5px rgba(20,20,20,0.1);
 
`;

const MLink=styled(Link)`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    color:black;
    padding:10px;
    font-size:20px;
    background-color:${props => props.color ? "#f0932b" :"white"};  
    img{
      width:30px;
      height:30px;
      margin-top:5px;
  }  
  
`;


const LongMenu = (props) =>{
   
    return (
        <Container>
            <MLink to="/navi" color={props.location.pathname.includes("/navi") ? true: false} to="/navi">Encyclopedia<img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/camera.png"></img></MLink>
            <MLink to="/store" color={props.location.pathname === "/store" ? true: false}>Store <img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokebag.png"/></MLink>
            <MLink to="/mine" color={props.location.pathname === "/mine" ? true: false}>My Pokemons<img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pikachu-2.png"></img></MLink>
            <MLink to="/bag" color={props.location.pathname === "/bag" ? true: false}>My Bag<img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/backpack.png"/></MLink>
            <MLink to="/game" color={props.location.pathname.includes("/game") ? true: false}>Game <img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/fist.png"/></MLink>
            <MLink to="/doc" color={props.location.pathname.includes("/doc") ? true: false}>Docs <img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/smartphone.png"/></MLink>    
        </Container>
    )
}

export default withRouter(LongMenu);