import React, {useEffect, useState, useRef } from "react";
import {db, auth} from "../firebase";
import {collection, query, where, onSnapshot} from "firebase/firestore";
import handleSubmit from '../handleSubmit';
import NavBar from "../components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = () => {
    // const [user, setUser] = useState(false);

    // const signin_google = () => {
    //     const provider = new GoogleAuthProvider();
    //     signInWithPopup(auth, provider);
    // }
    
    // const signout = () => {
    //     auth.signOut();
    // }
    const dataRef = useRef()
 
    const submithandler = (e) => {
        e.preventDefault()
        handleSubmit(dataRef.current.value)
        dataRef.current.value = ""
    }
    
    return (
        <div className="App">
            <NavBar />
            <form onSubmit={submithandler}>
                <input type="text" ref={dataRef}/>
                <button type = "submit">Save</button>
            </form>
      </div>
    )
};

export default Home;