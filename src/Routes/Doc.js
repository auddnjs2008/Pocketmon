import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Menu from "../Components/Menu";
import LongMenu from "../Components/LongMenu";
import Mega from "pokesprite-images/items/mega-stone/banettite.png";
import Alola from "pokesprite-images/items/mega-stone/aggronite.png";
import Color from "pokesprite-images/items/z-crystals/snorlium-z--bag.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Container =styled.div`
 position:absolute;
 top:0;
 width:800vw;
 //display:flex;
 //overflow:hidden;
 margin-top:${props=>props.windowSize >810 ? "90px" :"100px"};

 display:grid;
 grid-template-columns:repeat(8,1fr);

`;

const FixedWrapper = styled.div`
width:100%;
position:fixed;
top:0;
z-index:1;
`;

const Section=styled.section`

    width:100vw;
    height:500px;
    display:grid;
    grid-template-rows:1fr 10fr;
    gap:10px;
    justify-items:center;
    align-items:center;
    padding:20px;

    h1{
        font-size:30px;
        font-weight:600;
    }
    p{
        font-size:20px;
        font-weight:600;
        line-height:1.2fr;
    }     




    &:nth-child(2),&:nth-child(8){
        background-image:url("https://usecloud.s3-ap-northeast-1.amazonaws.com/pokmonImages/%ED%94%BC%EC%B9%B4%EC%B8%84.png");
        background-position:center center;
        background-repeat:no-repeat;
        background-color:#fcedac;
        p{
            align-self:flex-start;
            margin-top:100px;
            span{
                color:#e74c3c;
            }
        }
    }
    &:nth-child(3){
        background-image:url("https://usecloud.s3-ap-northeast-1.amazonaws.com/pokmonImages/%EA%BC%AC%EB%B6%80%EA%B8%B0.png");
        background-position:center center;
        background-repeat:no-repeat;
        background-color:#baf1fe;

    }
    &:nth-child(4){
        background-image:url("https://usecloud.s3-ap-northeast-1.amazonaws.com/pokmonImages/%EC%9D%B4%EC%83%81%ED%95%B4%EC%94%A8.png");
        background-position:center center;
        background-repeat:no-repeat;
        background-color:#b9f7db;
        p{
            justify-self:end;
            align-self:flex-end;
            margin-top:10px;
            width:60%;
            line-height:1.5;
            span{
                color:#e74c3c;
            }
        }
    }

    &:nth-child(5){
        background-image:url("https://usecloud.s3-ap-northeast-1.amazonaws.com/pokmonImages/%ED%8C%8C%EC%9D%B4%EB%A6%AC.png");
        background-position:center center;
        background-repeat:no-repeat;
        background-color:#fbcf9a;
        p{
            align-self:flex-start;
            justify-self:start;
            margin-top:10px;
            width:60%;
            line-height:1.5;
            span{
                color:#e74c3c;
            }
        }
    }

    &:nth-child(6){
        background-image:url("https://usecloud.s3-ap-northeast-1.amazonaws.com/pokmonImages/%ED%91%B8%EB%A6%B0.png");
        background-position:bottom;
        background-repeat:no-repeat;
        background-color:#fde9f2;
        p{
            align-self:flex-start;
            margin-top:10px;
            width:60%;
            line-height:1.5;
            span{
                color:#e74c3c;
            }
        }
        
    }

    &:nth-child(7),&:nth-child(1){
        background-image:url("https://usecloud.s3-ap-northeast-1.amazonaws.com/pokmonImages/%EC%9E%A0%EB%A7%8C%EB%B3%B4.png");
        background-position:center center;
        background-repeat:no-repeat;
        background-color:#84a89f;
        position:relative;
        p{
            font-size:15px;
            justify-self:start;
            
        }
        
        .Info{
            width:35%;
            color:black;
            position:absolute;
            bottom:10px;
            right:0;
            font-size:20px;
            color:white;
         
        }
    }



`;

const ItemWrapper =styled.div`
font-size:15px;
font-weight:600;
display:grid;
grid-template-rows:repeat(9,1fr);
gap:5px;
    div{
        display:grid;
        grid-template-columns:1fr 10fr;
        color:black;
        img{
            width:40px;
            height:40px;
        }
        span{
            span{
                color:#e74c3c;

            }
        }
    }


`;

const IconWrapper = styled.div`
    position:fixed;
    bottom:60px;
    left:50%;
    transform:translateX(-50%);
    width:150px;
    height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
