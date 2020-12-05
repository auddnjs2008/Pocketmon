import React, { useEffect, useRef, useState } from "react";
import BagPresenter from "./BagPresenter";
import PokeDex from "pokemon-go-pokedex";
import { number } from "prop-types";


const BagContainer=()=>{
    const [windowSize,setWindow]=useState(window.innerWidth);
    const [bag,setBag]=useState(JSON.parse(localStorage.getItem("myBag")))
    const [showPokemon,setShowPokemon]=useState([]);
    const [scroll,setScroll]=useState(window.scrollY);
    const [local,setLocal]=useState(JSON.parse(localStorage.getItem("myPoketmon")));
    const [item,setItem]=useState();
    const [evolveUrl,setEvolve]=useState([]);
    const showWindow = useRef();
    const eggWindow=useRef();
    const evolveWindow= useRef();

    let commonUrl = "https://projectpokemon.org/images/normal-sprite/";
    let shinyUrl = "https://projectpokemon.org/images/shiny-sprite/";
    let commonBackUrl = "https://projectpokemon.org/images/sprites-models/normal-back/";
    let shinyBackUrl = "https://projectpokemon.org/images/sprites-models/shiny-back/";


    useEffect(()=>{
        window.addEventListener("resize",()=>setWindow(window.innerWidth));
        window.addEventListener("scroll",()=>setScroll(window.scrollY));
        return ()=>{
            window.removeEventListener("resize",()=>setWindow(window.innerWidth));
            window.removeEventListener("scroll",()=>setScroll(window.scrollY));
        }    
    },[]);

    useEffect(()=>{
        localStorage.setItem("myPoketmon",JSON.stringify(local));
        setShowPokemon(local.filter(item=>item.health !== 100));
    },[local])

    useEffect(()=>{
        localStorage.setItem("myBag",JSON.stringify(bag));
    },[bag])
    
    const handleSelectPokemon=(e)=>{
        const myPokemons = JSON.parse(localStorage.getItem("myPoketmon"));
        const newBag = JSON.parse(localStorage.getItem("myBag"));
        const{currentTarget :{id}}=e;
       

        if(item === "Potion"){
            myPokemons[id-1].health +=20;
            newBag.Potion -=1;
        }else if (item==="superPotion"){
            myPokemons[id-1].health +=40;
            newBag.SuperPotion -=1;
        }else if(item === "hyperPotion"){
            myPokemons[id-1].health +=60;
            newBag.HyperPotion -=1;
        }else if(item === "candy"){
            /// 진화를 처리해주어야 한다.
            const Beforeevolve = parseInt(myPokemons[id-1].next_evolution[0].num);
            let evolvePokmon =  PokeDex.pokemon[Beforeevolve-1];
            const name = evolvePokmon.name.toLowerCase();
            let multipliers = typeof myPokemons[id-1].multipliers === "number" ? myPokemons[id-1].multipliers : 
                    myPokemons[id-1].multipliers[Math.floor(Math.random()*(myPokemons[id-1].multipliers.length-1))];
            ; //cp 곱하기 
            let newCp = Math.floor(myPokemons[id-1].cp * multipliers);
            let battlePokemons=JSON.parse(localStorage.getItem("battlePokemons"));

            evolvePokmon ={...evolvePokmon ,cp:newCp,health:100,myId:myPokemons[id-1].myId,commonUrl:commonUrl+name+".gif", commonBackUrl:commonBackUrl + name+".gif",shinyUrl:shinyUrl+name+".gif",
            shinyBackUrl:shinyBackUrl+name+".gif"     }
            
            setEvolve([myPokemons[id-1].commonUrl,evolvePokmon.commonUrl]);
            evolveWindow.current.style.display="flex";// 진화 화면을 표시해준다. 
            newBag.Candy -= myPokemons[id-1].candy_count; // 사탕개수를 줄인다.
            //진화 해준 아이로 저장해준다.
            myPokemons[id-1] = evolvePokmon;

            // 만일 배틀 포켓몬이 지정되 있으면 바꾸어준다. 
           
            battlePokemons = battlePokemons.map(item=>{
                if(item.myId === myPokemons[id-1].myId)  return evolvePokmon;
                else return item;
            });
            
            localStorage.setItem("battlePokemons",JSON.stringify(battlePokemons));

            //진화 화면을  지워준다.
            setTimeout(()=>evolveWindow.current.style.display="none",8000);
            showWindow.current.style.display="none";
            
        }


        if(myPokemons[id-1].health >100) myPokemons[id-1].health =100; 

  
        setLocal(myPokemons);
        setBag(newBag);
    }


    const handleUseClick=(e)=>{
        const Id=e.target.id;
        const myPokemons = JSON.parse(localStorage.getItem("myPoketmon"));
        setItem(Id); 
        
        //id에 포션이나 캔디가 들어갈경우 포켓몬 창 띄워주어야 한다.
        if(Id.includes("Potion")){
            showWindow.current.style.display="grid";
            setShowPokemon(myPokemons.filter(item=>item.health !== 100));
        }else if(Id.includes("candy")){ 
            showWindow.current.style.display="grid";   
            setShowPokemon(myPokemons.filter(item=>item.candy_count <= bag.Candy));
        }else{
            //새로운 창을 띄운다.
            eggWindow.current.style.display="grid";
            setShowPokemon([bag.Egg,bag.LuckyEgg]);

        }
    }

    // 인큐베이터를 눌렀을 경우는 다르므로  함수를 하나 더 만들어준다.
    const handleSelectEgg=(e)=>{
        console.log(e.target);
    }

    


    return <BagPresenter 
    evolveUrl={evolveUrl} 
    evolveWindow={evolveWindow} 
    showWindow={showWindow} 
    eggWindow={eggWindow}
    scroll={scroll} 
    windowSize={windowSize} 
    bag={bag} 
    showPokemon={showPokemon} 
    handleUseClick={handleUseClick} 
    handleSelectPokemon={handleSelectPokemon} 
    handleSelectEgg={handleSelectEgg}></BagPresenter>
}

export default BagContainer;