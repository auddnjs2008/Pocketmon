import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Menu from "../../Components/Menu";
import LongMenu from "../../Components/LongMenu";
import Evolve from "../../../src/Evolve";


const Container=styled.div`
    width:100%;
    background-color:rgba(20,20,20,0.7);
    margin-top:${props=>props.windowSize >810 ? "70px" :"0px"};
    height:${props=>props.windowSize>810 ? "90%" :"180%"};
    display:grid;
   //grid-template-rows:0.5fr 0.5fr 1fr;
   grid-template-columns:${props=>props.windowSize >810 ? "0.4fr 0.5fr 1.5fr" :""};
   grid-template-rows:${props=>props.windowSize <= 810 ? "0.4fr 0.5fr 1fr" : ""};
   padding:20px 10px;
   position:absolute;
   top:0;

`;

const ImgWrapper=styled.div`
    img{
        width:auto;
        height:auto;
          
    }
    
    display:grid;
    grid-template-rows:${props=>props.windowSize >810 ? "repeat(5,110px)" :""};
    grid-template-columns:${props=>props.windowSize<=810 ? "repeat(5,110px)":""};
    align-items:center;
    justify-items:center;
    padding:20px;
`;
const InfoBox = styled.ul`
    font-weight:600;
    padding:10px;
    font-size:20px;
    gap:5px;
   
    display:grid;
    grid-template-rows:${props=>props.windowSize>810? "repeat(9,50px)" :"repeat(9,50px)"};
    grid-template-columns:${props=>props.windowSize <=810 ?"repeat(1,0.5fr)" :"" };
    align-self:center;
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


const EvolveBox= styled.div`
    margin-top:20px;    
    display:grid;
    grid-template-rows:50px 50px 1fr 1fr;
    h1{
        font-weight:700;
        text-align:center;
        color:white;
    }
