import React, { useEffect, useState } from "react";
import StorePresenter from "./StorePresenter";

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

    const handleBuyBtn=()=>{
        const itemes=bag;
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


        // 뱃지를 살경우 이미 산 뱃지일 경우   못 사게 한다. ********************************************* 코드 작성 필요 
        
        
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
        myMoney={myMoney}
        message={message}
       
    ></StorePresenter>
}

export default StoreContainer;