`;



const Doc=()=>{
    const [windowSize,setWindow]=useState(window.innerWidth);
    const [page,setPage]=useState(1);
    const [itemWidth,setItem]=useState();
    const [sliderWidth,setSlider]=useState();
    const [windowX,setWindowPosition]=useState(window.innerWidth);
    const slider=useRef();
    const item=useRef();
    
    
    const scrollSpeeder = (where)=>{
        let start=Math.floor(window.scrollX);
        let init =Math.floor(window.scrollX);
        if(where === "right"){
            const rightSpeeder=setInterval(()=>{
                start +=Math.ceil(itemWidth/6);
                window.scrollTo(start,0);
                setWindowPosition(start);
             if(start+5>=init + itemWidth ){     
                clearInterval(rightSpeeder);
             }
           },15); 
        }
        else{
           
           const leftSpeeder=setInterval(()=>{
                start -=Math.ceil(itemWidth/6);
              window.scrollTo(start,0);
              setWindowPosition(start);
              if(start-5 <=init-itemWidth){ 
                  clearInterval(leftSpeeder);
            }
           },15); 
        }
    }

    

    
    const handleLeftClick=()=>{
        if(slider.current){

            if(window.scrollX !==0 && page !==1){
                scrollSpeeder("left");
                setPage(x=>x-1);
            }
            else if(page === 1){
                scrollSpeeder("left");
                setPage(6);
            }
        }
    }

    const handleRightClick=()=>{
        if(slider.current){
            if(window.scrollX < sliderWidth - itemWidth && page !== 6){
                    scrollSpeeder("right");
                    setPage(x=>x+1);
            }else if(page ===6){
                    scrollSpeeder("right");
                    setPage(1);
            }
        }
    }

    const handleScroll=()=>{
        setWindow(window.innerWidth);
        // 화면 사이즈를 늘릴때마다 크기 조정해줘야한다.  그리고 그 위치에 가만히 있어야 한다.
        setItem(Math.floor(item.current.offsetWidth));
        setSlider(Math.floor(slider.current.scrollWidth));
    }

    useEffect(()=>{
        if(item.current && slider.current){
            setItem(Math.floor(item.current.offsetWidth));
            setSlider(Math.floor(slider.current.scrollWidth));
             //window.scrollTo(itemWidth,0);
            //setWindowPosition(itemWidth);
            window.addEventListener("resize",handleScroll);        
            return ()=>window.removeEventListener("resize",handleScroll);    
        }    
    
    },[]);

    useEffect(()=>{
        window.scrollTo(window.innerWidth,0);
        setWindowPosition(window.innerWidth,0);
    },[])
    useEffect(()=>{
        
        if(slider.current){
            window.scrollTo(windowX,0);
         
        if(windowX >= 7*itemWidth-5){
            setTimeout(()=>window.scrollTo(itemWidth,0),30); // 페이지가 6페이지에 왔을때 슬쩍 바꿔치기 해준다.
            setWindowPosition(itemWidth);
        }
        if(windowX <=1){
            setTimeout(()=>window.scrollTo(sliderWidth -2*itemWidth,0),30);
            setWindowPosition(sliderWidth -2*itemWidth);
        }
    }

    },[windowX]);
    
    useEffect(()=>{
        setWindowPosition(page * windowSize);
    },[windowSize])




return (<>
    {windowSize > 810 ? <LongMenu></LongMenu> :<FixedWrapper><Menu></Menu></FixedWrapper>}
    <Container windowSize={windowSize} ref={slider}>
    <Section>
        <h1>CopyRight</h1>
        <p>
        포켓몬 아이콘 
        아이콘 제작자 <a href="https://www.flaticon.com/kr/authors/roundicons-freebies" title="Roundicons Freebies">Roundicons Freebies</a> from <a href="https://www.flaticon.com/kr/" title="Flaticon"> www.flaticon.com</a>
        <br/><br/>
        물결 아이콘
        <a href='htttps://.pngtree.com/so/깨끗한-물'>깨끗한 물 png에서 pngtree.com</a>
        <br/><br/>
        구름 아이콘
        <a href='htttps://.pngtree.com/so/수채화'>수채화 png에서 pngtree.com</a>
        <br/><br/>
        구름 아이콘2
        <a href='htttps://.pngtree.com/so/skysky'>skysky png에서 pngtree.com</a>
        <br/><br/>
        종이비행기
        <a href="https://kr.lovepik.com/images/png-the-plane.html">비행기 Png vectors by Lovepik.com</a>
        <br/><br/>
        번개 아이콘
        <a href="https://kr.lovepik.com/images/png-1553307419904.html">나뭇 가지 번개 Png vectors by Lovepik</a>
        <br/><br/>
        불꽃 아이콘
        <a href="https://kr.lovepik.com/images/png-tobacco.html">담배 Png vectors by Lovepik.com</a>
        <br/><br/>
        보스맵 기둥 아이콘
        <a href='htttps://.pngtree.com/so/흰색'>흰색 png에서 pngtree.com</a>
        <br/><br/>
        보스맵 아치 기둥 아이콘
        <a href='htttps://.pngtree.com/so/기둥'>기둥 png에서 pngtree.com</a>
        <br/><br/>
        수평선 배경 
        <a href='https://kr.freepik.com/photos/background'>Background 사진는 4045 - kr.freepik.com가 제작함</a>
        <br/><br/>
        하늘 배경
        <a href='https://kr.freepik.com/photos/background'>Background 사진는 jannoon028 - kr.freepik.com가 제작함</a>
        <br/><br/>
        
        숲맵 배경
        <a href='https://kr.freepik.com/photos/light'>Light 사진는 wirestock - kr.freepik.com가 제작함</a>
        <br/><br/>
        얼음맵 배경
        <a href='https://kr.freepik.com/photos/background'>Background 사진는 jannoon028 - kr.freepik.com가 제작함</a>
        <br/><br/>
        전기맵 배경
        <a href='https://kr.freepik.com/photos/water'>Water 사진는 jcomp - kr.freepik.com가 제작함</a>
        <br/> <br/>
        포켓몬 캐릭터 https://projectpokemon.org/ 
        </p>
        <p className="Info">
             Thank you, have fun with it. and please send message <br/> if you find some error  or have some question.<br/><br/>
             auddnjs2008@naver.com <br/><br/>
             Made by Kim myeoung won
        </p>
    </Section>
    <Section ref={item}>
        <h1>Pokemon</h1>
        <p>
            This Game Pokemons are <span>1st Generation Pokemon</span> and  plused Mega Evolution, Alola Pokemon.

        </p>
    </Section>
    <Section>
        <h1>Item</h1>
        <ItemWrapper>
            <div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokeball.png"/><span>You can <span>catch Pokemon</span> by using this. You can use this Item in Battle</span></div>
            <div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/potion.png"/><span>You can <span>hill Pokemon</span> by using this. On My Bag Page, You can use this Item</span></div>
            <div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/razz-berry.png"/><span>You can <span>catch Pokemon</span> easily by using this. You can use this Item in Battle</span></div>
            <div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/incense.png"/><span>You can <span>meet more Pokemons in game map</span> by using this. This Item can be used in the map.</span></div>
            <div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/egg-incubator.png"/><span><span>If you have Pokemon Egg, Then you can use this Item.</span> In the map, whenever you move, then Incubator walking number is updated</span></div>
            <div><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/candy.png"/><span>This Item is used to <span>evolve into General Next step Pokemon</span></span></div>
            <div><img src={Mega}/><span>This Item is used to evolve into Mega Pokemon or MegaX Pokemon or MegaYPokemon(MegaX or MegaY is Random). you can only use this Item for Pokemon that has <span>Mega Evolution</span> </span></div>
            <div><img src={Alola}/><span>This Item is used to turning into Alola Pokemon. you can only use this Item for Pokemon that has <span>Alola Step</span></span></div>
            <div><img src={Color}/><span>This Item is used to <span>change Color.</span> you can use this Item for all Pokemon </span></div>
        </ItemWrapper>
    </Section>
    <Section>
        <h1>My Pokemon</h1>
        <p>
           On this Page, you can confirm pokemon that you caught.  And  you can set Battle Pokemons. <span> if you don't set Battle Pokemon,
           you can't fight pokemon in the game map.</span>  you can set Battle Pokemon by pressing Change off Button.  
           In Change Off state, if you press your Pokemon, you can confirm detail Page.  In Change On state, if you press your Pokemon, you can
           set Battle Pokemon.
           Clear Button is used to clear battlePokemons 

        </p>
    </Section>
    <Section>
        <h1>Game Map</h1>
        <p>
            There are 5 general Map  and 4 Boss Map. In each general Map,  you can catch Each Type Pokemon.
            BossMap has Special Color. 
            In each Boss Map,  you can catch Regend Pokemon. But Please be careful. Their Cp is very high.
            And <span>If you use Incense Item  in each map(include bossmap), you can see many Pokemon that has Type fitting in Map</span>   
        </p>
    </Section>
    <Section>
        <h1>Attack Calculating</h1>
        <p>
           Every Pokemon  has 100 HP.  And  our Game System  calculated Damege using Cp and Type Damege.
           <span>General attack Damege is 10.</span>
           The Pokemon that has higher Cp than opposite pokemon  has more Damege   (higerPokemon CP) / (opposite Pokemon Cp).
           we called this Damege  CpDamege.  <span>CpDamege = (higerPokemon CP) / (opposite Pokemon Cp).</span>
           That is, (10 + CpDamege) except Type Damege;
           The Type Damege is same as  general Other Pokemon game(Pokemon Go.. etc). 
           So The Damege is  like this. <span>(10 + CpDamege(if Cp is higher)) * Type Damege ratio.</span>

        </p>
    </Section>
    <Section>
        <h1>CopyRight</h1>
        <p>
        포켓몬 아이콘 
        아이콘 제작자 <a href="https://www.flaticon.com/kr/authors/roundicons-freebies" title="Roundicons Freebies">Roundicons Freebies</a> from <a href="https://www.flaticon.com/kr/" title="Flaticon"> www.flaticon.com</a>
        <br/><br/>
        물결 아이콘
        <a href='htttps://.pngtree.com/so/깨끗한-물'>깨끗한 물 png에서 pngtree.com</a>
        <br/><br/>
        구름 아이콘
        <a href='htttps://.pngtree.com/so/수채화'>수채화 png에서 pngtree.com</a>
        <br/><br/>
        구름 아이콘2
        <a href='htttps://.pngtree.com/so/skysky'>skysky png에서 pngtree.com</a>
        <br/><br/>
        종이비행기
        <a href="https://kr.lovepik.com/images/png-the-plane.html">비행기 Png vectors by Lovepik.com</a>
        <br/><br/>
        번개 아이콘
        <a href="https://kr.lovepik.com/images/png-1553307419904.html">나뭇 가지 번개 Png vectors by Lovepik</a>
        <br/><br/>
        불꽃 아이콘
        <a href="https://kr.lovepik.com/images/png-tobacco.html">담배 Png vectors by Lovepik.com</a>
        <br/><br/>
        보스맵 기둥 아이콘
        <a href='htttps://.pngtree.com/so/흰색'>흰색 png에서 pngtree.com</a>
        <br/><br/>
        보스맵 아치 기둥 아이콘
        <a href='htttps://.pngtree.com/so/기둥'>기둥 png에서 pngtree.com</a>
        <br/><br/>
        수평선 배경 
        <a href='https://kr.freepik.com/photos/background'>Background 사진는 4045 - kr.freepik.com가 제작함</a>
        <br/><br/>
        하늘 배경
        <a href='https://kr.freepik.com/photos/background'>Background 사진는 jannoon028 - kr.freepik.com가 제작함</a>
        <br/><br/>
        
        숲맵 배경
        <a href='https://kr.freepik.com/photos/light'>Light 사진는 wirestock - kr.freepik.com가 제작함</a>
        <br/><br/>
        얼음맵 배경
        <a href='https://kr.freepik.com/photos/background'>Background 사진는 jannoon028 - kr.freepik.com가 제작함</a>
        <br/><br/>
        전기맵 배경
        <a href='https://kr.freepik.com/photos/water'>Water 사진는 jcomp - kr.freepik.com가 제작함</a>
        <br/> <br/>
        포켓몬 캐릭터 https://projectpokemon.org/ 
        </p>
        <p className="Info">
             Thank you, have fun with it. and please send message <br/> if you find some error  or have some question.<br/><br/>
             auddnjs2008@naver.com <br/><br/>
             Made by Kim myeoung won
        </p>
    </Section>
    <Section>
        <h1>Pokemon</h1>
        <p>
            This Pokemon is 1st Generation Pokemon and  plused Mega Evolution, Alola Pokemon.

        </p>
    </Section>
    </Container>
    <IconWrapper>
        <FontAwesomeIcon onClick={handleLeftClick} icon={faArrowLeft} size="2x"/> {page} / 6   <FontAwesomeIcon  onClick={handleRightClick} icon={faArrowRight} size="2x"/>
    </IconWrapper>


    </>)

}

export default Doc;