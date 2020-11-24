import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Tree from "../../나무.png";

const MapContainer=styled.div`
    position:relative;
    width:100vw;
    height:100%;
    display:grid;
    grid-template-columns:repeat(11,1fr);
    grid-template-rows:repeat(10,1fr);
                
`;

const TreeWrapper = styled.div`
    
    width:100%;
    height:100px;
    background-image:url(${Tree});
    background-size:cover;
    background-position:center center;
    background-color:#659A25;
 
  
`;

const RoadWrapper = styled.div`
    width:100%;
    height:100%;
    background-color:#e58e26;

`;
const Trainer = styled.img`
    position:absolute;
    bottom:0;
    left:50%;
`;




const YardMapPresenter=({map,trainer,char,yard,handleKeyPress})=>{

    return( 
        <>
        <MapContainer ref={yard}>
            {map.map(items=>items.map(item=>item === 1 ? <TreeWrapper></TreeWrapper>:<RoadWrapper></RoadWrapper>))}
            <Trainer     src={trainer[0]} ref={char}></Trainer>
        </MapContainer>
        </>
    )
}


export default YardMapPresenter;