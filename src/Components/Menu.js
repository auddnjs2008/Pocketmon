import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Link,withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";


const MenuWrapper = styled.div`
    display:flex;
    overflow:hidden;
   
`;

const Icon = styled.span`
    font-size:30px;
    z-index:1;
    margin-left:10px;
    margin-top:10px;
  
`;

const Container =styled.div`
    width:100%;
    border: 1px solid black;
    transform:translateX(100%);
    display:grid;
    grid-template-rows:repeat(6,50px);
    justify-self:end;
    margin-left:20px;
    z-index:1;
   
    @keyframes slider {
        0%{
            transform:translateX(100%);
        }
        100%{
            transform: translateX(0);
        }
    }
    @keyframes sliderOut{
        0%{
            transform:translateX(0);
        }
        100%{
            transform:translateX(100%);
        }
    }
    &.show{
        animation: slider 0.3s linear forwards;
    }
    &.unshow{
    animation:sliderOut 0.3s linear forwards;
    }    
`;

const MLink = styled(Link)`
  padding:10px;  
  text-decoration:none;
  border-top:1px solid black;
  color: black;
  background-color:${props => props.color ? "#f0932b" :"white"};  
  display:flex;
  align-items:center;
  img{
      width:30px;
      height:30px;
      margin-left:5px;
  }  
`;



const Menu = (props) =>{
     // props.location.pathname 에  위치가 있다.
    const [sw, setSw]=useState(false);
    const handleMenu =(e)=>{
        const menu = document.querySelector(".menu");
        menu.classList.toggle("show");
        
        //<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        if(menu.classList.contains("show")){
            menu.classList.remove("unshow")
            setSw(true);
        }else{
            menu.classList.add("unshow");
            setSw(false);
        }
    }


    return (
        <MenuWrapper>
            <Icon onClick={handleMenu}>
            { sw === false ? <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                :
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            }
            </Icon>
            <Container className="menu">
                <MLink to="/navi" color={props.location.pathname.includes("/navi") ? true: false}>Encyclopedia<img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/camera.png"></img></MLink>
                <MLink to="/store" color={props.location.pathname === "/store" ? true: false}>Store <img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokebag.png"/></MLink>
                <MLink to="/mine" color={props.location.pathname === "/mine" ? true: false}>My Pokemons<img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pikachu-2.png"></img></MLink>
                <MLink to="/bag" color={props.location.pathname === "/bag" ? true: false}>My Bag<img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/backpack.png"/></MLink>
                <MLink to="/game" color={props.location.pathname.includes("/game") ? true: false}>Game<img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/fist.png"/></MLink>
                <MLink to="/doc" color={props.location.pathname.includes("/doc") ? true: false}>Docs <img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/smartphone.png"/></MLink>    

            </Container>
        </MenuWrapper>

    )

}

export default withRouter(Menu);

