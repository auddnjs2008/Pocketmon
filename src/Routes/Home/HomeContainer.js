import React, { useEffect, useState } from "react";
import HomePresenter from "./HomePresenter";

const HomeContainer = ()=>{
    const [pokemon,setPokemon] = useState(JSON.parse(localStorage.getItem("myPoketmon")));
    const [colorArray,setColor]=useState([]);
 
return <HomePresenter pokemon={pokemon ? (pokemon) : ""} setPokemon={setPokemon}
    colorArray={colorArray}
    setColor={setColor}
></HomePresenter>
}

export default HomeContainer;