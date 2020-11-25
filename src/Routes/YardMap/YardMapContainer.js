import React, { useCallback, useEffect, useRef, useState } from "react";
import YardMapPresenter from "./YardMapPresenter";
import Pokemon from "pokemon-go-pokedex";



const YardMapContainer =()=>{
    
    const newMap = [[1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1],
    [1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1],[1,1,1,1,1,0,1,1,1,1,1]
    ];
    const [map,setMap]=useState(newMap);
    const [charPosition,setPosition]=useState([]); //트레이너 포지션
    const [windowSize,setWindow]=useState([]);
    const [frontMove,setMove]=useState(1); // 위로가는 키를 눌렀을때 1 아래로가는 키를 눌렀을때1 (캐릭터 모습 변경)
    const [gameon,setPower]=useState(0);
    // 랜덤 포켓몬은  3단계 최종진화 포켓몬은 나오지 못하게 한다. 
    const [pokemon,setPokemon]=useState(Pokemon.pokemon.filter(item=>item.type.includes("Grass")&& (item.prev_evolution ? item.prev_evolution.length!==2 : 1)));
    //랜덤 포켓몬의 좌표들
    const [pokePosition,setPkPosition]=useState([]);
    //트레이너 반경에 포착된 포켓몬 
    const [battlePokemon,setBattlePoke]=useState([]);

    const char=useRef();
    const yard=useRef();

    const trainer="https://projectpokemon.org/images/normal-sprite/pikachu-hoenncap.gif";
    const trainerBack="https://projectpokemon.org/images/sprites-models/normal-back/pikachu-hoenncap.gif";
    const trainerImg=[trainer,trainerBack];
    // 트레이너의 현재위치
    //  console.log("실행************");
    // console.log(charPosition);
   
    
    // 랜덤 함수를 만든다. (좌표랜덤, 포켓몬 배열중  랜덤으로 나오게 하는 함수)
    const getRandom=(num)=>{    
        return Math.floor(Math.random()*(num-1))+1; // 1부터 num까지 랜덤으로 배출
    }

  



    // 부모요소의 시작점을 기준으로 한 상대좌표 구하기
  
    const getAbsoluteTop=(element)=>{
        return window.pageYOffset+element.getBoundingClientRect().top;
    }
    const getAbsoluteLeft=(element)=>{
        return window.pageXOffset+element.getBoundingClientRect().left;
    }
    
    let  nowPosition=charPosition;
    
    const handleKeyPress=useCallback((e)=>{ //useCallback은 함수를 재사용하는 것이다.
     // ArrowUp ArrowDown //ArrowRight ArrowLeft // 60px씩 이동
             // 랜덤포켓몬  주위 10px 반경 에 접촉할경우 메세지 발생 
             // 좌표 사이의 거리가 반지름 거리보다 크면 인지 못한다.     // 문제는 업데이트전 좌표들이다. 
            let rader = pokePosition.filter((item,index)=>{
                    //console.log(Math.sqrt(Math.pow(item[0]-nowPosition[0],2)+Math.pow(item[1]-nowPosition[1],2)));
                    // console.log("****피카츄 포지션:",nowPosition);
                    // console.log("***포켓몬포지션:",index,item);
                    return Math.sqrt(Math.pow(item[0]-(nowPosition[0]),2)+Math.pow(item[1]-(nowPosition[1]),2))<= 40})            

            setBattlePoke(rader);
            e.preventDefault();
            const initialArray =[ Math.floor(getAbsoluteLeft(char.current) - getAbsoluteLeft(yard.current)),Math.floor(getAbsoluteTop(char.current) - getAbsoluteTop(yard.current))]           
            // 경계선 세우기
            if(e.key === "ArrowUp"){
             nowPosition.length === 0 ? setPosition([initialArray[0],initialArray[1]-60]):(nowPosition[1]-60<=0 ? setPosition([nowPosition[0],nowPosition[1]]):setPosition([nowPosition[0],nowPosition[1]-60]));
              setMove(0);  
            }else if(e.key ==="ArrowDown"){ 
            nowPosition.length === 0 ? setPosition([initialArray[0],initialArray[1]+60]):(nowPosition[1]+60 >= windowSize[1] ? setPosition([nowPosition[0],nowPosition[1]]): setPosition([nowPosition[0],nowPosition[1]+60]));
                setMove(1);
            }else if(e.key ==="ArrowRight"){
             nowPosition.length === 0 ? setPosition([initialArray[0]+60,initialArray[1]]):(nowPosition[0]+60 >=windowSize[0] ? setPosition([nowPosition[0],nowPosition[1]]):setPosition([nowPosition[0]+60,nowPosition[1]]));

            }else if(e.key ==="ArrowLeft"){
                nowPosition.length === 0 ? setPosition([initialArray[0]-60,initialArray[1]]): (nowPosition[0]-60 <=0? setPosition([nowPosition[0],nowPosition[1]]) :setPosition([nowPosition[0]-60,nowPosition[1]]));

            }else{
                return;
            }
    },[charPosition]);


    useEffect(()=>{
        if(char.current && yard.current){
            setWindow([yard.current.offsetWidth,yard.current.offsetHeight]);
            setPower(1);
            window.addEventListener("keydown",handleKeyPress);
            return ()=> window.removeEventListener("keydown",handleKeyPress);
        }
    },[handleKeyPress]);

    useEffect(()=>{
        if(char.current && yard.current){
        let randomPokemon=[];
        let randomPosition=[];
        for(let i=0; i<6;i++){
            randomPokemon.push(pokemon[getRandom(pokemon.length)-1]);
            randomPosition.push([getRandom(yard.current.clientWidth-60),getRandom(yard.current.clientHeight-60)]);
        }
       setPokemon(randomPokemon); 
       setPkPosition(randomPosition);
     }
    },[])


  
    return (
     <> 
     {console.log(battlePokemon)}     
    <YardMapPresenter
     map={map} 
     trainer={trainerImg} 
     char={char} 
     yard={yard} 
     charPosition={charPosition} 
     frontMove={frontMove} 
     windowSize={windowSize}
     pokemon={pokemon}
     randomPosition={pokePosition}
     ></YardMapPresenter>
     </> 
    )
}

export default YardMapContainer;