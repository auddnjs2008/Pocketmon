import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";


const Canvas=styled.canvas`
   background-color:black;
`;

const Character=styled.img``;



const BossMapPresenter=({canvas,character})=>{

    return <Canvas width="1400px" height="1400px" ref={canvas}>
        <Character ref={character} src=""/>

    </Canvas>
}

export default BossMapPresenter;