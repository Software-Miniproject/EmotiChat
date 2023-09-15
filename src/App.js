import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import login from "./pages/login";
import test from "./pages/test";
import account from "./pages/account";

function App() {
  return (
   <div>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={login}/>
        <Route exact path="/test" Component={test}/>
        <Route exact path="/account" Compnent={account}/>
      </Routes>
    </div>
  );
}

export default App;
