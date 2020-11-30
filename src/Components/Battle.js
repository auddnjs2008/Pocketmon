import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";
import Grass from "../../src/풀.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import PokeDex from "pokemon-go-pokedex";


const BattleEffect = styled.div`
    width:100%;
    height:100vh;
    position:absolute;
    top:0;
    z-index:3;
    display:flex;
    justify-content:center;
    align-items:center;

    @keyframes battle{
        0%{
           opacity:1;
           background-color:black; 
        }
        25%{
            opacity:0;
        }
        50%{
            opacity:1;
            background-color:black;
        }
        100%{
            opacity:0;
        }

    }
animation : battle 3s linear forwards;
`;

const BattleContainer=styled.div`
    position:absolute;
    background-color:white;
    top:0;
    
    z-index:3;
    /* width:100%;
    height:100%; */
    @keyframes  battleWindow{
        0%{
            width:0;
            height:0;
        }
        100%{
            width:100%;
            height:100%;
        }
    }

    animation: battleWindow 2s linear forwards;
`;

const BattleNavi = styled.div`
    margin:0 auto;
    width:90%;
    height:150px;
    border:1px solid black; 
    
    ul{
        width:100%;
        height:inherit;
        position:relative;
        display:flex;
        flex-direction:column;
        justify-content:space-around;
        align-items:center;
        font-size:20px;
        font-weight:600;
        img{
            width:50px;
            height:50px;
        }
    
        li{
            width:100%;
            height: 50px;
            display:flex;
            justify-content:center;
            align-items:center;
        }
    }
`;
const Attack = styled.li`
 

`;
const Run = styled.li``;
const Bag=styled.li`

`;

const Change=styled.li``;


const BattlePokmons = styled.div`
position:relative;
 width:100%;
 height:70%;

 perspective:500px;
 perspective-origin:top right;   
 .field{
    
    position:fixed;
    left:30%;
    bottom:20%;
    width:60%;
    height:100%;
    border: 1px solid green;
    background-color:green;
    transform:rotateX(87deg) rotateZ(10deg);

 }
 img{
     width:150px;
     height:150px;
     object-fit:contain;
 }
`;

const Physical=styled.div`
        height:15px;
        width:${props=>props.physical ? `${props.physical * 150 /100}px` : "0px"};
        background-color:#ff7979;
`;
const MonsterWrapper =styled.div`



    div.physical1, div.physical2{
        width:150px;
        height:15px;
        background-color:#dfe6e9;
        position:absolute;
        bottom:60%;
        left:20%;
        margin-bottom:20px;
        
        
    }

    div.physical1{
        bottom:unset;
        left:unset;
        top:0;
        right:20%;
        margin:20px 0;
    }




`;


const BattleMonster = styled.img`
    position:absolute;
    top:30px;
    right:20%;

`;

const MyMonster = styled.img`
    position: absolute;
    bottom:30%;
    left:20%;
`;


