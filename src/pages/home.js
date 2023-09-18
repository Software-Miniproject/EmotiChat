import React, {useEffect, useState, useRef } from "react";
import {db, auth} from "../firebase";
import {collection, query, where, onSnapshot} from "firebase/firestore";
import NavBar from "../components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {

    const dataRef = useRef()
    
    return (
        <div className="App">

      </div>
    )
};

export default Home;