import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";      
import App from './App'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
