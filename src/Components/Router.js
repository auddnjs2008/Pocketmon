import React from "react";
import {HashRouter as Router,
        Route,
        Switch,
        Redirect,
    } from "react-router-dom";
import Home from "../Routes/Home";
import Navigator from "../Routes/Navigator";
import Detail from "../Routes/Detail";
export default ()=>{

    return (
        <Router>
            <Route path="/" exact component={Home}/>
            <Route path="/navi" exact component={Navigator}/>
            <Route path="/navi/:id" component={Detail}/>    
        </Router>
    )
}    