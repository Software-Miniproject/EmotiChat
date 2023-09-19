import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Account = () => {
    const { logOut, user } = UserAuth();
    const [username, setUsername] = useState('');

    const fetchUserData = useCallback(async () => {
        if (user !== null) {
            const uid = user.uid;
            const userRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUsername(userData.username);
            } else {
                console.log('User document does not exist.');
            }
        }
    }, [user]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData, user]);

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='account-container'>
          <h1>Account</h1>
          {user?.photoURL && <img src={user.photoURL} alt="" />}
          <div>
            <p>Welcome, {user?.displayName}</p>
            <p>Username: {username} <Link to='/username'>Change</Link></p>
            <p>You are signed in using your Google account: {user?.email}</p>
          </div>
          <button onClick={handleSignOut} className="account-signout-btn">Sign Out</button>
        </div>
      );
      
};

export default Account;
