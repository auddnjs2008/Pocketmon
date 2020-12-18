import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";
import PokeDex from "pokemon-go-pokedex";
import Message from "../Components/Message";
import Evolve from "../../src/Evolve";
import BattleMessage from "./BattleMessage";
import AttackEffect from "./AttackEffect";


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
animation : battle 2s linear forwards;
`;

const BattleContainer=styled.div`
    position:absolute;
    background-color:rgba(0,0,0,0.5);
    top:0;
    
    z-index:3;
    width:100%;
    height:100%;
    @keyframes  battleWindow{
        0%{
            opacity:0;
        }
        80%{
            opacity:0;
        }
        100%{
            opacity:1;
        }
    }

    animation: battleWindow 3s ease-in-out forwards;
`;

const BattleNavi = styled.div`
    margin:0 auto;
    width:90%;
    height:25%;
    border:1px solid black;
   
     
    ul{
        width:100%;
        height:100%;
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


`;


const Field =styled.div`
    position:fixed;
    left:30%;
    bottom:20%;
    width:60%;
    height:100%;
    background-color:${props=>props.color};
    transform:rotateX(87deg) rotateZ(10deg);
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
        
        
        
    }

    div.physical1{
        bottom:unset;
        left:unset;
        top:0;
        right:18%;
        margin:20px 0;
    }




`;


const BattleMonster = styled.img`
    position:absolute;
    top:30px;
    right:20%;

     width:100px;
     height:100px;
     object-fit:contain;
 
    
     &.ballIn{@keyframes ballIn{
            0%{
            
                transform:scale(0,0);
            }
            100%{
                }
        }
     animation: ballIn 1s linear forwards;
     }
    &.reAttack{
        @keyframes reAttack{
            0%{
              transform:translate(-40%,20%);  
            }
            100%{

            }
        }
        animation: reAttack 1s linear forwards;
    }





`;

const MyMonster = styled.img`
    position: absolute;
    bottom:30%;
    left:20%;
    
     width:150px;
     height:150px;
     object-fit:contain;
     

    &.attack{ 
     @keyframes attack{
         0%{
           transform:translate(40%,-20%); 
         }
         100%{

         }
     }

     animation:attack 1s linear forwards;
    }
   
`;


const BallEffect = styled.img`
    position:absolute;
    top:200px ;
    left:20px;
    //right:20%; 
    max-width:50px;
    max-height:50px;
    object-fit:cover;
    @keyframes ballEffect{
        0%{
            
        }
        25%{
            top:150px;
            left:100px;
        }
        50%{
            top:100px;
            left:200px;
        }
        75%{
            top:80px;
            left:250px;
        }
        100%{
            top:50px;
            left:70%;
           
            transform:rotate(360deg);
        }
        
       
    }
  

    animation: ballEffect 0.2s linear forwards;
    
    