const Battle =({battleIndex,pokemons,setBattle,battleon,setRun,pokemonsCp})=>{

    setBattle(1);
    let myPokemons=JSON.parse(localStorage.getItem("myPoketmon"));
    const battlePokmon = PokeDex.pokemon[pokemons[battleIndex[0]].id-1];
    const battlePokmonName = battlePokmon.name.toLowerCase();
    const myBag = JSON.parse(localStorage.getItem("myBag"));
    let commonUrl = "https://projectpokemon.org/images/normal-sprite/";
    let shinyUrl = "https://projectpokemon.org/images/shiny-sprite/";
    let commonBackUrl = "https://projectpokemon.org/images/sprites-models/normal-back/";
    let shinyBackUrl = "https://projectpokemon.org/images/sprites-models/shiny-back/";
    const menu =useRef();
    const myMonster = useRef();
    const [battlePhysical,setPhysical]=useState(100);
    const [myPhysical,setMyPhysical]=useState();
    const [initList,setInit]=useState();
    const [list,setList]=useState();
    const [listIndex,setIndex]=useState(0); 
   
    

    const catchPokemon=()=>{
        const catchPokemon = {...battlePokmon, cp:pokemonsCp[battleIndex[0]],health:100,myId:myPokemons.length+1, commonUrl:commonUrl+battlePokmonName+".gif", commonBackUrl:commonBackUrl + battlePokmonName+".gif",shinyUrl:shinyUrl+battlePokmonName+".gif",
        shinyBackUrl:shinyBackUrl+battlePokmonName+".gif"};
        myPokemons.push(catchPokemon);
        localStorage.setItem("myPoketmon",JSON.stringify(myPokemons));
    }

  
    //catchPokemon();

    const InitWindowEnter=(item)=>{ // 초기하면 리스트에서  목록을고르고  엔터나 스페이스바 누를경우
        
        
        item.style.backgroundColor="";
        


        if(item.className.includes("attack")){
            //*** 공격했을 경우  얼마나 달지 계산해주는 코드 작성 필요  */
            setPhysical(battlePhysical-10);
            setTimeout(()=>setMyPhysical(myPhysical-10),3000);
            // myPokemons[myMonster.current.id-1].heatlh=myPhysical;
            //localStorage.setItem("myPoketmon",JSON.stringify(myPokemons));

        }else if (item.className.includes("run")){
            setBattle(0);
            setRun(1);
        }else if(item.className.includes("bag")){
            menu.current.innerHTML="";
            setIndex(0);
            // 객체 순회  => keys를 사용
            const keys=Object.keys(myBag);
            keys.forEach(item=> {
                if(item.includes("ball") || item.includes("berry")){
                    menu.current.innerHTML += `<li><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/${item}.png"/>
                        <span>${myBag[item]}개 </span>
                    </li>`
                }
            })
            menu.current.innerHTML += "<li>뒤로가기</li>";

        }else if(item.className.includes("change")){ // 포켓몬 교체를 눌렀을 경우
            
            menu.current.innerHTML="";
            setIndex(0);
            if(myPokemons.length !== 1){
            
                myPokemons.forEach(item =>{ 
                    if(parseInt(myMonster.current.id) !==item.myId)
                        menu.current.innerHTML +=
                        `<li><img id=${item.myId} src="${commonUrl+item.name.toLowerCase()+".gif"}" />
                             <span>CP ${item.cp}</span>   
                        </li>`;
                    })
                menu.current.innerHTML += "<li>뒤로가기</li>";    
            }else
                menu.current.innerHTML="<li>There is  no Pokemon to be exchanged</li> <li>뒤로가기</li>"
            
        }else if(item.innerHTML==="뒤로가기"){
           menu.current.innerHTML="";
           setIndex(0);
           initList.forEach(item=>menu.current.appendChild(item));
           
        }else if(item.innerHTML.includes(commonUrl)){ // 포켓몬 일경우
            
            const newSrcName= item.firstChild.src.split("sprite/")[1];
            myMonster.current.src = commonBackUrl+newSrcName;
            myMonster.current.id=item.firstChild.id;            
            menu.current.innerHTML="";
            initList.forEach(item=>menu.current.appendChild(item));
            setIndex(0);
        }





        if(menu.current)
            setList(menu.current.querySelectorAll("li")) ;

    }

    
    
    const handleKeyDown=useCallback((e)=>{ // 키를 눌렀을경우  위치셋팅해준다. 
        let listCopy = menu.current.querySelectorAll("li");
        // ArrowUp ArrowDown //ArrowRight ArrowLeft // 엔터 -키코드 13
        // 배틀시작화면에서는  처음 리스트값을 가리키고 있다   .
        
       
        if(e.key === "ArrowUp"){
            // 위치가 1에 있을경우  맨 마지막껄루 
            if(listIndex === 0){
                setIndex(listCopy.length-1);
                listCopy[0].style.backgroundColor="";
            }
            else{
            listCopy[listIndex].style.backgroundColor="";
            setIndex(x=>x-1);
            }
        
        }else if(e.key === "ArrowDown"){
           if(listIndex === listCopy.length-1){
               setIndex(0);
               listCopy[listCopy.length-1].style.backgroundColor="";
           }else{
               listCopy[listIndex].style.backgroundColor="";
               setIndex(x=>x+1);
           }  
        }else if (e.keyCode === 13 || e.keyCode === 32){ //엔터나 스페이스바를 누를경우
             InitWindowEnter(listCopy[listIndex]);

        }
    },[listIndex]);

    const handleKeyUp =useCallback((e)=>{
        
     if(list)   
        list[listIndex].style.backgroundColor="yellow";
        
    },[listIndex,list]);





    useEffect(()=>{
        if(menu.current){
            window.addEventListener("keydown",handleKeyDown);
            window.addEventListener("keyup",handleKeyUp);

            return ()=> {
                window.removeEventListener("keydown",handleKeyDown);
                window.removeEventListener("keyup",handleKeyUp);
            }    
        }
    },[handleKeyDown])

    useEffect(()=>{
        if(menu.current){
            let menus =menu.current.querySelectorAll("li");
            setList(menu.current.querySelectorAll("li"));
            setInit(menus);
        }

    },[menu]);

    useEffect(()=>{
        if(menu.current){
            menu.current.querySelectorAll("li")[0].style.backgroundColor="yellow";
        }
    },[list])
    useEffect(()=>{
       if(myMonster.current) setMyPhysical( myPokemons[myMonster.current.id-1].heatlh); 
    },[])



    return (
        <>
        <BattleEffect>
            <img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/battle.png"/>
        </BattleEffect>
        <BattleContainer>
            <BattlePokmons>
                <div className="field"></div>
                <MonsterWrapper>
                    <BattleMonster src={`https://projectpokemon.org/images/normal-sprite/${pokemons[battleIndex[0]].name.toLowerCase()}.gif`}></BattleMonster>
                    <div className="physical1"><Physical physical={battlePhysical}></Physical></div>
                </MonsterWrapper>
                
                <MonsterWrapper>
                    <MyMonster id={myPokemons[0].myId}ref={myMonster}src={myPokemons[0].commonBackUrl}></MyMonster>
                    <div className="physical2"><Physical physical={myPhysical}></Physical></div>
                </MonsterWrapper>
            
            </BattlePokmons>
            <BattleNavi>
                <ul ref={menu}>
                   
                    <Attack className="attack"> 공격한다.(Attack)</Attack>
                    <Run className="run">도망간다(Run away)</Run>
                    <Bag className="bag">가방</Bag>
                    <Change className="change">포켓몬 교체 (Change Pokemon)</Change>
                </ul>
            </BattleNavi>

        </BattleContainer>
        </>
    )
}


export default Battle;