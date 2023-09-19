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
  <Link to="/" className="navbar-brand">
    EmotiChat
  </Link>
  <div className="navbar-links">
    {user?.displayName ? (
      <>
        <p className="navbar-username">Signed in as {username}</p>
        <Link to='/account' className="navbar-link">My Account</Link>
        <Link onClick={handleSignOut} className="navbar-link">Sign Out</Link>
      </>
    ) : (
      <Link to='/login' className="navbar-link">Sign In</Link>
    )}
  </div>
</nav>

    );
};

export default Navbar;
