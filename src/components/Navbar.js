import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Navbar = () => {
    const { user, logOut } = UserAuth();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                // Check if user is authenticated
                if (user) {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDocSnapshot = await getDoc(userDocRef);

                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        setUsername(userData.username);
                    }
                }
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        fetchUsername();
    }, [user]);

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="navbar">
            <h1>
                <Link to="/">EmotiChat</Link>
            </h1>
            {user?.displayName ? (
                <>
                    <p>Signed in as {username}</p> {/* Display username */}
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
