import React, { useEffect, useRef, useState } from "react";
import YardMapPresenter from "./YardMapPresenter";

const YardMapContainer =()=>{
    
    const newMap = [[1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1],
    [1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1]
    ];
    const [map,setMap]=useState(newMap);
    const [charPosition,setPosition]=useState([]);
    const [windowSize,setWindow]=useState([]);
    const [event,setEvent]=useState(0);
    const char=useRef();
    const yard=useRef();
    
    const trainer="https://projectpokemon.org/images/normal-sprite/pikachu-hoenncap.gif";
    const trainerBack="https://projectpokemon.org/images/sprites-models/normal-back/pikachu-hoenncap.gif";
    const trainerImg=[trainer,trainerBack];
    // 트레이너의 현재위치
    console.log("실행************");
    console.log(charPosition);
    console.log(windowSize);
    // 부모요소의 시작점을 기준으로 한 상대좌표 구하기
  
    const getAbsoluteTop=(element)=>{
        return window.pageYOffset+element.getBoundingClientRect().top;
    }
    const getAbsoluteLeft=(element)=>{
        return window.pageXOffset+element.getBoundingClientRect().left;
    }
    
    const handleKeyPress=(e)=>{
     // ArrowUp ArrowDown //ArrowRight ArrowLeft // 60px씩 이동    
            setEvent(0);
            if(e.key === "ArrowUp"){
            console.log(charPosition);
            console.log(windowSize);
            setPosition([charPosition[0],charPosition[1]+60]);
            }else if(e.key ==="ArrowDown"){ 
            setPosition([charPosition[0],charPosition[1]-60]);  
            }else if(e.key ==="ArrowRight"){
                setPosition([charPosition[0]+60,charPosition[1]]);
            }else if(e.key ==="ArrowLeft"){
                setPosition([charPosition[0]-60,charPosition[1]])
            }
        

    }

    // useEffect(()=>{
    //     // console.log(charPosition);
    //     // console.log(windowSize);
    // },[charPosition])


    useEffect(()=>{
    
        if(char.current && yard.current){
         
            setPosition([ getAbsoluteLeft(char.current) - getAbsoluteLeft(yard.current),getAbsoluteTop(char.current) - getAbsoluteTop(yard.current)]);
            setWindow([yard.current.offsetWidth,yard.current.offsetHeight]);
            setEvent(1);
        }
    },[]);


    if(event === 1) 
        window.addEventListener("keydown",handleKeyPress);
    

    return <YardMapPresenter map={map} trainer={trainerImg} char={char} yard={yard} handleKeyPress={handleKeyPress}></YardMapPresenter>
}

export default YardMapContainer;