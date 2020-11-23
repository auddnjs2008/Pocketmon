import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Menu from "../../Components/Menu";
import LongMenu from "../../Components/LongMenu";


const Container =styled.div`
    width:100%;
    padding:10px;
    position:absolute;
    top:0;
    margin-top:${props=>props.windowSize >810 ? "70px" :"0px"};
    display:grid;
    grid-template-areas:"money Badge"
                        "other other";
    row-gap:50px;

    
`;
const Money = styled.section`
    grid-area:money;
   
    align-self:center;
    justify-self:center;
    h1{
        font-size:30px;
        font-weight:600;
        img{
            width:50px;
            height:50px;
            margin-left:8px;
        }
    }
`;

const Badge =styled.section`
    margin-top:20px;
    grid-area:Badge;
    justify-self:center;
    width:300px;
    h1{
        margin-bottom:20px;
        font-size:20px;
        font-weight:600;
    }
`;


const Img = styled.img`
    box-shadow: ${props=>props.badges && props.badges.includes(props.id) ? "" : "inset 0 2px 4px 2px rgba(0,0,0,.06)" }; 
    width:50px;
    height:50px;
    opacity:${props=>props.badges && props.badges.includes(props.id) ? "1" : "0.5"};
`;
const ImgWrapper =styled.ul`
    margin-top:5px;
    display:grid;
    grid-template-columns:repeat(5,1fr);
    gap:5px;
    grid-auto-rows:1fr;
    padding:10px;
    background-color:#F4F5F7;
    box-shadow: inset 0 2px 4px 2px rgba(0,0,0,.06);
`;

const BallWrapper = styled.section`
    box-shadow: 0px 5px 5px rgba(0,0,0,0.16);
    display:grid;
    justify-items:center;
    gap:20px;
    grid-template: "title title title " 1fr 
                         "ball1 ball2 ball3" 2fr/1fr 1fr 1fr ;   

    h1{
        grid-area:title;
        font-weight:600;
    }
    background-color:#D2D6DC;
    padding:20px;
    &:hover{
        transform:translateY(-10px) scale(1.01,1.01);

    }
    transition:transform 0.2s linear;
`;


const Ball=styled.div`
    &:nth-child(2){
        grid-area:ball1
    }
    &:nth-child(3){
        grid-area:ball2
    }
    &:nth-child(4){
        grid-area:ball3
    }

    img{
        width:50px;
        height:50px;
        margin-right:10px;
    }
    display:flex;
    align-items:center;
    justify-content:center;
    & div{
        text-align:center;
    }
    div:nth-child(2){
        color:red;
        padding:5px;
        box-shadow: inset 0 2px 4px 2px rgba(0,0,0,.16);
    }
`;
const SubGridWrapper=styled.div`
    grid-area:other;
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:20px;

`;
const PotionWrapper = BallWrapper;
const Potion =Ball;
const EggWrapper = BallWrapper;
const Egg=Ball;
const IncubatorWrapper=BallWrapper;
const Incubator=Ball;
const OthersWrapper =BallWrapper;
const Others=Ball;

const BagPresenter= ({windowSize,bag})=>
<>
{windowSize > 810 ? <LongMenu></LongMenu> : <Menu></Menu>}
<Container windowSize={windowSize}>
    <Money>
    <h1>Your Money:<img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokecoin.png"/> {bag.money}</h1>
    </Money>
    <Badge windowSize={windowSize}>
        <h1>Your Pokemon Badges : {bag.Badges ? bag.Badges.length : 0}</h1>
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
    <SubGridWrapper>
        <BallWrapper>
            <h1>Ball</h1>
            <Ball><div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokeball.png"/><h2>Poketball</h2></div><div>{bag.PokeBall ? bag.PokeBall : 0}개</div></Ball>
            <Ball><div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/superball.png"/><h2>Super-ball</h2></div><div>{bag.SuperBall?bag.SuperBall : 0}개</div></Ball>
            <Ball><div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/ultra-ball.png"/><h2>Ultra-ball</h2></div><div>{bag.UltraBall ? bag.UltraBall :0}개</div></Ball>
        </BallWrapper>
        <PotionWrapper>
            <h1>Potion</h1>
            <Potion><div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/potion.png"/><h2>Potion</h2></div><div>{bag.Potion ? bag.Potion : 0}개</div></Potion>
            <Potion><div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/super-potion.png"/><h2>Super-Potion</h2></div><div>{bag.SuperPotion ? bag.SuperPotion : 0}개</div></Potion>
            <Potion><div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/hyper-potion.png"/><h2>Hyper-Potion</h2></div><div>{bag.HyperPotion ? bag.HyperPotion : 0}개</div></Potion>
        </PotionWrapper> 
        <EggWrapper>
            <h1>Egg</h1>
            <Egg><div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/egg.png"/><h2>Egg</h2></div><div>{bag.Egg ? bag.Egg : 0}개</div></Egg>     
            <Egg><div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/lucky-egg.png"/><h2>Lucky-Egg</h2></div><div>{bag.LuckyEgg ? bag.LuckyEgg : 0}개</div></Egg>     
        </EggWrapper>   
        <IncubatorWrapper>
            <h1>Incubator</h1>
            <Incubator><div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/egg-incubator.png"/><h2>Incubator</h2></div><div>{bag.EggIncubator ? bag.EggIncubator : 0}개</div></Incubator>
            <Incubator><div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/egg-incubator-1.png"/><h2>Super-Incubator</h2></div><div>{bag.SuperEggIncubator ? bag.SuperEggIncubator : 0}개</div></Incubator>
        </IncubatorWrapper>
        <OthersWrapper>
            <h1>Others</h1>
            <Others><div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/razz-berry.png"/><h2>Razz-berry</h2></div><div>{bag.RazzBerry ? bag.RazzBerry : 0}개</div></Others>
            <Others><div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/incense.png"/><h2>Incense</h2></div><div>{bag.Incense ? bag.Incense : 0}개</div></Others>
            <Others><div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/candy.png"/><h2>Candy</h2></div><div>{bag.Candy ? bag.Candy : 0}개</div></Others>
        </OthersWrapper>
    </SubGridWrapper>
</Container>
</>
export default BagPresenter;