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
 grid-template-columns:repeat(4,1fr);
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
             <MLink color={props.location.pathname === "/navi" ? true: false} to="/navi">Encyclopedia<img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/camera.png"></img></MLink>
                <MLink color={props.location.pathname === "/navi/store" ? true: false}>Store <img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokebag.png"/></MLink>
                <MLink color={props.location.pathname === "/navi/mine" ? true: false}>My Pokemons<img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pikachu-2.png"></img></MLink>
                <MLink color={props.location.pathname === "/navi/etc" ? true: false}>Etc</MLink>
        </Container>
    )
}

export default withRouter(LongMenu);