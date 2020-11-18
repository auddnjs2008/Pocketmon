import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";


const Container=styled.div`
    width:90%;
    margin:0 auto;
   display:grid;
   grid-template-rows:1fr 3fr;

`;

const ImgWrapper=styled.div`
    img{
        width:auto;
        height:auto;
          
    }
    border:1px solid black;
    display:grid;
    grid-template-columns:repeat(5,1fr);
    align-items:center;
    justify-items:center;
`;
const InfoBox = styled.ul`
    font-weight:600;
    padding:10px;
    font-size:20px;
    gap:5px;
    border:1px solid black;
    display:grid;
    grid-template-rows:repeat(9,1fr);
    li{
        display:grid;
        grid-template-columns:130px 1fr;
        span{
            display:block;
        }
        span.liTitle{
            background-color:#e74c3c;
            display:flex;
            align-items:center;
            justify-content:center;
    
        }
        span:nth-child(2){
            width:100%;
            padding:5px;
            background-color:#ffbe76;
            justify-self:center;
            display:grid;
            justify-items:center;
            align-items:center;
            grid-auto-flow:column;
            grid-auto-columns:1fr;
            span{
                margin-right:10px;
            }
        }
    }
`;


const DetailPresenter=({pokemon})=>{
    const otherURl = `https://projectpokemon.org/images/normal-sprite/${pokemon.name.toLowerCase()}.gif`;
    const backUrl=`https://projectpokemon.org/images/sprites-models/normal-back/${pokemon.name.toLowerCase()}.gif`;
    const shinyURl=`https://projectpokemon.org/images/shiny-sprite/${pokemon.name.toLowerCase()}.gif`;
    const shinyBackURl=`https://projectpokemon.org/images/sprites-models/shiny-back/${pokemon.name.toLowerCase()}.gif`;
    return( 
    <Container>
        <ImgWrapper>
            <img src={otherURl} />
            <img src={backUrl}/>
            <img src={pokemon.pokeGif}/>
            <img src={shinyURl}/>
            <img src={shinyBackURl}/>
        </ImgWrapper>
        <InfoBox>
            <li><span className="liTitle">Name</span> <span>{pokemon.name}</span></li>
            <li><span className="liTitle">Type</span> <span>{pokemon.type.map(item=><span>{item}</span>)}</span></li>
            <li><span className="liTitle">Height</span> <span>{pokemon.height}</span></li>
            <li><span className="liTitle">Weight</span> <span>{pokemon.weight}</span></li>
            <li><span className="liTitle">Candy</span> <span>{pokemon.candy}</span></li>
            <li><span className="liTitle">Candy_count</span> <span>{pokemon.candy_count}</span></li>
            <li><span className="liTitle">Egg</span> <span>{pokemon.egg}</span></li>
            <li><span className="liTitle">Multiplier</span> <span>{pokemon.multipliers}</span></li>
            <li><span className="liTitle">Weakenss</span> <span>{pokemon.weaknesses.map(item=><span>{item}</span>)}</span></li>
        </InfoBox>
    </Container>
    )
}

export default DetailPresenter;