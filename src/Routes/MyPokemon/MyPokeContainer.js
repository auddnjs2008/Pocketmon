import React, { useCallback, useEffect, useState } from "react";
import MyPokePresenter from "./MyPokePresenter";

const MyPokeContainer =()=>{

    const [windowSize,setWindow]=useState(window.innerWidth);
    const [pokemons,setPokemon]=useState(JSON.parse(localStorage.getItem("myPoketmon")));
    const [battlePokemons,setBattle]=useState(JSON.parse(localStorage.getItem("battlePokemons")));
    const [changePossible, setChange]=useState(0);
    const [changeIndex,setIndex]=useState(1);
    useEffect(()=>{
        window.addEventListener("resize",()=>setWindow(window.innerWidth));
        return window.removeEventListener("resize",()=>setWindow(window.innerWidth));
    },[]);

    useEffect(()=>{
        localStorage.setItem("battlePokemons",JSON.stringify(battlePokemons));
    },[battlePokemons])
    
    const handlePokemonClick=useCallback((e)=>{
        const Id = parseInt(e.currentTarget.id);
        const Judge = battlePokemons.map(item=>item.myId); // 이미 목록에 들어가 있는 포켓몬은 선택하지 못하도록 판단
        
        
        if(!Judge.includes(Id)){
            if(battlePokemons.length !== 3)
                setBattle([...battlePokemons,pokemons[Id-1]]);
            else{ // 들어왔는데  3마리가 다 지정되 있으면
                if(changeIndex === 1){
                    setBattle([pokemons[Id-1],battlePokemons[1],battlePokemons[2]]);
                    setIndex(x=>x+1);
                }else if(changeIndex === 2){
                    setBattle([battlePokemons[0],pokemons[Id-1],battlePokemons[2]]);
                    setIndex(x=>x+1);
                }else{
                    setBattle([battlePokemons[0],battlePokemons[1],pokemons[Id-1]]);
                    setIndex(1);
                }
            }
        }    
    },[battlePokemons])
    
    const changeBtnClick=(e)=>{
        if(e.target.innerHTML === "Change Off"){
            e.target.innerHTML = "Change On";
            setChange(1);
        }else{
            e.target.innerHTML="Change Off";
            setChange(0);
        }
    }

    const clearBtnClick=()=>{
       //로컬 스토리지를 지워준다. 
       localStorage.setItem("battlePokemons",JSON.stringify([]));
       //배틀 포켓몬 초기화
       setBattle([]);
    }


    return <MyPokePresenter
        windowSize={windowSize}
        pokemons={pokemons}
        battlePokemons={battlePokemons}
        handlePokemonClick={handlePokemonClick}
        changeBtn={changeBtnClick}
        clearBtnClick={clearBtnClick}
        changePossible={changePossible}    
    ></MyPokePresenter>
}

export default MyPokeContainer;