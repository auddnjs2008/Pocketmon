import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Menu from "../../Components/Menu";
import LongMenu from "../../Components/LongMenu";
import Map from "../../지도.png";
const Container =styled.div`
    position:absolute;
    top:0;
    width:100%;
    height:100%;
    margin-top:${props=>props.windowSize >810 ? "90px" :"0px"};
    background-image:url(${Map});
    background-size:700px 500px;
    background-repeat:no-repeat;
    background-position:center center;


`;

const Pointer = styled(Link)`
    width:50px;
    height:50px;
    border-radius:50%;
    border: 5px solid #e74c3c;
    position:absolute;
    background-color:rgba(231,76,60,0.5);
    &:nth-child(1){
        bottom:200px;
        left:50%;
    }
    
    &:nth-child(2){
        left:50%;
        top: 200px;
        transform:translateX(170px);
    }
  
    &:nth-child(3){
        left:50%;
        top:155px;
        transform:translateX(-80px);
    }
    &:nth-child(4){
        left:50%;
        top:380px;
    }
    &:nth-child(5){
        left:50%;
        top:35%;
        transform:translateX(190px);

    }
    &:nth-child(6){
        left:35%;
        top:38%;

    }

    @keyframes circleWave{
        0%{
            transform:scale(0.5,0.5);
        }
        100%{
            transform:scale(1,1);        
        }
    }
   // animation: circleWave 1s linear infinite;
   &:hover{
       width:55px;
       height:55px;
   }
   transition:all 0.2s linear;
`;


const GamePresenter=({windowSize})=>{


    return (
        <>
        {windowSize > 810 ? <LongMenu></LongMenu> : <Menu></Menu>}
        <Container>
            <Pointer to="/game/yardmap"></Pointer>
            <Pointer to="/game/rockmap"></Pointer>
            <Pointer to="/game/bossmap"></Pointer>
            <Pointer to="/game/watermap"></Pointer>
            <Pointer to="/game/skymap"></Pointer>
            <Pointer to="/game/forestmap"></Pointer>
        </Container>

        </>


    )

}

export default GamePresenter;