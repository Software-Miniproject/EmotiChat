import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";



const NavBar = () => {
    const [user] = useAuthState(auth);
    
    const signout = () => {
        auth.signOut();
    }

    return (
        <nav className="navbar">
            <h3>
                <Link to="/">EmotiChat</Link>
            </h3>
            <div>
                {user ? (
                    <button onClick={signout} className="sign-out" type="button">
                        Sign Out
                    </button>
                ): 
                (
                    <>
                        <Link to="/login">Sign In</Link>
                        
                    </>
                    
                )}
                                
            </div>
            
        </nav>
    )
}
export default NavBar;