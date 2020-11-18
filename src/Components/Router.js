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

export default ()=>{

    return (
        <Router>
            <Route path="/" exact component={Home}/>
            <Route path="/navi" exact component={Navigator}/>
            <Route path="/navi/:id" component={Detail}/>    
            <Route path="/store" component={Store}/>
        </Router>
    )
}    