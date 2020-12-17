import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Menu from "../../Components/Menu";
import LongMenu from "../../Components/LongMenu";
import Message from "../../Components/Message";
import Mega from "pokesprite-images/items/mega-stone/banettite.png";
import Alola from "pokesprite-images/items/mega-stone/aggronite.png";
import Color from "pokesprite-images/items/z-crystals/snorlium-z--bag.png";

const Container = styled.div`
    position:absolute;
    top:0;
    width:100%;
    padding:20px;
    display:grid;
    grid-template-columns:repeat(3,1fr);
    grid-auto-rows:1fr;
    gap:10px;
    grid-row-gap:20px;
    margin-top:${props=>props.windowSize >810 ? "70px" :"0px"};

`;

const text ="If you have 10 Badges or have all Badges,you can get a special Pokemon randomly";

const ImgWrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    &:hover{
        transform:scale(1.1,1.1);
    }
    transition:transform 0.2s linear;
`;

const Title = styled.div`
    font-size:20px;
    font-weight:600;
    margin-top:5px;
`;

const InfoWrapper=styled.div`
    width:70%;
    height:70%;
    position:absolute;
    top:${props=>props.scroll ? `${props.scroll+(window.innerHeight)/2}px`:"50%"};
    left:50%;
    transform:translate(-50%,-50%);
    z-index:3;
    display:none;
    background-color:black;
    color:white;
    grid-template-areas:
        "profile profile content content"
        "profile profile content content"
        "profile profile content content"
        "price price price price"
        "button button button button";
    justify-items:center;
    padding:20px;    
`;


const InfoProfile=styled.div`
    img{
        width:auto;
        height:auto;
        min-width:200px;
        min-height:200px;
        max-width:250px;
        max-height:250px;
        margin-bottom:5px;
    }
    margin-right:10px;

    grid-area: profile;
    text-align:center;
    div{
        font-size:25px;
    }

`;

const InfoContent=styled.p`
    grid-area: content;
    display:flex;
    justify-content:center;
    align-items:center;
    line-height:1.5;
    font-size:25px;

`;
const PriceWrapper=styled.div`
    width:100%;
    grid-area: price;
    img{
        width:35px;
        height:35px;
        margin-right:5px;
        margin-left:5px;
    }

    display:flex;
    justify-content:space-around;
    div{
        display:flex;
        align-items:center;
    }

`;
const BtnWrapper=styled.div`
    grid-area:button;
    width:100%;
    display:flex;
    justify-content:space-around;
    align-items:center;
    button{
        width:100px;
        height:30px;
        font-size:20px;
        font-weight:600;
    }
`;

const Img = styled.img`
    width:auto;
    height:auto;
    max-width:200px;
    max-height:200px;
    object-fit:cover;
    &.stone{
        width:100px;
        height:100px;
        object-fit:cover;
    }
