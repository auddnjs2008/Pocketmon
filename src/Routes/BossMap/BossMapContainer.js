import React, { useEffect, useRef } from "react";
import BossMapPresenter from "./BossMapPresenter";
import Tree from "../../나무.png";


const BossMapContainer =()=>{
    

    const canvas=useRef();
    const character =useRef();

    let ctx;
    const wallImage = new Image();
    

    const mapArray =[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
                    [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,0,0],
                    [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0],
                    [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],
                    [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],
                    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
                    [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],
                    [0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],
                    [0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],
                    [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],
                    [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,0],
                    [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],
                    [0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0],
                    [0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], 
                    ]
    
    const position = mapArray[mapArray.length-1][11];


    useEffect(() => {                
        if(canvas.current){      
            ctx = canvas.current.getContext('2d');
            wallImage.onload =function (){
                
            for(let i=0; i<mapArray.length; i++){
                for(let j=0; j<mapArray[i].length; j++){
                    if(mapArray[i][j] === 0){
                      
                        //ctx.fillStyle="#ccc";
                        // ctx.fillRect(50*j,50*i,50,50);
                        
                        ctx.drawImage(wallImage,70*j,70*i,70,70);
                    }else{
                        
                        ctx.fillStyle="brown";
                        ctx.fillRect(70*j,70*i,70,70);
                    }

                    }
                }            
            }
            wallImage.src = Tree;
    }} ,[]);
    


    return <BossMapPresenter canvas={canvas} character={character}></BossMapPresenter>
}

export default BossMapContainer;