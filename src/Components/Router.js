import React from "react";
import {HashRouter as Router,
        Route,
        Switch,
        Redirect,
    } from "react-router-dom";
import Home from "../Routes/Home";
import Navigator from "../Routes/Navigator";
import Detail from "../Routes/Detail";
import Store from "../Routes/Store";
import MyPokemon from "../Routes/MyPokemon";
import MyBag from "../Routes/MyBag";
import Game from "../Routes/Game";
import YardMap from "../Routes/YardMap";
export default ()=>{

    return (
        <Router>
            <Route path="/" exact component={Home}/>
            <Route path="/navi" exact component={Navigator}/>
            <Route path="/navi/:id" component={Detail}/>    
            <Route path="/store" component={Store}/>
            <Route path="/mine" component={MyPokemon}/>
            <Route path="/bag" component={MyBag}/>
            <Route path="/game" exact component={Game}/>
            <Route path="/game/yardmap" component={YardMap}/>
        </Router>
    )
}    