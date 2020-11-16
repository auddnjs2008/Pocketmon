import React from "react";
import {HashRouter as Router,
        Route,
        Switch,
        Redirect,
    } from "react-router-dom";
import Home from "../Routes/Home";

export default ()=>{

    return (
        <Router>
            <Route path="/" exact component={Home}/>
        </Router>
    )
}    