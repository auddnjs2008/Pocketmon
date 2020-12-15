import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import pokemon from "pokemon-go-pokedex";


const EggWrapper = styled.div`

width:300px;
height:300px;
display:flex;
justify-content:center;
align-items:center;
position:relative;
z-index:5;
img{
        width:auto;
        height:auto;
        min-width:80px;
        min-height:80px;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        &:nth-child(1){
            max-width:100px;
            max-height:100px;
            @keyframes evolve{
                0%{
                    z-index:1;
                }
                100%{
                   opacity:0;
                }
            }
            animation:evolve 1s linear forwards;
            animation-iteration-count:5;
        }
        &:nth-child(2){
            transform-origin:center;
            transform:scale(1.5,1.5) translate(-50%,-50%);
            @keyframes evolvee{
                0%{
                    opacity:0;
                }
                100%{
                   opacity:1;
                }
            }
            animation:evolvee 1s linear forwards;
            animation-iteration-count:5;
        }
    }

`;






const EggContainer =({information})=>{
    let commonUrl = "https://projectpokemon.org/images/normal-sprite/";
    let shinyUrl = "https://projectpokemon.org/images/shiny-sprite/";
    
    let commonBackUrl = "https://projectpokemon.org/images/sprites-models/normal-back/";
    let shinyBackUrl = "https://projectpokemon.org/images/sprites-models/shiny-back/";

    let myPokemons =JSON.parse(localStorage.getItem("myPoketmon"));
    // 랜덤 포켓몬 처리
    const poketmon =pokemon.pokemon; 
    let changeNum = Math.floor(Math.random()*(151-1))+1;
    let smallName;
    let hatchPokemon;

 
    // 이 이름은 예외처리
    if( poketmon[changeNum-1].name==="Articuno" || poketmon[changeNum-1].name==="Zapdos" || poketmon[changeNum-1].name==="Moltres"
       || poketmon[changeNum-1].name === "Mewtwo" || poketmon[changeNum-1].name === "Mew"
    ){
        changeNum =Math.floor(Math.random()*(151-1))+1;
    }

    // 일반 알과 특별알 구분 해주어야 한다.
    if(information.name === "Egg")
        hatchPokemon = (poketmon[changeNum-1].prev_evolution ? 
            poketmon.filter(item => item.num === poketmon[changeNum-1].prev_evolution[0].num): [poketmon[changeNum-1]])[0];
    else        
        hatchPokemon = poketmon[changeNum-1];   // 특별알은 진화된  아이들도 모두 나오게 해준다.      



    //예외처리 (nidran (female) , nidoran (male)은 안찾아진다. ,)
    if(hatchPokemon.name.includes("female"))
        smallName ="nidoran_f";
    else if(hatchPokemon.name.includes("male"))
        smallName="nidoran_m";
    else if(hatchPokemon.name === "Farfetch'd")
        smallName="farfetchd";
    else if(hatchPokemon.includes("Mime"))
        smallName="mr._mime";    
    else
        smallName = hatchPokemon.name.toLowerCase();
            
    hatchPokemon ={...hatchPokemon,myId:myPokemons.length+1,cp:Math.floor(Math.random()*(900-100))+100,health:100,  commonUrl:commonUrl+smallName+".gif", commonBackUrl:commonBackUrl + smallName+".gif",shinyUrl:shinyUrl+smallName+".gif",
    shinyBackUrl:shinyBackUrl+smallName+".gif",color:0}
    
    if(smallName.includes("nidoran") || smallName.includes("mime") || smallName.includes("fetchd")){
        delete hatchPokemon.name;
        hatchPokemon["name"] = smallName;
        if(smallName.includes("mime")){
            hatchPokemon.commonBackUrl = commonBackUrl + "mr._mime" +".gif";
            hatchPokemon.shinyUrl =shinyUrl+"mr._mime"+".gif";
            hatchPokemon.shinyBackUrl =shinyBackUrl+"mr._mime" +".gif";
        }
    }        



    myPokemons.push(hatchPokemon);

    localStorage.setItem("myPoketmon",JSON.stringify(myPokemons));
    
    
             
    return <EggWrapper>
        <img src={information.img}/>
        <img src={hatchPokemon.commonUrl}/>
    </EggWrapper>
}

export default EggContainer;

EggContainer.propTypes={
    information:PropTypes.object
}