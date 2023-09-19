import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import Login from "./pages/login";
import Account from "./pages/account";
import { AuthContextProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import Username from './pages/username';
import Search from './pages/search';

function App() {
  
  return (

    <div>
      <AuthContextProvider>
        
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={ <Protected> <Search /> </Protected>} />
          <Route path="/account" element={ <Protected> <Account /> </Protected>} />
          <Route path="/username" element={ <Protected> <Username /> </Protected>} />
        </Routes>
      </AuthContextProvider>
    </div>

  );
};

export default App;
