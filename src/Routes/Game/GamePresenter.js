import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Menu from "../../Components/Menu";
import LongMenu from "../../Components/LongMenu";
const Container =styled.div`
    position:absolute;
    top:0;
    width:100%;
    height:100%;
    margin-top:${props=>props.windowSize >810 ? "90px" :"0px"};
    background-image:url("https://usecloud.s3-ap-northeast-1.amazonaws.com/pokmonImages/%EC%A7%80%EB%8F%84.png");
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
        border: 5px solid #34495e;
        background-color:rgba(0,0,0,0.6);
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
    &:nth-child(7){
        left:53%;
        top:15%;
        border: 5px solid #7ed6df;
        background-color:rgba(223,249,251,0.6);    
    }
    &:nth-child(8){
        left:60%;
        top:20%;
        border: 5px solid yellow;
        background-color:rgb(249, 202, 36,0.7);

    }
    &:nth-child(9){
        left:30%;
        top:35%;
        border: 5px solid red;
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
            <Pointer to="/game/icemap"></Pointer>
            <Pointer to="/game/electricmap"></Pointer>
            <Pointer to="/game/firemap"></Pointer>
        </Container>

        </>


    )

}

export default GamePresenter;

GamePresenter.propTypes={
    windowSize:PropTypes.number
}