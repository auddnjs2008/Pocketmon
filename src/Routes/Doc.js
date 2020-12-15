import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Menu from "../Components/Menu";
import LongMenu from "../Components/LongMenu";
import Mega from "pokesprite-images/items/mega-stone/banettite.png";
import Alola from "pokesprite-images/items/mega-stone/aggronite.png";
import Color from "pokesprite-images/items/z-crystals/snorlium-z--bag.png";


const Container =styled.div``;
const Section=styled.section``;
const ItemWrapper =styled.div`
display:grid;
grid-template-rows:repeat(9,1fr);
    div{
        display:grid;
        grid-template-columns:1fr 10fr;
        img{
            width:40px;
            height:40px;
        }
    }


`;



const Doc=()=>{

    const [windowSize,setWindow]=useState(window.innerWidth);

    useEffect(()=>{
        window.addEventListener("resize",()=>setWindow(window.innerWidth));        
        return ()=>window.removeEventListener("resize",()=>setWindow(window.innerWidth));    
    },[]);




return <>
        {windowSize > 810 ? <LongMenu></LongMenu> : <Menu></Menu>}
    <Container>
    <Section>
        <h1>Pokemon</h1>
        <p>
            This Pokemon is 1st Generation Pokemon and  plused Mega Evolution, Alola Pokemon.

        </p>
    </Section>
    <Section>
        <h1>Item</h1>
        <ItemWrapper>
            <div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokeball.png"/><span>You can catch Pokemon by using this. You can use this Item in Battle</span></div>
            <div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/potion.png"/><span>You can hill Pokemon by using this. On My Bag Page, You can use this Item</span></div>
            <div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/razz-berry.png"/><span>You can catch Pokemon easily by using this. You can use this Item in Battle</span></div>
            <div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/incense.png"/><span>You can meet more Pokemons in game map by using this. This Item can be used in the map.</span></div>
            <div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/egg-incubator.png"/><span>If you have Pokemon Egg, Then you can use this Item. In the map, whenever you move, then Incubator walking number is updated</span></div>
            <div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/candy.png"/><span>This Item is used to evolve into General Next step Pokemon</span></div>
            <div><img src={Mega}/><span>This Item is used to evolve into Mega Pokemon or MegaX Pokemon or MegaYPokemon(MegaX or MegaY is Random). you can only use this Item for Pokemon that has Mega Evolution </span></div>
            <div><img src={Alola}/><span>This Item is used to turning into Alola Pokemon. you can only use this Item for Pokemon that has Alola Step</span></div>
            <div><img src={Color}/><span>This Item is used to change Color. you can use this Item for all Pokemon </span></div>
        </ItemWrapper>
    </Section>
    <Section>
        <h1>My Pokemon</h1>
        <p>
           On this Page, you can confirm pokemon that you caught.  And  you can set Battle Pokemons.  if you don't set Battle Pokemon
           you can't fight pokemon in the game map.  you can set Battle Pokemon by pressing Change off Button.  
           In Change Off state, if you press your Pokemon, you can confirm detail Page.  In Change On state, if you press your Pokemon, you can
           set Battle Pokemon.
           Clear Button is used to clear battlePokemons 

        </p>
    </Section>
    <Section>
        <h1>Game Map</h1>
        <p>
            There are 5 general Map  and 4 Boss Map. In each general Map,  you can catch Each Type Pokemon.
            BossMap has Special Color 
            In each Boss Map,  you can catch Regend Pokemon. But Please be careful. Their Cp is very high
            And If you use Incense Item  in each map(include bossmap), you can see many Pokemon that has Type fitting in Map   
        </p>
    </Section>
    <Section>
        <h1>Attack Calculating</h1>
        <p>
           Every Pokemon  has 100 HP.  And  our Game System  calculated Damege using Cp and Type Damege.
           General attack Damege is -10Hp
           The Pokemon that has higher Cp than opposite pokemon  has more Damege   higerPokemon CP / opposite Pokemon Cp(10 + this Damege)
           The Type Damege is followed by general Pokemon game. 
           So The Damege is  like this.  (10 + CpDamege(if Cp is higher)) Type Damege ratio

        </p>
    </Section>
    <Section>
        <h1>CopyRight</h1>
        <p>
            

        </p>
    </Section>
    </Container>


</>

}

export default Doc;