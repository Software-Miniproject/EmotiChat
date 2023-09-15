import React, { useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";



const NavBar = () => {
    const [user, setUser] = useState(false);

    const signin_google = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }
    
    const signout = () => {
        auth.signOut();
    }

    return (
        <nav className="navbar">
            <h3>
                <Link to="/">EmotiChat</Link>
            </h3>
            <div>
                <Link to="/search">Search</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">login</Link>
                {user ? (
                    <button onClick={signout} className="sign-out" type="button">
                        Sign Out
                    </button>
                ) : (
                    <button onClick={signin_google} type="button" class="sign-in" >
                        Sign in with Google
                    </button>
                )}
            </div>
            
        </nav>
    )
}
export default NavBar;
