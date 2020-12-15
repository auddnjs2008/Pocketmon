import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const Container = styled.div`
    width:40%;
    height:50px;
    padding:20px;
    background-color:#f1c40f;
    position:fixed;
    margin: 0 auto;
    bottom:-50px;
    left:0;
    right:0;
    color:white;
    z-index:5;
    font-size:20px;
    font-weight:600;
    border-radius:30px;
    display:flex;
    justify-content:center;
    align-items:center;
    @keyframes upMove{
        0%{
        }10%{
          bottom:5px;  
        }
        100%{
            bottom:5px;
        }
        
    }
    animation: upMove 3s linear ;
`;


const Message=({message,setMessage})=>{

    if(message !== "")
        setTimeout(()=>setMessage(""),3000);

    return <>{message !=="" ? <Container>{message}</Container> : ""}</>
}

export default Message;

Message.propTypes={
    message:PropTypes.string,
    setMessage:PropTypes.func
}