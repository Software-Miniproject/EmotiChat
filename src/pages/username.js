import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { db } from '../firebase';
import { doc, updateDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';

const Username = () => {
    const [newUsername, setNewUsername] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { user, setUser } = UserAuth(); // Import setUser from the UserAuth context
    const [otherUserEmailPrefixes, setOtherUserEmailPrefixes] = useState([]);
    const [existingUsernames, setExistingUsernames] = useState([]);

    useEffect(() => {
        // Query Firestore to get email prefixes of other users
        const fetchOtherUserEmailPrefixes = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const querySnapshot = await getDocs(usersCollection);

                const emailPrefixes = querySnapshot.docs
                    .filter(doc => doc.id !== user.uid) // Exclude the current user's document
                    .map(doc => doc.data().email.split('@')[0]);

                setOtherUserEmailPrefixes(emailPrefixes);
            } catch (error) {
                console.error('Error fetching other users:', error);
            }
        };

        const fetchExistingUsernames = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const querySnapshot = await getDocs(usersCollection);

                const usernames = querySnapshot.docs
                    .map(doc => doc.data().username);

                setExistingUsernames(usernames);
            } catch (error) {
                console.error('Error fetching existing usernames:', error);
            }
        };

        fetchOtherUserEmailPrefixes();
        fetchExistingUsernames();
    }, [user.uid]);

    const handleUsernameChange = (e) => {
        const username = e.target.value;

        // Check if the username is valid (contains only letters, numbers, ., and _ and is no longer than 30 characters)
        const isValidUsername = /^[a-zA-Z0-9._]{3,30}$/.test(username);

        if (!isValidUsername) {
            setErrorMessage('Invalid username format. It can only contain letters, numbers, ., and _ and must be 3 to 30 characters long.');
        } else {
            setErrorMessage(''); // Clear the error message if the username is valid
        }

        setNewUsername(username);
    };

    const handleSaveUsername = async () => {
        try {
            // Validate that the username is not empty
            if (newUsername.trim() === '') {
                setErrorMessage('Username cannot be empty');
                return;
            }
    
            // Check if the username is already in use by another user
            if (existingUsernames.includes(newUsername)) {
                setErrorMessage('Username is already in use by another user');
                return;
            }
    
            // Check if the username matches any other user's email prefix
            if (otherUserEmailPrefixes.includes(newUsername)) {
                setErrorMessage('Username is already in use by another user');
                return;
            }
    
            // Check if the username is valid (contains only letters, numbers, ., and _ and is no longer than 30 characters)
            const isValidUsername = /^[a-zA-Z0-9._]{3,30}$/.test(newUsername);
    
            if (!isValidUsername) {
                setErrorMessage('Invalid username format. It can only contain letters, numbers, ., and _ and must be 3 to 30 characters long.');
                return;
            }
    
            // Update the username in the Firestore document
            const uid = user.uid;
            const userRef = doc(db, 'users', uid);
    
            await updateDoc(userRef, {
                username: newUsername
            });
    
            // Update the username property in the user state
            setUser(prevUser => ({ ...prevUser, username: newUsername }));
    
            setSuccessMessage('Username updated successfully');
    
            // Clear success message after 2 seconds
            setTimeout(() => setSuccessMessage(''), 2000);
        } catch (error) {
            console.error('Error updating username:', error);
            setErrorMessage('Error updating username: ' + error.message); // Include error message in the error state
    
            // Clear error message after 2 seconds
            setTimeout(() => setErrorMessage(''), 2000);
        }
    };
    

    return (
        <div className='username-container'>
          <h1>Change Username</h1>
          <div>
            <input
              type="text"
              value={newUsername}
              onChange={handleUsernameChange}
              placeholder="New Username" /* Added placeholder for clarity */
            />
            <button onClick={handleSaveUsername} className="username-save-btn">
              Save
            </button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p><Link to="/account" className="username-account-link">My Account</Link></p>
          </div>
        </div>
      );
      
};

export default Username;
