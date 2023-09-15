import React from "react";
import Navbar from "../components/Navbar";
import { UserAuth } from "../context/AuthContext";

const login = () => {

    const { googleSignIn } = UserAuth();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="App">

            <button onClick={handleGoogleSignIn} type="button" class="login-with-google-btn" >
                Sign in with Google
            </button>
        </div>

    );
};

export default login;