`;

const EvolveTitle= styled.div`
   background-color:black;
    display:grid;
    grid-template-columns:${props => props.common ? `repeat(${props.common+4},minmax(120px,1fr))` : ""};
    gap:5px;
    //border: 1px solid white;
    font-size:18px;
    font-weight:600;
    div{
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;

    &:nth-child(2){
       background:linear-gradient(to right,yellow,#f0932b); 
    }
    &:nth-child(3){
        background:linear-gradient(to right,#f0932b,#273c75);
        color:white;
    }    
    &:nth-child(4),&:nth-child(5){
        background-color:#273c75;
        color:white;
    }
    }
    
`;

const CommonTitle = styled.div`
    background:linear-gradient(to right,#ffffff ,yellow );
    grid-column:span ${props => props.common};
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;

`;

const CommonBox = styled.div`
   // border: 1px solid white;
    display:grid;
    grid-template-columns:${props =>   props.common ? `repeat(${props.common+4},minmax(120px,1fr))` : ""};
    align-items:center;
    justify-items:center;
  
`;




const DetailPresenter= ({pokemon,commonLength,windowSize})=>{
   
    const smallName = pokemon.name.toLowerCase();
    const {megaPokemon, alolaPokemon,megaXYPokemon,urlSearch,googleProxyURL}=Evolve; // url(smallName).commonUrl 이런식으로 쓸수있다.


    // 진화과정을 한 배열에 담아야 한다. 
    //현재 포켓몬 url (mime은 데이터 오률상 mr.mime으로 수정 -> 원래는 mr._mime)
    const nowCommonUrl = smallName === "mr._mime" ? urlSearch.commonUrl("mr.mime") : urlSearch.commonUrl(smallName);
    
    const nowShinyUrl = urlSearch.shinyUrl(smallName);


    // prev evolutoin  next evolution 이 배열일 수도 있고, 없을수도있다.
    let prevEvolution;
    if(pokemon.name !== "Dragonair" && pokemon.name !== "Dragonite")
        prevEvolution = pokemon.prev_evolution ? pokemon.prev_evolution.map(item=>{
            let result;
            if(item.name.toLowerCase() === "nidoran(female)") result= "nidoran_f";
            else if(item.name.toLowerCase() === "nidoran(male)") result= "nidoran_m";
            else result = item.name.toLowerCase();
        
            return result;
    }) : "";
    else if(pokemon.name === "Dragonair")
        prevEvolution = ["dratini"];
    else if(pokemon.name==="Dragonite")
        prevEvolution=["dratini","dragonair"];
    

    const nextEvolution = pokemon.next_evolution ? pokemon.next_evolution.map(item =>item.name.toLowerCase()) : "";
    
    const prevCommonUrls = prevEvolution ? prevEvolution.map(item=>urlSearch.commonUrl(item)) : "";
    const prevShinyUrls = prevEvolution ? prevEvolution.map(item=>urlSearch.shinyUrl(item)) : "";
    
    const nextCommonUrls = nextEvolution ? nextEvolution.map(item=>urlSearch.commonUrl(item)) : "";
    const nextShinyUrls = nextEvolution ? nextEvolution.map(item=>urlSearch.shinyUrl(item)) : "";

    console.log(prevCommonUrls);
    console.log(nextCommonUrls);
    // 마지막 진화 포켓몬 이름
    const finalPokeName = nextEvolution ? nextEvolution[nextEvolution.length-1] : smallName;
    

    // 그리고 메가 진화 도 포함 (다른 사이트에서 gif 유무를 판단해야 한다.)
    
    const megaCommonUrl =urlSearch.megaUrl(finalPokeName) ? urlSearch.megaUrl(finalPokeName).megaCommonUrl : "";
    
    const megaShinyUrl = urlSearch.megaUrl(finalPokeName)? urlSearch.megaUrl(finalPokeName).megaShinyUrl : "";

    
    // alora 진화? 도 포함 
    
    const aloraCommonUrl = urlSearch.alolalUrl(finalPokeName) ? urlSearch.alolalUrl(finalPokeName).alolaCommonUrl : "";
 
    const aloraShinyUrl = urlSearch.alolalUrl(finalPokeName) ? urlSearch.alolalUrl(finalPokeName).alolaShinyUrl : "";

    //mega 진화 아니면 megax 와 megay가 있다.

    const megaXCommonUrl = urlSearch.megaXUrl(finalPokeName) ? urlSearch.megaXUrl(finalPokeName).megaXCommonUrl : "";
    const megaXShinyUrl = urlSearch.megaXUrl(finalPokeName) ? urlSearch.megaXUrl(finalPokeName).megaXShinyUrl : "";
    const megaYCommonUrl = urlSearch.megaYUrl(finalPokeName) ? urlSearch.megaYUrl(finalPokeName).megaYCommonUrl : "";    
    const megaYShinyUrl = urlSearch.megaYUrl(finalPokeName) ? urlSearch.megaYUrl(finalPokeName).megaYShinyUrl : "";


    // commonUrl과 shinyUrl배열 만들자 [일반진화, 알로라진화, 메가진화]
    let commonEvolveUrl = [...prevCommonUrls,nowCommonUrl,...nextCommonUrls,aloraCommonUrl, megaCommonUrl,megaXCommonUrl,megaYCommonUrl];
    let shinyEvolveUrl = [...prevShinyUrls,nowShinyUrl,...nextShinyUrls,aloraShinyUrl,megaShinyUrl,megaXShinyUrl,megaYShinyUrl];
    console.log(commonEvolveUrl);
    //mr.mime  데이터 오류처리   일반만 mr.mime  나머지는 mr._mime
    if(smallName === "mr._mime"){
        commonEvolveUrl[0]=urlSearch.commonUrl("mr.mime");
    }
 

    return(
    <>
    {windowSize > 810 ? <LongMenu></LongMenu> : <Menu></Menu>}
    <Container windowSize={windowSize}>
        <ImgWrapper windowSize={windowSize}>
            <img src={nowCommonUrl} />
            <img src={urlSearch.commonBackUrl(smallName)}/>
            <img src={pokemon.pokeGif}/>
            <img src={nowShinyUrl}/>
            <img src={urlSearch.shinyBackUrl(smallName)}/>
        </ImgWrapper>
        <InfoBox windowSize={windowSize}>
            <li><span className="liTitle">Name</span> <span>{pokemon.name}</span></li>
            <li><span className="liTitle">Type</span> <span>{pokemon.type.map(item=><span>{item}</span>)}</span></li>
            <li><span className="liTitle">Height</span> <span>{pokemon.height}</span></li>
            <li><span className="liTitle">Weight</span> <span>{pokemon.weight}</span></li>
            <li><span className="liTitle">Candy</span> <span>{pokemon.candy}</span></li>
            <li><span className="liTitle">Candy_count</span> <span>{pokemon.candy_count}</span></li>
            <li><span className="liTitle">Egg</span> <span>{pokemon.egg}</span></li>
            <li><span className="liTitle">Multiplier</span> <span>{typeof pokemon.multipliers === "number" ? pokemon.multipliers : (pokemon.multipliers === null ? "" :pokemon.multipliers.map(item=><span>{item}</span>))}</span></li>
            <li><span className="liTitle">Weakenss</span> <span>{pokemon.weaknesses.map(item=><span>{item}</span>)}</span></li>
        </InfoBox>

        <EvolveBox windowSize={windowSize}>
            <h1>Evolutionary process</h1>
            <EvolveTitle common={commonLength}>
                <CommonTitle common={commonLength}>General evolution</CommonTitle>
                <div>Alola Evolution</div>
                <div>Mega Evolution</div>
                <div>MegaX Evolution</div>
                <div>MegaY Evolution</div>
            </EvolveTitle>
            <CommonBox  windowSize={windowSize} common={commonLength}>
               {commonEvolveUrl.map(item=>item !== undefined ? <img src={item} /> :<img></img> )} 
            </CommonBox>
            <CommonBox  windowSize={windowSize} common={commonLength}>
               {shinyEvolveUrl.map(item=>item !== undefined ? <img src={item} /> : <img></img> )} 
            </CommonBox>
        </EvolveBox>
    </Container>
    </>
    )
}

export default DetailPresenter;


DetailPresenter.propTypes={
    pokemon:PropTypes.object,
    commonLength:PropTypes.number,
    windowSize:PropTypes.number
}