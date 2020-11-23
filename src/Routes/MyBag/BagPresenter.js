import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Menu from "../../Components/Menu";
import LongMenu from "../../Components/LongMenu";


const Container =styled.div`
    position:absolute;
    top:0;
    margin-top:${props=>props.windowSize >810 ? "70px" :"0px"};

`;
const Money = styled.section`
    h1{
        img{
            width:50px;
            height:50px;
        }
    }
`;

const Badge =styled.section``;
const Img = styled.img`
    width:60px;
    height:60px;
    opacity:${props=>props.badges.includes(props.id) ? "1" : "0.5"};
`;
const ImgWrapper =styled.ul`
    display:grid;
    grid-template-columns:repeat(5,1fr);
    gap:5px;
    grid-auto-rows:1fr;
`;

const BallWrapper = styled.section``;
const Ball=styled.div``;

const BagPresenter= ({windowSize,bag})=>
<>
{windowSize > 810 ? <LongMenu></LongMenu> : <Menu></Menu>}
<Container>
    <Money>
    <h1>Your Money:<img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokecoin.png"/> {bag.money}</h1>
    </Money>
    <Badge>
        <h1>Your Pokemon Badges : {bag.Badges.length}</h1>
        <ImgWrapper >
            <Img badges={bag.Badges} id="Pikachu" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pikachu-2.png"/>
            <Img badges={bag.Badges} id="Charmander"src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/charmander.png"/>
            <Img badges={bag.Badges} id="Squirtle" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/squirtle.png"/>
            <Img badges={bag.Badges} id="bullbasaur" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/bullbasaur.png"/>
            <Img badges={bag.Badges} id="Psyduck" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/psyduck.png"/>
            <Img badges={bag.Badges} id="Meowth" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/meowth.png"/>
            <Img badges={bag.Badges} id="Eevee" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/eevee.png"/>
            <Img badges={bag.Badges} id="Jigglypuff" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/jigglypuff.png"/>
            <Img badges={bag.Badges} id="Snorlax"src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/snorlax.png"/>
            <Img badges={bag.Badges} id="Bellsprout" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/bellsprout.png"/>
            <Img badges={bag.Badges} id="Zubat" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/zubat.png"/>
            <Img badges={bag.Badges} id="Rattata" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/rattata.png"/>
            <Img badges={bag.Badges} id="Pidgey" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pidgey.png"/>
            <Img badges={bag.Badges} id="Caterpie" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/caterpie.png"/>
            <Img badges={bag.Badges} id="Mankey" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/mankey.png"/>
            <Img badges={bag.Badges} id="Venonat" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/venonat.png"/>
            <Img badges={bag.Badges} id="Abra" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/abra.png"/>
            <Img badges={bag.Badges} id="Weedle" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/weedle.png"/>
            <Img badges={bag.Badges} id="Mew" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/mew.png"/>
            <Img badges={bag.Badges} id="Dratini" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/dratini.png"/>
            <Img badges={bag.Badges} id="Instinct" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/instinct.png"/>
            <Img badges={bag.Badges} id="Mystic" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/mystic.png"/>
            <Img badges={bag.Badges} id="Valor" src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/valor.png"/>
        </ImgWrapper>
    </Badge>
    <BallWrapper>
        <h1>Poke Ball</h1>
        <Ball><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokeball.png"/><h2>Pokeball</h2></Ball>
        <Ball><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/superball.png"/><h2>Super-ball</h2></Ball>
        <Ball><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/ultra-ball.png"/><h2>Ultra-ball</h2></Ball>
    </BallWrapper>
</Container>
</>
export default BagPresenter;