import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Evolve from "../../src/Evolve";

const Container =styled.div`
  position:absolute;
  top:21%;
  left:27%;
  height:100px;
  width:50%;
  
  z-index:100;
  transform:rotate(-15deg);

  & .myAttack, & .battleAttack{
      position:absolute;
      width:100%;
      height:100%;
      
    }

    & .myAttack{

        div{
 
          &:nth-child(1){  
            @keyframes fastAttack{
                0%{
                    left:0%;
             
                }
                90%{
                    opacity:1;
                    
                }
                100%{
                    left:100%;
                    transform:scale(2,2) rotate(360deg);
                    opacity:0;

                }
            }
            animation: fastAttack 1s forwards;
          }
          &:nth-child(2){
              @keyframes secondAttack{
                  0%{
                    left:0%;
               

                  }
                  20%{
                      left:0%;
                  }
                  90%{
                      opacity:1;
                  }
                  100%{
                    left:100%;
                    transform:scale(2,2) rotate(360deg);
                    opacity:0;

                  }
              }
            animation: secondAttack 1s forwards;  
          }
        
        
        }

    
    }

    & .battleAttack{
        div{
            left:100%;
            opacity:0;
            &:nth-child(1){  
            @keyframes BattleAttack{
                50%{
                    left:100%;
                    transform:scale(1,1) rotate(0deg);
                    opacity:0;
                }
                90%{
                    opacity:1;
                }
                100%{
                    left:0%;
                    transform:scale(2,2) rotate(360deg);
                    opacity:0;
                }
            }
            animation: BattleAttack 2s forwards;
            }
            &:nth-child(2){
                @keyframes BattleSecondAttack{
                    50%{
                    left:100%;
                    transform:scale(1,1) rotate(0deg);

                    }
                    70%{
                        left:100%;
                    }
                    90%{
                        opacity:1;
                    }
                    100%{
                    left:0%;
                    transform:scale(2,2) rotate(360deg);
                    opacity:0;
                    }
                }
            animation: BattleSecondAttack 2s forwards;  
        }

    }


    }


`;

const AttackBall=styled.div`
 position:absolute;
 
 width:25px;
 height:25px;
 border-radius:50%;
 background-color:${props=>props.color}; 
 z-index:100;
 



`;

const AttackEffect =({type})=>{
    const {attackColor}=Evolve;

    return <Container>
        {type.length !==0 ?<>
        <div className="myAttack">
           
                <AttackBall color={attackColor[type[0][0]]}></AttackBall>
                <AttackBall color={type[0].length === 2 ? attackColor[type[0][1]] : attackColor[type[0][0]]}></AttackBall> 
         
       
        </div>
        <div className="battleAttack">
                <AttackBall color={attackColor[type[1][0]]}></AttackBall>
                <AttackBall color={type[1].length === 2 ? attackColor[type[1][1]] : attackColor[type[1][0]]}></AttackBall> 
        </div></> :""}
    </Container>

}

export default AttackEffect;

AttackEffect.propTypes={
    type:PropTypes.array
}