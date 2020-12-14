import React, { useCallback, useEffect, useState } from "react";
import MyPokePresenter from "./MyPokePresenter";

const MyPokeContainer =()=>{

    const [windowSize,setWindow]=useState(window.innerWidth);
    const [pokemons,setPokemon]=useState(JSON.parse(localStorage.getItem("myPoketmon")));
    const [battlePokemons,setBattle]=useState(JSON.parse(localStorage.getItem("battlePokemons")));
    const [changePossible, setChange]=useState(0);
    const [changeIndex,setIndex]=useState(1);
    const [message,setMessage]=useState("");
    useEffect(()=>{
        window.addEventListener("resize",()=>setWindow(window.innerWidth));
        return window.removeEventListener("resize",()=>setWindow(window.innerWidth));
    },[]);

    useEffect(()=>{
        localStorage.setItem("battlePokemons",JSON.stringify(battlePokemons));
    },[battlePokemons])
    
 
    const handlePokemonClick=useCallback((e)=>{
      
        if(changePossible !== 1) return;

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
    },[battlePokemons,changePossible])
    
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

    const sendBtnClick=(e)=>{
        e.stopPropagation();
        setChange(3);
        const newBag = JSON.parse(localStorage.getItem("myBag"));
        const id =parseInt(e.target.parentNode.id);
        const pickPokemon=pokemons[id-1];
        //state 변수 리셋
        if(battlePokemons.filter(item=>item.myId === (id)).length === 0){
            // 포켓몬을 보낼시  보상으로 사탕을 준다.(cp에 따라 다르게 준다.)
            
            if(pickPokemon.cp>=100 && pickPokemon.cp<1000){
                newBag.Candy +=5;
                setMessage("you got  5 candy");
            }else if(pickPokemon.cp >=1000 && pickPokemon.cp < 5000){
                newBag.Candy +=10;
                setMessage("you got  10 candy");
            }else{
                newBag.Candy +=15;
                setMessage("you got  15 candy");
            }
            
            const newPokemon = JSON.parse(localStorage.getItem("myPoketmon")).filter(item=>item.myId !== (id)).map((item,index)=>{
                let newItem=item;
                if(index >=id-1){ 
                    newItem.myId -=1;
                }
                return newItem;
            });  // myId 인덱스 정리를 해주고 (타겟 포켓몬 뒤쪽 아이들의 아이디를 하나씩 줄여주고  타겟을 삭제)


            localStorage.setItem("myPoketmon",JSON.stringify(newPokemon));
            setPokemon(newPokemon);
            localStorage.setItem("myBag",JSON.parse(newBag));

        }else{
            //베틀 포켓몬을 해제시켜달라고 메세지를 보낸다. 
            setMessage("This Pokemon is  BattlePokemon");
        }
        
    }

    return <MyPokePresenter
        windowSize={windowSize}
        pokemons={pokemons}
        battlePokemons={battlePokemons}
        message={message}
        setMessage={setMessage}
        handlePokemonClick={handlePokemonClick}
        changeBtn={changeBtnClick}
        clearBtnClick={clearBtnClick}
        changePossible={changePossible}    
        sendBtnClick={sendBtnClick}
    ></MyPokePresenter>
}

export default MyPokeContainer;