import React from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import HomePageComponent from './views/HomePage/homeScript.jsx';

const AppRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element = { <HomePageComponent /> }  path="/" exact />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;