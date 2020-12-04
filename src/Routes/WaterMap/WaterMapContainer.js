import React, { useCallback, useEffect, useRef, useState } from "react";
import WaterMapPresenter from "./WaterMapPresenter";
import Pokemon from "pokemon-go-pokedex";


const WaterMapContainer =()=>{

    const newMap = [[0,1,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,1,0],[0,1,1,1,1,1,1,1,1,1,0]
    ];
    const [map,setMap]=useState(newMap);
    const [charPosition,setPosition]=useState([]); //트레이너 포지션
    const [windowSize,setWindow]=useState([]);
    const [frontMove,setMove]=useState(1); // 위로가는 키를 눌렀을때 1 아래로가는 키를 눌렀을때1 (캐릭터 모습 변경)
    const [battleon,setBattle]=useState(0); // battle 상태 표시 0 이면 배틀이 아니고 1이면 배틀 상태이다.
    const [run,setRun]=useState(0); // 도망가고 나오면 1로 상태를 만든다.
    // 랜덤 포켓몬은  3단계 최종진화 포켓몬은 나오지 못하게 한다. 
    const [pokemon,setPokemon]=useState(Pokemon.pokemon.filter(item=>item.type.includes("Water")&& (item.prev_evolution ? item.prev_evolution.length!==2 : 1)));
    //랜덤 포켓몬의 좌표들
    const [pokePosition,setPkPosition]=useState([]);
    //트레이너 반경에 포착된 포켓몬    // 
    const [battlePokemon,setBattlePoke]=useState([]);
    // 랜덤 포켓몬들 cp
    const [pokemonsCp,setCp]=useState([]);


    const char=useRef();
    const yard=useRef();

    const trainer="https://projectpokemon.org/images/normal-sprite/pikachu-hoenncap.gif";
    const trainerBack="https://projectpokemon.org/images/sprites-models/normal-back/pikachu-hoenncap.gif";
    const trainerImg=[trainer,trainerBack];
   
   
    
    // 랜덤 함수를 만든다. (좌표랜덤, 포켓몬 배열중  랜덤으로 나오게 하는 함수)
    const getRandom=(num,start)=>{    
        return Math.floor(Math.random()*(num-start))+start; // 1부터 num까지 랜덤으로 배출
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
           
            //도망치고 나서 움직일때 다시  도망모드를 초기화 시킨다.
            if(run) setRun(0);
            e.preventDefault();
            const initialArray =[ Math.floor(getAbsoluteLeft(char.current) - getAbsoluteLeft(yard.current)),Math.floor(getAbsoluteTop(char.current) - getAbsoluteTop(yard.current))]           
            // 경계선 세우기
            if(e.key === "ArrowUp" && battleon === 0){
             nowPosition.length === 0 ? setPosition([initialArray[0],initialArray[1]-60]):(nowPosition[1]-60<=0 ? setPosition([nowPosition[0],nowPosition[1]]):setPosition([nowPosition[0],nowPosition[1]-60]));
              setMove(0);  
            }else if(e.key ==="ArrowDown" && battleon === 0){ 
            nowPosition.length === 0 ? setPosition([initialArray[0],initialArray[1]+60]):(nowPosition[1]+60 >= windowSize[1] ? setPosition([nowPosition[0],nowPosition[1]]): setPosition([nowPosition[0],nowPosition[1]+60]));
                setMove(1);
            }else if(e.key ==="ArrowRight" && battleon === 0){
             nowPosition.length === 0 ? setPosition([initialArray[0]+60,initialArray[1]]):(nowPosition[0]+60 >=windowSize[0]-50 ? setPosition([nowPosition[0],nowPosition[1]]):setPosition([nowPosition[0]+60,nowPosition[1]]));

            }else if(e.key ==="ArrowLeft" && battleon === 0){
                nowPosition.length === 0 ? setPosition([initialArray[0]-60,initialArray[1]]): (nowPosition[0]-60 <=0? setPosition([nowPosition[0],nowPosition[1]]) :setPosition([nowPosition[0]-60,nowPosition[1]]));

            }
    },[charPosition]);

    const handleKeyUp =useCallback((e)=>{
          // 랜덤포켓몬  주위 10px 반경 에 접촉할경우 메세지 발생 
             // 좌표 사이의 거리가 반지름 거리보다 크면 인지 못한다.   // 꼭 한명만 배열에 들어가는 건 아니다. 
             let rader = pokePosition.map((item,index)=>
                Math.sqrt(Math.pow(item[0]-(nowPosition[0]),2)+Math.pow(item[1]-(nowPosition[1]),2))<= 40 ? index : "" ).filter(item => item !=="");

            if(rader.length !==0 && !run && JSON.parse(localStorage.getItem("battlePokemons")).length) {
                window.removeEventListener("keydown",handleKeyPress);
                setBattlePoke(rader);
                setBattle(1);
            }


    },[charPosition,run]);

    const handleMapChange =(e)=>{
        e.preventDefault();
        yard.current.classList.toggle("perspective");
        if(e.target.innerText==="3D 입체보기")
             e.target.innerText = "평면보기"
        else
             e.target.innerText ="3D 입체보기";
    }



    useEffect(()=>{
        if(char.current && yard.current){
            setWindow([yard.current.offsetWidth,yard.current.offsetHeight]);
            //setPower(1);
            window.addEventListener("keydown",handleKeyPress);
            window.addEventListener("keyup",handleKeyUp);
            return ()=> {
                    window.removeEventListener("keydown",handleKeyPress);
                    window.removeEventListener("keyup",handleKeyUp);
                }
        }
    },[handleKeyPress,run]);

    useEffect(()=>{
        if(char.current && yard.current){
        let randomPokemon=[];
        let randomPosition=[];
        let randomCp=[];
        for(let i=0; i<6;i++){
            randomPokemon.push(pokemon[getRandom(pokemon.length,1)-1]);
            randomPosition.push([getRandom(yard.current.clientWidth-100,1),getRandom(yard.current.clientHeight-100,1)]);
            randomCp.push(getRandom(900,100));
        }
       setPokemon(randomPokemon); 
       setPkPosition(randomPosition);
       setCp(randomCp);
     }
    },[])


  
    return (
     <>    
    <WaterMapPresenter
     map={map} 
     trainer={trainerImg} 
     char={char} 
     yard={yard} 
     setBattle={setBattle}
     charPosition={charPosition} 
     frontMove={frontMove} 
     windowSize={windowSize}
     pokemon={pokemon}
     setPokemons={setPokemon}
     randomPosition={pokePosition}
     setPkPosition={setPkPosition}
     battlePokemon={battlePokemon}
     battleon={battleon}
     pokemonsCp={pokemonsCp}
     setCp={setCp}
     run={setRun}
     handleMapChange={handleMapChange}
     ></WaterMapPresenter>
     </> 
    )
}

export default WaterMapContainer;