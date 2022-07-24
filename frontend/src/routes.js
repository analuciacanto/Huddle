import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Header from "./components/Header"

const RoutesApp = () => {
   return(
    <BrowserRouter>
       <Header/>
       <Routes> 
            <Route element = {< Home/> }  path="/" exact />        
            <Route element = { <Admin/> }  path="/admin"  />        
            <Route element = { <Login/> }  path="/login"  />                   
        </Routes>
    </BrowserRouter>
   )
}

export default RoutesApp;


