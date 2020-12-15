import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import pokemon from "pokemon-go-pokedex";
import movePoke from "pokedex";
const pokedex = new movePoke();
//console.log(pokedex.pokemon('cubone'));
// 대문자 -> 소문자  글자.toLoverCase();


const ImageWrapper = styled.div`
    position:absolute;
    display:flex;
    justify-content:center;
    align-items:center;
    bottom:0;
    width: 500px;
   height:500px;
   background-image:url("https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokeball.png"); 
   background-size:cover;
   background-position:center center;
   transform-origin:bottom;
   @keyframes poketball {
    
        0%{
           transform:rotate(25deg); 
        }
        25%{
            transform:none;
        }
        50%{
            transform:rotate(-25deg);
        }
        75%{
            transform:none;
        }
        100%{
            transform:rotate(25deg);
        }
   } 
   
   &.start{
       animation:poketball 2s linear infinite;
   }
`;

const Container = styled.div`
    margin:0 auto;
    position:relative;
    width:500px;
    height:500px;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
   
`;

const Info = styled.h1`
    width:100%;
    text-align:center;
`;
const Button = styled.button`
    all:unset;
    text-align:center;
    width:100px;
    height:100px;
    border-radius:50%;
    background-color:white;
    font-size:30px;
    font-weight:600;
    &:hover{
        transform:scale(1.1,1.1);
    }
    transition:transform 0.1s linear;
    transform-origin:bottom;
    @keyframes buttonColor{
        0%{
                     
        }
        100%{
            background-color:#ff7979;
          
        }
    }   
    &.click{
        animation:buttonColor 1s linear infinite;
    } 
`;





const GetPokemon = ({setPokemon}) =>{
    let changeNum=1;
    let turn=0;
    const Cp = Math.floor(Math.random()*(900-100))+100;
    let RandomNum;
    let Random;
    let myPoketmon;
    const poketmon = pokemon.pokemon;
    let commonUrl = "https://projectpokemon.org/images/normal-sprite/";
    let shinyUrl = "https://projectpokemon.org/images/shiny-sprite/";
    
    let commonBackUrl = "https://projectpokemon.org/images/sprites-models/normal-back/";
    let shinyBackUrl = "https://projectpokemon.org/images/sprites-models/shiny-back/";
    
    const [num,setNum]=useState(1);
    
    const settingNumber = ()=>{
        if(changeNum === 151){
            changeNum=1;
            turn=1;
        }else
        changeNum++;
        setNum(changeNum);
        
        if(changeNum === Random && turn === 1) {
            clearInterval(RandomNum);
            //전설포켓몬이랑 희귀포켓몬은 제외 시킨다. 
            if(poketmon[changeNum-1].name === "Articuno" || poketmon[changeNum-1].name === "Zapdos" || poketmon[changeNum-1].name === "Moltres"
                || poketmon[changeNum-1].name === "Dragonite" || poketmon[changeNum-1].name === "Mewtwo" || poketmon[changeNum-1].name === "Mew"
                || poketmon[changeNum-1].name === "Gyarados"
            ){
               changeNum =Math.floor(Math.random()*(151-1))+1;
            }
            // //테스트 코드            
            // changeNum =poketmon.filter(item=>item.name.includes("Female"))[0].id;
            
            myPoketmon= poketmon[changeNum-1].prev_evolution ? 
                poketmon.filter(item => item.num === poketmon[changeNum-1].prev_evolution[0].num): [poketmon[changeNum-1]];
            // const pokeGif = pokedex.pokemon(myPoketmon[0].name.toLowerCase()).sprites.animated;
            // let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
            let smallName;

            //예외처리 (nidran (female) , nidoran (male)은 안찾아진다. ,) //Mr. mime ->mr.mime ,farfetchd
            if(myPoketmon[0].name.includes("female"))
                smallName ="nidoran_f";
            else if(myPoketmon[0].name.includes("male"))
                smallName="nidoran_m";
            else if(myPoketmon[0].name.includes("Mime"))
                smallName ="mr.mime";
            else if(myPoketmon[0].name.includes("fetch'd"))
                smallName="farfetchd";    
            else
                smallName = myPoketmon[0].name.toLowerCase();
            
            let local =    [{...myPoketmon[0],myId:1,cp:Cp,health:100,
                commonUrl:commonUrl+smallName+".gif", commonBackUrl:commonBackUrl + smallName+".gif",shinyUrl:shinyUrl+smallName+".gif",
                shinyBackUrl:shinyBackUrl+smallName+".gif",color:0
                }];
            
            if(smallName.includes("nidoran") || smallName.includes("mime") || smallName.includes("fetchd")){
                delete local[0].name;
                local[0]["name"] = smallName;
                if(smallName.includes("mime")){
                    local[0].commonBackUrl = commonBackUrl + "mr._mime" +".gif";
                    local[0].shinyUrl =shinyUrl+"mr._mime"+".gif";
                    local[0].shinyBackUrl =shinyBackUrl+"mr._mime" +".gif";
                }
            }

            localStorage.setItem("myPoketmon",JSON.stringify(local));
           
            setPokemon(local);
        
            // 처음 시작할때  돈을 1000개 정도 준다.

            localStorage.setItem("myBag",JSON.stringify({"money":1000}));
            localStorage.setItem("battlePokemons",JSON.stringify([]));
            localStorage.setItem("myEggs",JSON.stringify([]));
        }
    
    
    }

    useEffect(()=>{
        Random= Math.floor(Math.random()*(151-1))+1;
    },[]);

    const handleClick =(e)=>{
         RandomNum=setInterval(settingNumber,50);
         const ball = document.querySelector(".ball");
         e.target.innerHTML="";
         e.target.classList.add("click");
         ball.classList.add("start");   
    }

return(
    <>
    <Container>
        <ImageWrapper className="ball">
            <Button onClick={handleClick}>Start</Button>
        </ImageWrapper>
    </Container>
    <Info>To get Pokemon, Please press Start Button</Info>
    </>
    )
};


export default GetPokemon;

GetPokemon.propTypes={
    setPokemon:PropTypes.func
}