`;


const Battle =({color,battleIndex,pokemons,setBattle,battleon,setRun,pokemonsCp,setPokemons, setCp,setPkPosition,randomPosition})=>{

    setBattle(1);
    let myPokemons=JSON.parse(localStorage.getItem("myPoketmon"));
    let myBattlePokemons=JSON.parse(localStorage.getItem("battlePokemons"));
    const battlePokmon = pokemons[battleIndex[0]] ? PokeDex.pokemon[pokemons[battleIndex[0]].id-1] : "";
  
    let battlePokmonName = battlePokmon !=="" ? battlePokmon.name.toLowerCase() :"";

        if(battlePokmonName.includes("fetch'd")) battlePokmonName="farfetchd";
        if(battlePokmonName.includes("mime")) battlePokmonName="mr.mime";
        if(battlePokmonName.includes("female")) battlePokmonName="nidoran_f";
        if(battlePokmonName.includes("male")) battlePokmonName="nidoran_m";
  

    const myBag = JSON.parse(localStorage.getItem("myBag"));
    let commonUrl = "https://projectpokemon.org/images/normal-sprite/";
    let shinyUrl = "https://projectpokemon.org/images/shiny-sprite/";
 
    const menu =useRef();
    const myMonster = useRef();
    const battleMonster = useRef();
    const [battlePhysical,setPhysical]=useState(100);
    const [battleBallCount,setBallCount]=useState(0);
    // 일반볼은 +1  수퍼볼은 +2  울트라 볼은 +3    
    // 체력이 0~33 일경우  ballcount 2  33~66일 경우 4  66~100일 경우 6 
    // 일반 포켓몬  ballcount 1~2   3~4  5~6
    // 보스 포켓몬  ballcount 5~10  10~15  15~20
    const [catchBallCount,setCatchBall]=useState(battlePokmonName.includes("mew") || battlePokmonName === "moltres" || battlePokmonName === "zapdos"  || battlePokmonName === "articuno"? 
    [Math.floor(Math.random()*(10-5))+5,Math.floor(Math.random()*(15-10))+10,Math.floor(Math.random()*(20-15))+15]:
    [Math.floor(Math.random()*(2-1))+1,Math.floor(Math.random()*(4-3))+3,Math.floor(Math.random()*(6-5))+5]);

  
    const [myPhysical,setMyPhysical]=useState();
    const [initList,setInit]=useState();
    const [list,setList]=useState();
    const [listIndex,setIndex]=useState(0);
    const [ballEffect,setBallEffect]=useState(0);
    const [bag,setBag]=useState(JSON.parse(localStorage.getItem("myBag")));
    const [ballImage,setBallImg]=useState();
    const [message,setMessage]=useState("");
    const [attackDamege,setAttack]=useState([0,0]);
    const [type,setType]=useState([]);
   
    const {megaPokemon, alolaPokemon,megaXYPokemon,urlSearch,googleProxyURL,DamegeCalc}=Evolve;

    const catchPokemon=()=>{
        let catchPokemon;
        if(!battlePokmonName.includes("mime")){
            catchPokemon = {...battlePokmon, cp:pokemonsCp[battleIndex[0]],health:100,myId:myPokemons.length+1, commonUrl:urlSearch.commonUrl(battlePokmonName), commonBackUrl:urlSearch.commonBackUrl(battlePokmonName),shinyUrl:urlSearch.shinyUrl(battlePokmonName),
            shinyBackUrl:urlSearch.shinyBackUrl(battlePokmonName),color:0};
        }else{
            catchPokemon = {...battlePokmon, cp:pokemonsCp[battleIndex[0]],health:100,myId:myPokemons.length+1, commonUrl:urlSearch.commonUrl("mr.mime"), commonBackUrl:urlSearch.commonBackUrl("mr._mime"),shinyUrl:urlSearch.shinyUrl("mr._mime"),
                shinyBackUrl:urlSearch.shinyBackUrl("mr._mime"),color:0};
        }    

        if(battlePokmonName.includes("nidoran") || battlePokmonName.includes("mime") || battlePokmonName.includes("fetchd")){
            delete catchPokemon.name;
            catchPokemon["name"] = battlePokmonName;
        }

        myPokemons.push(catchPokemon);
        localStorage.setItem("myPoketmon",JSON.stringify(myPokemons));
        myPokeomnsSetting();
    }

    const removePokemon=()=>{ //잡을 경우나  쓰러트릴 경우  제외시킨다.
        setPokemons(pokemons.filter((item,index)=>index !== battleIndex[0])); // 포켓몬 내용 삭제
        setCp(pokemonsCp.filter((item,index)=>index !== battleIndex[0])); // cp 내용 삭제
        setPkPosition(randomPosition.filter((item,index)=> index !== battleIndex[0])); // 포지션 삭제
        setBattle(0);
        setRun(1); 
    }
  
    const attack = () =>{

        const addDamege = pokemonsCp[battleIndex[0]] > myPokemons[myMonster.current.id-1].cp ?
            pokemonsCp[battleIndex[0]]/myPokemons[myMonster.current.id-1].cp : (pokemonsCp[battleIndex[0]] !== myPokemons[myMonster.current.id-1].cp ? 
                myPokemons[myMonster.current.id-1].cp / pokemonsCp[battleIndex[0]] : 0);

        // 상성 효과 적용 코드  필요 ?  // 상대방 약점에 내 타입이 포함되는지  // 내 약점에   상대방 타입이 포함되는지 확인        
      
     
        const myType=myMonster.current ?  myPokemons[myMonster.current.id-1].type : ""; //내 타입
        const battleType =battlePokmon ? battlePokmon.type : ""; // 배틀 포켓몬 타입
        const myTypeDamege=DamegeCalc(myType,battleType);
        const battleTypeDamege=DamegeCalc(battleType,myType); 
        setType([myType,battleType]);
        setTimeout(()=>setType([]),2000);        
    
                
        
        

        if(pokemonsCp[battleIndex[0]] > myPokemons[myMonster.current.id-1].cp) // 배틀 포켓몬이  더 높으면 일반 10데미지만 준다.
        {                                                                       // 타입에 따라 효과 메세지를 넣어준다. 
            setPhysical(battlePhysical-10*myTypeDamege);

            setTimeout(()=>{
                
                if(myPhysical-((10+addDamege)*battleTypeDamege) >=0)
                    setMyPhysical(Math.floor(myPhysical-((10+addDamege)*battleTypeDamege)));
                else if(myPhysical -((10+addDamege)*battleTypeDamege) <0){
                    setMyPhysical(0);
                  
                }
                },1000);
            setAttack([Math.floor(10*myTypeDamege),Math.floor((10+addDamege)*battleTypeDamege)]);    

        }
        else{ // 내가 더 높으면  추가 데미지를 준다.  // 같으면  서로 10씩 만 뺏어간다. 
            setPhysical(Math.floor(battlePhysical-((10+addDamege)*myTypeDamege)));
             setTimeout(()=>{
                
                if(myPhysical-(10)*battleTypeDamege >=0)
                    setMyPhysical(myPhysical-(10)*battleTypeDamege);
                else if(myPhysical -(10)*battleTypeDamege <0){
                    setMyPhysical(0);
                 
                }
                },1000);
                setAttack([Math.floor((10+addDamege)*myTypeDamege),Math.floor(10*battleTypeDamege)]);
        }

        

        // 에니메이션 적용  // 메세지 에니메이션도 줘야 한다.
        if(myMonster.current && battleMonster.current){
            battleMonster.current.classList.remove("reAttack")
            myMonster.current.classList.add("attack");
            setTimeout(()=>myMonster.current ? myMonster.current.classList.remove("attack") :"",1000);
            setTimeout(()=>battleMonster.current ? battleMonster.current.classList.add("reAttack") : "",1000);
        }
    }
   

    const ballCatch=(item)=>{

      
        if(item.innerHTML.includes("pokeball")){
            setBallCount(x=>x+1);
            setBallImg(`https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/pokeball.png`);
            myBag["pokeball"] -=1;
            if(menu.current.querySelector("#pokeball").innerHTML !== "1")
                menu.current.querySelector("#pokeball").innerHTML =parseInt(menu.current.querySelector("#pokeball").innerHTML)-1;
            else{    
                menu.current.removeChild(menu.current.querySelector("#pokeball").parentNode);
                delete myBag.pokeball;
            }    
        }else if(item.innerHTML.includes("superball")){
            setBallCount(x=>x+2);
            setBallImg(`https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/superball.png`);
            myBag["superball"] -=1;
            if(menu.current.querySelector("#superball").innerHTML !== "1")
                menu.current.querySelector("#superball").innerHTML =parseInt(menu.current.querySelector("#superball").innerHTML)-1;
            else{
                menu.current.removeChild(menu.current.querySelector("#superball").parentNode);
                delete myBag.superball;
            }
        }else if(item.innerHTML.includes("ultra-ball")){
            setBallCount(x=>x+3);
            setBallImg(`https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/ultra-ball.png`);
            myBag["ultra-ball"] -=1;
            if(menu.current.querySelector("#ultra-ball").innerHTML !=="1")
                menu.current.querySelector("#ultra-ball").innerHTML =parseInt(menu.current.querySelector("#ultra-ball").innerHTML)-1;
            else{
                menu.current.removeChild(menu.current.querySelector("#ultra-ball").parentNode);
                delete myBag["ultra-ball"];
            }        
        }else if(item.innerHTML.includes("berry")){
            
            setBallCount(x=>x+2);
            setBallImg("https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/razz-berry.png");
            myBag["razz-berry"] -=1;
            if(menu.current.querySelector("#razz-berry").innerHTML !=="1")  
                menu.current.querySelector("#razz-berry").innerHTML =parseInt(menu.current.querySelector("#razz-berry").innerHTML)-1;
            else{
                menu.current.removeChild(menu.current.querySelector("#razz-berry").parentNode);
                delete myBag["razz-berry"];
            }    
        }

        localStorage.setItem("myBag",JSON.stringify(myBag));
      
        //setIndex(0);
        setBallEffect(1);
       
    }





    const InitWindowEnter=(item)=>{ // 초기하면 리스트에서  목록을고르고  엔터나 스페이스바 누를경우
        
        
        
        item.style.backgroundColor="";
 


        if(item.className.includes("attack")){
            attack();
        }else if (item.className.includes("run")){
            setBattle(0);
            setRun(1);
            myPokeomnsSetting();
        }else if(item.className.includes("bag")){
            menu.current.innerHTML="";
            setIndex(0);
            // 객체 순회  => keys를 사용
            const keys=Object.keys(myBag);
            keys.forEach(item=> {
                if(item.includes("ball") || item.includes("berry")){
                    menu.current.innerHTML += `<li><img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/${item}.png"/>
                       <span id=${item}>${myBag[item]}</span>개
                    </li>`
                }
            })
            menu.current.innerHTML += "<li>뒤로가기</li>";

        }else if(item.className.includes("change")){ // 포켓몬 교체를 눌렀을 경우
            
            menu.current.innerHTML="";
            setIndex(0);
            if(myBattlePokemons.length !== 1){
            
                    myBattlePokemons.forEach(item =>{ 
                    if(parseInt(myMonster.current.id) !==item.myId && item.health >0)
                        menu.current.innerHTML +=
                        item.specialUrl === undefined ?
                        `<li><img id=${item.myId} src="${item.color === 0 ? urlSearch.commonUrl(item.name.toLowerCase()) : (item.name.includes("mime") ?urlSearch.shinyUrl("mr._mime") :urlSearch.shinyUrl(item.name.toLowerCase()))}" />
                             <span>CP ${item.cp}</span>   
                        </li>` :  `<li><img id=${item.myId} src="${item.color === 0 ? item.specialUrl : item.speicalShinyUrl}" />
                        <span>CP ${item.cp}</span>   
                   </li>`
                    })
                menu.current.innerHTML += "<li>뒤로가기</li>";    
            }else
                menu.current.innerHTML="<li>There is  no Pokemon to be exchanged</li> <li>뒤로가기</li>"
            
        }else if(item.innerHTML==="뒤로가기"){
           menu.current.innerHTML="";
           setIndex(0);
           initList.forEach(item=>menu.current.appendChild(item));
           
        }else if(item.innerHTML.includes(commonUrl) || item.innerHTML.includes(shinyUrl)){ // 포켓몬 일경우
            
            let newSrcName= item.firstChild.src.split("sprite/")[1].split(".gif")[0];
            if(newSrcName.includes("-mega") || newSrcName.includes("-alola")) newSrcName= newSrcName.split("-")[0];
            let newBattlePokemon
            if(newSrcName === "mr._mime"){
             newBattlePokemon = myBattlePokemons.filter(item=>item.name.toLowerCase() === "mr.mime")[0];
            }else{
             newBattlePokemon = myBattlePokemons.filter(item=>item.name.toLowerCase() === newSrcName)[0];
            }
        
            if(newBattlePokemon.specialUrl === undefined)
                myMonster.current.src = item.innerHTML.includes(shinyUrl) ? newBattlePokemon.shinyBackUrl : newBattlePokemon.commonBackUrl;
            else
                myMonster.current.src=item.innerHTML.includes(shinyUrl) ?  newBattlePokemon.specialShinyBackUrl : newBattlePokemon.specialBackUrl;
            
            myMonster.current.id=item.firstChild.id;            
            menu.current.innerHTML="";
            initList.forEach(item=>menu.current.appendChild(item));
            setIndex(0);
            setMyPhysical( myPokemons[myMonster.current.id-1].health); 
        }else if(item.innerHTML.includes("ball") || item.innerHTML.includes("berry")){
            ballCatch(item);
            window.removeEventListener("keydown",handleKeyDown);
            setTimeout(()=>{window.addEventListener("keydown",handleKeyDown);},1700);
        }
        
        if(menu.current)
            setList(menu.current.querySelectorAll("li")) ;
    
    }

    
    
    const handleKeyDown=useCallback((e)=>{ // 키를 눌렀을경우  위치셋팅해준다. 
        let listCopy;

        if(menu.current){
             listCopy = menu.current.querySelectorAll("li");
        // ArrowUp ArrowDown //ArrowRight ArrowLeft // 엔터 -키코드 13
        // 배틀시작화면에서는  처음 리스트값을 가리키고 있다   .
        }
       
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
            e.preventDefault();
             InitWindowEnter(listCopy[listIndex]);

        }
      

    },[listIndex,battlePhysical,myPhysical]);

    const handleKeyUp =useCallback((e)=>{
        
     if(list)   
        list[listIndex].style.backgroundColor="yellow";
        
    },[listIndex,list]);


    const myPokeomnsSetting=()=>{ // 배틀이 끝났을때  배틀포켓몬들의 체력을  mypokemon들 저장소 에 새로 반영
       myPokemons.forEach(
         item=> myBattlePokemons.forEach(mybattlePoke =>{
            if(mybattlePoke.name === item.name)
                mybattlePoke.health = item.health;
         })
       )
       localStorage.setItem("battlePokemons",JSON.stringify(myBattlePokemons));
     
    }





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
            menu.current.querySelectorAll("li")[listIndex].style.backgroundColor="yellow";
        }
    },[list]);

    useEffect(()=>{
       if(myMonster.current) setMyPhysical( myPokemons[myMonster.current.id-1].health); 
    },[])

    useEffect(()=>{
        if(battlePhysical <=100 && battlePhysical >66){
            if(battleBallCount >=catchBallCount[2]){
                setTimeout(()=>{catchPokemon();
                    removePokemon();},2000);
                    
            }
            else{
                setTimeout(()=>setBallEffect(0),1000);
            }
        }else if(battlePhysical <=66 && battlePhysical>33){
            if(battleBallCount >=catchBallCount[1]){
                
                setTimeout(()=>{catchPokemon();
                removePokemon();},2000);
                
             
            }
            else{
                setTimeout(()=>setBallEffect(0),1000);
                
            }

        }else{
            if(battleBallCount >=catchBallCount[0]){
                setTimeout(()=>{catchPokemon();
                    removePokemon();},2000);
                    
            }
            else{
                setTimeout(()=>setBallEffect(0),1000); 
            }
        }
    },[battleBallCount])

    //배틀이 끝난 지점 처리
    useEffect(()=>{
        // 저장소에 저장
        myPokemons[myMonster.current.id-1].health = myPhysical;
        localStorage.setItem("battlePokemons",JSON.stringify(myBattlePokemons));
        localStorage.setItem("myPoketmon",JSON.stringify(myPokemons));

        if(battlePhysical <= 0){   
            myPokeomnsSetting();
            setTimeout(()=>removePokemon(),1000);
            setPhysical(0);
            //배틀이 끝나면 보상을 주어야 한다.
            if(battlePokmonName.includes("mew") || battlePokmonName.includes("moltres") || battlePokmonName.includes("zapdos")|| battlePokmonName.includes("articuno"))
            {    
                myBag["money"] = bag.money === myBag["money"] ? myBag["money"]+3000 : myBag["money"];  
                setMessage(`you got 3000 coin`);
               
            }else{
                myBag["money"] = bag.money === myBag["money"] ? myBag["money"]+50 : myBag["money"];  
                setMessage(`you got 50 coin`);
            
              
            }
            
            localStorage.setItem("myBag",JSON.stringify(myBag));

        
        }
        
        if(myPhysical <=0){
            //리스트의 첫번째 포켓몬 을 꺼내준다.
            myPokeomnsSetting();
            
            if(myBattlePokemons.length >1 && myBattlePokemons.filter(item => item.health !== 0)[0]){
                let changePokemon=myBattlePokemons.filter(item => item.health !== 0)[0];
      
                    myMonster.current.id = changePokemon.myId;
                    myMonster.current.src = changePokemon.specialUrl ? (changePokemon.color ? changePokemon.specialShinyBackUrl : changePokemon.specialBackUrl) :(changePokemon.color ? changePokemon.shinyBackUrl: changePokemon.commonBackUrl);
                    setMyPhysical(myPokemons[changePokemon.myId-1].health); 
              
            }
            else{
             
                setTimeout(()=>{setBattle(0);
                                setRun(1);
                               
                               },1000);

                // 체력이 없어 배틀을 못한다는 알람 메시지를 보내준다.                    
                setMessage("There are no Pokemons to fight");               
            }    
        }    



    },[battlePhysical,myPhysical])

  

    return (
        <>
        <BattleEffect>
            <img src="https://usecloud.s3-ap-northeast-1.amazonaws.com/pokemonicon/188915-pokemon-go/png/battle.png"/>
        </BattleEffect>
        <BattleContainer>
            <BattlePokmons>
                <Field color={color} className="field"></Field>
                <MonsterWrapper>
                    
                    {ballEffect ? <BallEffect src={ballImage}></BallEffect> : <>
                    {pokemons[battleIndex[0]] ? <BattleMonster ref={battleMonster} src={`https://projectpokemon.org/images/normal-sprite/${pokemons[battleIndex[0]].name.toLowerCase()}.gif`}></BattleMonster> : "" }
                    <div className="physical1"><Physical physical={battlePhysical}></Physical></div>
                    </>
                    }   
                </MonsterWrapper>
                
                <MonsterWrapper>
                    { myBattlePokemons[0].specialUrl === undefined ?
                    <MyMonster index={0} id={myBattlePokemons[0].myId} ref={myMonster}src={myBattlePokemons[0].color === 0 ?  myBattlePokemons[0].commonBackUrl : myBattlePokemons[0].shinyBackUrl }></MyMonster>
                        :<MyMonster index={0} id={myBattlePokemons[0].myId} ref={myMonster}src={myBattlePokemons[0].color === 0 ?  myBattlePokemons[0].specialBackUrl : myBattlePokemons[0].specialShinyBackUrl }></MyMonster>
                    }
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
        <Message message={message} setMessage={setMessage}></Message>
        <BattleMessage attack={attackDamege}></BattleMessage>
        <AttackEffect type={type}></AttackEffect>
        </>
    )
}


export default Battle;

Battle.propTypes={
    color:PropTypes.string,
    battleIndex:PropTypes.array,
    pokemons:PropTypes.array,
    setBattle:PropTypes.func,
    battleon:PropTypes.number,
    setRun:PropTypes.func,
    pokemonsCp:PropTypes.array,
    setPokemons:PropTypes.func, 
    setCp:PropTypes.func,
    setPkPosition:PropTypes.func,
    randomPosition:PropTypes.array
}