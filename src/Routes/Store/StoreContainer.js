import React, { useEffect, useState } from "react";
import StorePresenter from "./StorePresenter";

const StoreContainer = ()=>{
    const [windowSize,setWindow]=useState(window.innerWidth);
    const [scroll,setScroll]=useState(window.scrollY);
    const [name,setName]=useState("");
    const [info,setInfo]=useState("");
    const [img,setImg]=useState("");
    const [money,setMoney]=useState(0);
    const [bag,setBag]=useState(JSON.parse(localStorage.getItem("myBag")));


    const handleBuyBtn=()=>{
        const itemes=bag;
        let itemName=name;
        let number=1;
        let Badges=[];

        if(itemName === "Pokeballs" || itemName=== "Incenses") // 묶음 아이템을 살 경우    
        {   itemName=itemName.substring(0,name.length-1);
            number=3;
        }else if (itemName.includes("Badge"))
        {  Badges.push(itemName.split("-")[0]);
           itemName=itemName.split("-")[0]; 
        }


        // 뱃지를 살경우 이미 산 뱃지일 경우   못 사게 한다. ********************************************* 코드 작성 필요 
        
        
        if(Badges.length ===0) // 산 아이템이 뱃지가 아닐경우    
        itemes[itemName]= (itemes[itemName] !== undefined? (itemes[itemName])+number : number);
        else // 산 아이템이 뱃지일 경우
            itemes["Badges"] = (itemes["Badges"] !== undefined ? [...itemes["Badges"],...Badges] : Badges);
        
       
       
       
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
    ></StorePresenter>
}

export default StoreContainer;