import React, { useEffect, useState } from "react";
import StorePresenter from "./StorePresenter";
import  Evolve from "../../../src/Evolve";
import pokemons from "pokemon-go-pokedex";

const StoreContainer = ()=>{
    const [windowSize,setWindow]=useState(window.innerWidth);
    const [scroll,setScroll]=useState(window.scrollY);
    const [name,setName]=useState("");
    const [info,setInfo]=useState("");
    const [img,setImg]=useState("");
    const [money,setMoney]=useState(0);
    const [myMoney,setMyMoney]=useState(JSON.parse(localStorage.getItem("myBag")).money);
    const [bag,setBag]=useState(JSON.parse(localStorage.getItem("myBag")));
    const [message,setMessage]=useState("");
    const [myPokemons,setMyPokemon]=useState(JSON.parse(localStorage.getItem("myPoketmon")));

    const {megaPokemon, alolaPokemon,megaXYPokemon,urlSearch,googleProxyURL}=Evolve;



    const handleBuyBtn=()=>{
        const itemes=bag;
        const BadgesNumber = bag.Badges ?  bag.Badges.length : 0; // 사기 전 뱃지의 숫자
        let itemName=name;
        let number=1;
        let Badges=[];

        if(itemName === "pokeballs" || itemName=== "Incenses") // 묶음 아이템을 살 경우    
        {   itemName=itemName.substring(0,name.length-1);
            number=3;
        }else if (itemName.includes("Badge"))
        {  Badges.push(itemName.split("-")[0]);
           itemName=itemName.split("-")[0]; 
        }


        // 뱃지를 살경우 이미 산 뱃지일 경우   못 사게 한다. 
        
        
        if(Badges.length ===0) // 산 아이템이 뱃지가 아닐경우    
        itemes[itemName]= (itemes[itemName] !== undefined? (itemes[itemName])+number : number);
        else // 산 아이템이 뱃지일 경우
        {   if(itemes["Badges"] === undefined || !itemes["Badges"].includes(Badges[0]))
                itemes["Badges"] = (itemes["Badges"] !== undefined ? [...itemes["Badges"],...Badges] : Badges);
            else
            {   // 알람메시지를 넣어준다.
                setMessage("You already had this Badge");
                setTimeout(()=>{setMessage("");},3000);
                return;
            }
        }
        
        if(myMoney-money <0){
            // 알람메시지를 넣어준다.
            setMessage("You don't have enough money");
            setTimeout(()=>{setMessage(""); },3000);
            return;
        }


        
        // 돈차감을 해주어야 한다. 
        setMyMoney(myMoney-money);
        itemes["money"]=(myMoney-money);

      
        //뱃지가 10개이거나  23개일 경우  랜덤 스페셜 포켓몬 증정 //메가 포켓몬 증정
        //사기전 뱃지 넘버와 사고난후 뱃지 넘버가  달라야 한다.
        if( itemes["Badges"] && BadgesNumber !== itemes["Badges"].length && (itemes["Badges"].length === 10 || itemes["Badges"].length === 23)){
            const newPokemonName = megaPokemon[Math.floor(Math.random()*(megaPokemon.length-1))+1]   
            
            
            let newPokemon = pokemons.pokemon.filter(item=>item.name.toLowerCase() === newPokemonName);
            newPokemon={...newPokemon[0],myId:myPokemons.length+1,cp:Math.floor(Math.random()*(2000-1500))+1500,health:100,
                commonUrl : urlSearch.commonUrl(newPokemonName), commonBackUrl: urlSearch.commonBackUrl(newPokemonName), shinyUrl:urlSearch.shinyUrl(newPokemonName),shinyBackUrl:urlSearch.shinyBackUrl(newPokemonName),color:0,
                specialUrl : urlSearch.megaUrl(newPokemonName).megaCommonUrl, specialShinyUrl:urlSearch.megaUrl(newPokemonName).megaShinyUrl, 
                specialBackUrl:urlSearch.megaBackUrl(newPokemonName).megaBackCommonUrl, specialShinyBackUrl:urlSearch.megaBackUrl(newPokemonName).megaBackShinyUrl
            }

            setMyPokemon([...myPokemons,newPokemon]);
            //알림메시지를 넣어준다.
            setMessage("You got a special Pokemon");
        }

        //뱃지가 23개이면 모두 0개로 다시 셋팅해준다.
        if(itemes["Badges"].length === 23){
            itemes["Badges"]=[]
        }




       
        setBag(itemes);
        localStorage.setItem("myBag",JSON.stringify(bag));
    }

   
    

    const handleItemClick =(name,info,img,money) =>{
        setName(name);
        setInfo(info);
        setImg(img);
        setMoney(money);
        setScroll(window.scrollY);
        const priceWindow = document.querySelector(".InfoWrapper");
        priceWindow.style.display="grid";
    }
    
    
    const handleClose =()=>{
        const priceWindow = document.querySelector(".InfoWrapper");
        priceWindow.style.display="none";
    }

    const handleWindow =() => setWindow(window.innerWidth);

    const handleScroll=()=>setScroll(window.scrollY);

    useEffect(()=>{
        window.addEventListener("resize",handleWindow);
        window.addEventListener("scroll",handleScroll);
        return () => {
            window.removeEventListener("resize",handleWindow);
            window.removeEventListener("scroll",handleScroll);
        }    
    },[]);

    useEffect(()=>{
        localStorage.setItem("myPoketmon",JSON.stringify(myPokemons));
    },[myPokemons])

    return <StorePresenter
        windowSize={windowSize}
        handleItemClick={handleItemClick}
        handleClose={handleClose}
        handleBuyBtn={handleBuyBtn}
        name={name}
        info={info}
        img={img}
        money={money}
        scroll={scroll}
        myMoney={myMoney}
        message={message}
        setMessage={setMessage}
       
    ></StorePresenter>
}

export default StoreContainer;