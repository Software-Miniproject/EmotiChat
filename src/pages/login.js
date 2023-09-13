import React from "react";
import { google_signin } from "../firebase";
const login = () => {

    return (
        <div className="App">
            <button onClick={google_signin} type="button" class="login-with-google-btn" >
                Sign in with Google
            </button>
        </div>
            
    )
}
export default login;