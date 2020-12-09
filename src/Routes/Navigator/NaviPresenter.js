import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Menu from "../../Components/Menu";
import LongMenu from "../../Components/LongMenu";
import Pokemon from "../../Components/Pokemon";


const PokeWrapper=styled.div`
    position:absolute;
    top:0;
    padding:20px;
    box-sizing:border-box;
    margin:0 auto;
    margin-top:${props=>props.windowSize >810 ? "70px" :"0px"};
    width:100%;
    height:100%;
    display:grid;
    gap:10px;
    grid-template-columns:repeat(3,1fr);
    grid-auto-rows:1fr;
`;


const NaviPresenter =({pokemons,windowSize}) => 
{   
    
    return(
    <>
        {windowSize > 810 ? <LongMenu></LongMenu> : <Menu></Menu>}
        <PokeWrapper windowSize={windowSize}>
        {pokemons.map(item=><Pokemon pokemon={item}/>)}
        </PokeWrapper>
    </>
    )
}    
export default NaviPresenter;