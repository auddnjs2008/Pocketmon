import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import pokemon from "pokemon-go-pokedex";
import movePoke from "pokedex";

const pokedex = new movePoke();
//console.log(pokedex.pokemon('cubone'));
// 대문자 -> 소문자  글자.toLoverCase();
const Container = styled.div``;
const NumberWindow = styled.div`
    width :300px;
    height:50px;
    border: 1px solid black;
`;
const Button = styled.button`
    width:100px;
    height:30px;
`;
const GetPokemon = ({setPokemon}) =>{
    let changeNum=1;
    let RandomNum;
    let Random;
    let myPoketmon;
    const poketmon = pokemon.pokemon;
    const [num,setNum]=useState(1);
   
    const settingNumber = ()=>{
        if(changeNum === 151){
            changeNum=1;
        }else
            changeNum++;
        setNum(changeNum);

        if(changeNum === Random) {
            clearInterval(RandomNum);
            myPoketmon= poketmon[changeNum-1].prev_evolution ? 
                poketmon.filter(item => item.num === poketmon[changeNum-1].prev_evolution[0].num): [poketmon[changeNum-1]];
            const pokeGif = pokedex.pokemon(myPoketmon[0].name.toLowerCase()).sprites.animated;
            let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
         
            localStorage.setItem("myPoketmon",JSON.stringify({...myPoketmon[0],pokeGif:googleProxyURL + encodeURIComponent(pokeGif)}));
           
            setPokemon({...myPoketmon[0],pokeGif: googleProxyURL + encodeURIComponent(pokeGif)});
        }
    }

    useEffect(()=>{
        Random= Math.floor(Math.random()*(151-1))+1;
    },[]);

    const handleClick =()=>{
         RandomNum=setInterval(settingNumber,50);

    }

return(
    <Container>
        <NumberWindow><span>{num}</span></NumberWindow>
        <Button onClick={handleClick}>Start</Button>
    </Container>
    )
};


export default GetPokemon;