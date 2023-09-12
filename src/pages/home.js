import React, {useEffect, useState, useRef } from "react";
import { google_signin } from "../firebase";
import {db, auth} from "../firebase";
import {collection, query, where, onSnapshot} from "firebase/firestore";
import handleSubmit from '../handleSubmit';

const Home = () => {
    const dataRef = useRef()
 
    const submithandler = (e) => {
        e.preventDefault()
        handleSubmit(dataRef.current.value)
        dataRef.current.value = ""
    }
    
    return (
        <div className="App">
            <form onSubmit={submithandler}>
                <input type="text" ref={dataRef}/>
                <button type = "submit">Save</button>
            </form>
            <button onClick={google_signin} type="button" class="login-with-google-btn" >
                Sign in with Google
            </button>
      </div>
    )
};

export default Home;