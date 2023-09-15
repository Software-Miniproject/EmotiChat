import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {

    const { user, logOut } = UserAuth();

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className="navbar">
            <h1>
                <Link to="/">EmotiChat</Link>
            </h1>
            {user?.displayName ? (
            <>
                <Link to='/account'>My Account</Link>
                <Link onClick={handleSignOut}>Sign Out</Link>
            </>
            ) : (
                <Link to='/login'>Sign In</Link>
            )}

        </nav>
    );
};

export default Navbar;