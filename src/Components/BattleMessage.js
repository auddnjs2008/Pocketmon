import React from "react";
import styled  from "styled-components";
import PropTypes from "prop-types";

const Container=styled.div`
position:absolute;
top:50%;
left:50%;
border: 1px solid black;
background-color:black;
color:white;
padding:10px;
width:300px;
height:100px;
z-index:100;    
text-align:center;
display:flex;
flex-direction:column;
justify-content:space-between;
font-size:16px;

@keyframes showDamege{
    0%{
       opacity:0; 
    }
    90%{
        opacity:0;
    }
    100%{
        opacity:1;
    }
}
animation: showDamege 4s linear forwards;

`;



const BattleMessage= ({attack})=>{

return <Container>
    Damege
    <div>
        myPokemon 👉 battlePokemon : {attack[0]}
    </div>
    <div>
        battlePokemon 👉 myPokemon : {attack[1]}
    </div>

</Container>

}

export default BattleMessage;

BattleMessage.propTypes={
    attack:PropTypes.array
}