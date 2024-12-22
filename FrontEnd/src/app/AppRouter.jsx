import React from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import HomePageComponent from './views/HomePage/homeScript.jsx';
import UserPageComponent from './views/UserPage/userScript.jsx';
import AuthPageComponent from './views/AuthPage/authScript.jsx';
import TestPageComponent from './views/TestPage/testScript.jsx';

const AppRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element = { <TestPageComponent /> }  path="/setHost" exact />
                <Route element = { <HomePageComponent /> }  path="/" exact />
                <Route element = { <AuthPageComponent /> }  path="/authentication" exact />
                <Route element = { <UserPageComponent /> }  path="/profile" exact />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;