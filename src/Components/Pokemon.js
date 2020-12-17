import React, { useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ColorThief from "colorthief";
import {Link} from "react-router-dom";

const Container =styled.div`

display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-color:${props => `rgba(${props.colors[0]},${props.colors[1]},${props.colors[2]})`};  
padding:10px;
div{
    font-size:20px;
    font-weight:600;
}
&:hover{
    img,div{
        transform:scale(1.2,1.2);
    }
}
transition:transform 1s linear;
`;

const PLink =styled(Link)``;



const Pokemon=({pokemon})=>{
    
    const Images=useRef();
    const [colors,setColors]=useState([]);
    let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';

    return(
     <PLink  to={`/navi/${pokemon.id}`}>    
        <Container colors={colors}>    
        <img  crossOrigin ="anonymous" ref={Images} src={googleProxyURL+ encodeURIComponent(pokemon.img)}
                        alt={"example"}
                        onLoad={()=>{
                            const colorThief = new ColorThief();
                            const img = Images.current;
                            setColors(colorThief.getColor(img));
                        }}
                
                    />  
        <div>{pokemon.name}</div>
        </Container>
    </PLink>
    )
}

export default Pokemon;

Pokemon.propTypes={
    pokemon:PropTypes.object
}