import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import login from "./pages/login";
import test from "./pages/test";
import account from "./pages/account";
import { AuthContextProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />

        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/login" Component={login} />
          <Route exact path="/test" Component={test} />
          <Route exact path="/account" Compnent={account} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
