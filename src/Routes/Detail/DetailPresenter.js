import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";


const Container=styled.div`
    img{
        width:auto;
        height:auto;
        min-width:150px;
        max-height:150px;
        object-fit:cover;
    }


`;
const InfoBox = styled.ul`
`;


const DetailPresenter=({pokemon})=>{
    console.log(pokemon);
    return( 
    <Container>
        <img src={pokemon.pokeGif} />
        <InfoBox>
            <li>Name: <span>{pokemon.name}</span></li>
            <li>Type: <span>{pokemon.type}</span></li>
            <li>Height: <span>{pokemon.height}</span></li>
            <li>Weight: <span>{pokemon.weight}</span></li>
            <li>Candy: <span>{pokemon.candy}</span></li>
            <li>Candy_count: <span>{pokemon.candy_count}</span></li>
            <li>Egg: <span>{pokemon.egg}</span></li>
            <li>Multiplier: <span>{pokemon.multipliers}</span></li>
            <li>Weakenss: <span>{pokemon.weaknesses}</span></li>
        </InfoBox>
    </Container>
    )
}

export default DetailPresenter;