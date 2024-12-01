import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationTab from "./components/NavigationTab";
import DashboardPage from "./components/DashboardPage";
import "./CSS/App.css"

function App(){


    return(
        <div className="full-screen">
            <div className='navigation-bar'>
                <NavigationTab />
            </div>

            <div>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                </Routes>
            </div>
        </div>
    );  
}   

export default App;