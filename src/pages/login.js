import React from "react";
import { google_signin } from "../firebase";
import NavBar from "../components/Navbar";
const login = () => {

    return (
        <div className="App">
            <NavBar />
            <button onClick={google_signin} type="button" class="login-with-google-btn" >
                Sign in with Google
            </button>
        </div>
            
    )
}
export default login;