`;

const StorePresenter=({windowSize,handleItemClick,handleClose,handleBuyBtn,name,info,img,money,scroll,myMoney,message,setMessage})=>
    <>
    {windowSize > 810 ? <LongMenu></LongMenu> :<Menu></Menu>}
    <Container windowSize={windowSize}>
        <ImgWrapper onClick={()=>handleItemClick("pokeball","You can catch pokemon by using this Item","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokeball.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokeball.png"/>
            <Title>PokeBall</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("superball","You can catch pokemon by using this Item","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/superball.png",35)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/superball.png" />
            <Title>Super-Ball</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("ultra-ball","You can catch pokemon by using this Item","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/ultra-ball.png",45)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/ultra-ball.png"/>
            <Title>Ultra-Ball</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("pokeballs","You can catch pokemon by using this Item","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokeballs.png",65)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokeballs.png"/>
            <Title>Pokeballs</Title>
        </ImgWrapper>

        <ImgWrapper onClick={()=>handleItemClick("Incense","There could be more Pokemons by using Item","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/incense.png",30)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/incense.png"/> 
            <Title>Incense</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Incenses","There could be more Pokemons by using Item","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/incenses.png",75)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/incenses.png"/>
            <Title>Incenses</Title>
        </ImgWrapper>    
        <ImgWrapper onClick={()=>handleItemClick("razz-berry","When you are trying to catch Pokemon, you can get Pokemon easily by using this","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/razz-berry.png",30)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/razz-berry.png"/>
            <Title>Razz-Berry</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Potion","Can hill the Pokemon HP","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/potion.png",10)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/potion.png"/>
            <Title>Potion</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("SuperPotion","Can hill the Pokemon HP","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/super-potion.png",20)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/super-potion.png"/>
            <Title>Super-Potion</Title>
        </ImgWrapper>    
        <ImgWrapper onClick={()=>handleItemClick("HyperPotion","Can hill the Pokemon HP","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/hyper-potion.png",30)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/hyper-potion.png"/>
            <Title>Hyper-Potion</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Egg", "You can get Basic Pokemon","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/egg.png",40)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/egg.png"/>
            <Title>Egg</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("LuckyEgg","You can get all Pokemon","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/lucky-egg.png",60)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/lucky-egg.png"/>
            <Title>Lucky-Egg</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("EggIncubator","You can hatch an egg, it takes about 5days","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/egg-incubator.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/egg-incubator.png"/>
            <Title>Egg-Incubator</Title>
        </ImgWrapper>    
        <ImgWrapper onClick={()=>handleItemClick("SuperEggIncubator","You can hatch an egg, it takes about 3days","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/egg-incubator-1.png",35)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/egg-incubator-1.png"/>
            <Title>Super-Egg-Incubator</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Candy","This helpes evolving Any Pokemon regardless of Kind","https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/candy.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/candy.png"/>
            <Title>Candy</Title>
        </ImgWrapper>
        <ImgWrapper>
            <Img className="stone" src={Mega} onClick={()=>handleItemClick("MegaCandy","This helpes evolving  Mega Pokemon or MegaXY Pokemon",Mega,3000)}/>   
            <Title>Mega Candy</Title>
        </ImgWrapper>
        <ImgWrapper>
            <Img  className="stone" src={Alola} onClick={()=>handleItemClick("AlolaCandy","This helpes evoving alola Pokemon",Alola,3000)}/>
            <Title>Alola Candy</Title>
        </ImgWrapper>
        <ImgWrapper>
            <Img  className="stone" src={Color} onClick={()=>handleItemClick("ColorChanger" ,"This helpes changing Pokemon's color",Color,1500)}/>
            <Title>Color Changer</Title>
        </ImgWrapper>
        




        
        <ImgWrapper onClick={()=>handleItemClick("Pikachu-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pikachu-2.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pikachu-2.png"/>
            <Title>Pikachu-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Charmander-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/charmander.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/charmander.png"/>
            <Title>Charmandar-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Squirtle-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/squirtle.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/squirtle.png"/>
            <Title>Squirtle-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Bullbasaur-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/bullbasaur.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/bullbasaur.png"/>
            <Title>Bullbasaur-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Psydux-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/psyduck.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/psyduck.png"/>
            <Title>Psydux-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Meowth-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/meowth.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/meowth.png"/>
            <Title>Meowth-Badge</Title> 
        </ImgWrapper>    
        <ImgWrapper onClick={()=>handleItemClick("Eevee-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/eevee.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/eevee.png"/>
            <Title>Eevee-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Jigglypuff-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/jigglypuff.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/jigglypuff.png"/>
            <Title>Jigglypuff-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Snorlax-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/snorlax.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/snorlax.png"/>
            <Title>Snorlax-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Bellsprout-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/bellsprout.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/bellsprout.png"/>
            <Title>Bellsprout-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Zubat-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/zubat.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/zubat.png"/>
            <Title>Zubat-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Rattata-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/rattata.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/rattata.png"/>
            <Title>Rattata-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Pidgey-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pidgey.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pidgey.png"/>
            <Title>Pidgey-Badge</Title>
        </ImgWrapper>

        <ImgWrapper onClick={()=>handleItemClick("Caterpie-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/caterpie.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/caterpie.png"/>
            <Title>Caterpie-Badge</Title>
        </ImgWrapper>

        <ImgWrapper onClick={()=>handleItemClick("Mankey-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/mankey.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/mankey.png"/>
            <Title>Mankey-Badge</Title>
        </ImgWrapper>

        <ImgWrapper onClick={()=>handleItemClick("Venonat-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/venonat.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/venonat.png"/>
            <Title>Venonat-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Abra-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/abra.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/abra.png"/>
            <Title>Abra-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Weedle-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/weedle.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/weedle.png"/>
            <Title>Weedle-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Mew-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/mew.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/mew.png"/>
            <Title>Mew-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Dratini-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/dratini.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/dratini.png"/>
            <Title>Dratini-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Instinct-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/instinct.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/instinct.png"/>
            <Title>Instinct-Badge</Title>
        </ImgWrapper>

        <ImgWrapper onClick={()=>handleItemClick("Mystic-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/mystic.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/mystic.png"/>
            <Title>Mystic-Badge</Title>
        </ImgWrapper>
        <ImgWrapper onClick={()=>handleItemClick("Valor-Badge",text,"https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/valor.png",25)}>
            <Img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/valor.png"/>
            <Title>Valor-Badge</Title>
        </ImgWrapper>
    </Container>
     <InfoWrapper className="InfoWrapper" scroll={scroll}>
        <InfoProfile>
            <img src={img} />
            <div>{name}</div>    
        </InfoProfile>         
         <InfoContent>
            {info}
         </InfoContent>
        <PriceWrapper>
               <div>Your Money : <img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokecoin.png"/>{myMoney}</div> 
               <div>Price : {<img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokecoin.png"/>} {money}</div> 
        </PriceWrapper>
         <BtnWrapper>
            <button onClick={handleBuyBtn}>Buy</button>
            <button onClick={handleClose}>Close</button>     
        </BtnWrapper>   
    </InfoWrapper>
    <Message message={message} setMessage={setMessage} ></Message>       
    </>

export default StorePresenter;